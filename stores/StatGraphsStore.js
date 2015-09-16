import BaseStore from 'fluxible/addons/BaseStore';
import ChampionStore from './ChampionStore';
import MatchStore from './MatchStore';
import statsApi from '../static/stats';

class StatGraphsStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.dispatcher = dispatcher;
    this.data = [];
    this.visible = {};
  }

  update() {
    let championStore = this.dispatcher.getStore(ChampionStore);
    let champion = championStore.getChampion();
    let buildOrder = championStore.getBuildOrder();
    let runePage = championStore.getRunePage();

    let matchStore = this.dispatcher.getStore(MatchStore);
    let goldData = matchStore.getGoldData();
    let xpData = matchStore.getXpData();

    console.log(champion, buildOrder, runePage, goldData, xpData);

    let graphData = {};

    let timeData = [];
    for (let i = 0; i < goldData.length; i++) {
      timeData.push(i);
    }

    for (let [xp, gold, time] of _.zipWith(xpData, goldData, timeData)) {
      let rawStats = statsApi.calculateAtState({xp: xp, gold: gold}, champion, runePage, buildOrder);
      let stats = [];
      for (let key in rawStats) {
        let name = statsApi.getName(key);
        if (!name) {
          continue;
        }
        let value = Math.round(rawStats[key] * 100) / 100;
        if (!graphData[name]) {
          graphData[name] = [];
        }
        graphData[name].push({time: time, value: value});
      }
    }

    this.data = [];
    for (let name in graphData) {
      if (typeof(this.visible[name]) === 'undefined') {
        // Default to showing only if the data changes
        let changing = false;
        let lastValue = graphData[name][0].value;
        for (let data of graphData[name]) {
          if (data.value - lastValue > 0.0001) {
            changing = true;
            break;
          }
          lastValue = data.value;
        }
        this.visible[name] = changing;
      }
      this.data.push({name: name, data: graphData[name]});
    }
    this.emitChange();
  }



  getData() {
    return this.data;
  }

  getVisible() {
    return this.visible;
  }

  toggleStatVisibility({name}) {
    this.visible[name] = !this.visible[name];
    this.emitChange();
  }

  dehydrate() {
    return {
      visible: this.visible,
      graphData: this.graphData
    };
  }

  rehydrate({visible, graphData}) {
    this.visible = visible;
    this.graphData = graphData;
  }
}

StatGraphsStore.storeName = 'StatGraphsStore';

StatGraphsStore.handlers = {
  'default': 'update',
  'TOGGLE_STAT_VISIBILITY': 'toggleStatVisibility'
};

export default StatGraphsStore;

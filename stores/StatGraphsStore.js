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
    this.hoverEvent = null;
  }

  update() {
    let championStore = this.dispatcher.getStore(ChampionStore);
    let champion = championStore.getChampion();
    let buildOrder = championStore.getBuildOrder();
    let runePage = championStore.getRunePage();

    let matchStore = this.dispatcher.getStore(MatchStore);
    let goldData = matchStore.getGoldData();
    let xpData = matchStore.getXpData();

    let graphData = {};

    let timeData = [];
    for (let i = 0; i < goldData.length; i++) {
      timeData.push(i);
    }

    for (let [xp, gold, time] of _.zipWith(xpData, goldData, timeData)) {
      let rawStats = statsApi.calculateAtState({xp: xp, gold: gold}, champion, runePage, buildOrder);
      for (let key in rawStats) {
        if (!statsApi.getName(key)) {
          continue;
        }
        let value = Math.round(rawStats[key] * 100) / 100;
        if (!graphData[key]) {
          graphData[key] = [];
        }
        graphData[key].push({time: time, value: value});
      }
    }

    this.data = [];
    for (let key in graphData) {
      if (typeof(this.visible[key]) === 'undefined') {
        // Default to showing only if the data changes
        let changing = false;
        let lastValue = graphData[key][0].value;
        for (let data of graphData[key]) {
          if (data.value - lastValue > 0.0001) {
            changing = true;
            break;
          }
          lastValue = data.value;
        }
        this.visible[key] = changing;
      }
      this.data.push({key: key, data: graphData[key]});
    }

    this.data.sort(function(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.emitChange();
  }

  isHoverActive() {
    return !!this.hoverEvent;
  }

  setHoverEvent({hoverEvent}) {
    this.hoverEvent = hoverEvent;
    this.emitChange();
  }

  getHoverEvent() {
    return this.hoverEvent;
  }

  getData() {
    return this.data;
  }

  getVisible() {
    return this.visible;
  }

  toggleStatVisibility({key}) {
    this.visible[key] = !this.visible[key];
    this.emitChange();
  }

  getVisibleStatsAtTime(time) {
    let allStats = this.getData();
    let statsAtTime = [];
    for (let statData of allStats) {
      let lastValue = statData.data[0];
      if (!this.visible[statData.key]) {
        continue;
      }
      for (let statValue of statData.data) {
        if (statValue.time < time && lastValue.time < statValue.time) {
          lastValue = statValue;
        }
      }
      statsAtTime.push({key: statData.key, value: lastValue.value});
    }
    return statsAtTime;
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
  'TOGGLE_STAT_VISIBILITY': 'toggleStatVisibility',
  'SET_STAT_HOVER_EVENT': 'setHoverEvent'
};

export default StatGraphsStore;

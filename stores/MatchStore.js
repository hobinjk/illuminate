import BaseStore from 'fluxible/addons/BaseStore';
import ChampionActions from '../ChampionActions';
import staticApi from '../static/api.js';

class MatchStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.goldData = this.getGoldData();
    this.xpData = this.getXpData();
  }

  setSummonerName() {
  }

  getRecentMatches() {
  }

  selectMatch({index}) {
  }

  getGoldData() {
    let gold = 0;
    let data = [];
    for (var i = 0; i < 40; i++) {
      data.push(gold);
      gold += 500;
    }
    return data;
  }

  getXpData() {
    let gold = 0;
    let data = [];
    for (var i = 0; i < 40; i++) {
      data.push(gold);
      gold += 500;
    }
    return data;
  }

  getChampion() {
  }

  getBuildOrder() {
  }
}

MatchStore.storeName = 'MatchStore';
export default MatchStore;

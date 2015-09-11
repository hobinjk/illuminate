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
    // Based off a random Gold player's game
    function goldPerMin(minute) {
      if (minute < 10) {
        return 228;
      }
      if (minute < 20) {
        return 443.5;
      }
      if (minute < 30) {
        return 435.2;
      }
      return 400;
    }
    let gold = 0;
    let data = [];
    let dt = 0.05;
    for (var i = 0; i < 45 / dt; i++) {
      data.push(gold);
      gold += goldPerMin(i) * dt;
    }
    return data;
  }

  getXpData() {
    function xpPerMin(minute) {
      if (minute < 10) {
        return 310;
      }
      if (minute < 20) {
        return 607;
      }
      if (minute < 30) {
        return 540;
      }
      return 588;
    }

    let xp = 0;
    let data = [];
    let dt = 0.05;
    for (var i = 0; i < 45 / dt; i++) {
      data.push(xp);
      xp += xpPerMin(i) * dt;
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

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
      let gold = 228;
      if (minute < 10) {
        return gold;
      }
      gold += 443.5;
      if (minute < 20) {
        return gold;
      }
      gold += 435.2;
      if (minute < 30) {
        return gold;
      }
      return gold + 400;
    }
    let gold = 0;
    let data = [];
    for (var i = 0; i < 45; i++) {
      data.push(gold);
      gold += goldPerMin(i);
    }
    return data;
  }

  getXpData() {
    function xpPerMin(minute) {
      if (minute < 10) {
        return 310;
      }
      if (minute < 20) {
        return 310 + 607;
      }
      if (minute < 30) {
        return 310 + 607 + 540;
      }
      return 310 + 607 + 540 + 588;
    }

    let xp = 0;
    let data = [];
    for (var i = 0; i < 40; i++) {
      data.push(xp);
      xp += xpPerMin(i);
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

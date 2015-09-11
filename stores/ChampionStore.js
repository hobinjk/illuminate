import BaseStore from 'fluxible/addons/BaseStore';
import ChampionActions from '../ChampionActions';
import staticApi from '../static/api.js';

class ChampionStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.dispatcher = dispatcher;
    this.champion = staticApi.getChampionById('Tristana');
    this.runePage = getEmptyRunePage();
    this.buildOrder = [staticApi.getItemById('plus')];
  }

  getChampion() {
    return this.champion;
  }

  getRunePage() {
    return this.runePage;
  }

  getBuildOrder() {
    return this.buildOrder;
  }

  setChampion({champion}) {
    this.champion = champion;
    this.emitChange();
  }

  setRuneAtIndex({index, rune}) {
    let runes = [];
    switch (rune.rune.type) {
    case 'black':
      runes = this.runePage.quints;
      break;
    case 'red':
      runes = this.runePage.marks;
      break;
    case 'blue':
      runes = this.runePage.glyphs;
      break;
    case 'yellow':
      runes = this.runePage.seals;
      break;
    default:
      console.warn('Unknown rune type encountered');
      return;
    }
    console.log('runes[' + index + ']', rune);
    runes[index] = rune;
    this.emitChange();
  }

  setItemAtIndex({item, index}) {
    this.buildOrder[index] = item;
    let last = this.buildOrder.length - 1
    if (this.buildOrder[last].id !== 'plus') {
      this.buildOrder.push(staticApi.getItemById('plus'));
    }
    this.emitChange();
  }

  dehydrate() {
    return {
      champion: this.champion,
      runePage: this.runePage,
      buildOrder: this.buildOrder
    }
  }

  rehydrate({champion, runePage, buildOrder}) {
    this.champion = champion;
    this.runePage = runePage;
    this.buildOrder = buildOrder;
  }
}

function getEmptyRunePage() {
  function repeat(value, times) {
    let ret = [];
    for (let i = 0; i < times; i++) {
      ret.push(value);
    }
    return ret;
  }

  return {
    quints: repeat(staticApi.getRuneById('5335'), 3),
    marks: repeat(staticApi.getRuneById('5245'), 9),
    seals: repeat(staticApi.getRuneById('5317'), 9),
    glyphs: repeat(staticApi.getRuneById('5289'), 9)
  };
}

ChampionStore.storeName = 'ChampionStore';
ChampionStore.handlers = {};
ChampionStore.handlers[ChampionActions.SET_CHAMPION] = 'setChampion';
ChampionStore.handlers[ChampionActions.SET_RUNE_AT_INDEX] = 'setRuneAtIndex';
ChampionStore.handlers[ChampionActions.ADD_ITEM] = 'addItem';
ChampionStore.handlers[ChampionActions.REMOVE_ITEM_INDEX] = 'removeItemIndex';
ChampionStore.handlers[ChampionActions.SWAP_ITEM_INDICES] = 'swapItemIndices';
ChampionStore.handlers[ChampionActions.SET_ITEM_AT_INDEX] = 'setItemAtIndex';

export default ChampionStore;

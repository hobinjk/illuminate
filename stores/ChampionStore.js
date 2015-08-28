import BaseStore from 'fluxible/addons/BaseStore';
import ChampionActions from '../ChampionActions';

class ChampionStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.selectedChampion = 'teemo';
    this.runePage = getEmptyRunePage();
    this.buildOrder = [];
  }

  getSelectedChampion() {
    return this.selectedChampion;
  }

  getRunePage() {
    return this.runePage;
  }

  getBuildOrder() {
    return this.buildOrder;
  }

  selectChampion({champion}) {
    this.selectedChampion = champion;
    this.emitChange();
  }

  setQuint({index, quint}) {
    this.runePage.quints[index] = quint;
    this.emitChange();
  }

  setMark({index, mark}) {
    this.runePage.marks[index] = mark;
    this.emitChange();
  }

  setSeal({index, seal}) {
    this.runePage.seals[index] = seal;
    this.emitChange();
  }

  setGlyph({index, glyph}) {
    this.runePage.glyphs[index] = glyph;
    this.emitChange();
  }

  addItem({item}) {
    this.buildOrder.push(item);
    this.emitChange();
  }

  removeItemIndex({index}) {
    this.buildOrder = this.buildOrder.splice(index, 1);
    this.emitChange();
  }

  swapItemIndices({indexA, indexB}) {
    let itemA = this.buildOrder[indexA];
    this.buildOrder[indexA] = this.buildOrder[indexB];
    this.buildOrder[indexB] = itemA;
    this.emitChange();
  }

  dehydrate() {
    return {
      selectedChampion: this.selectedChampion,
      runePage: this.runePage,
      buildOrder: this.buildOrder
    }
  }

  rehydrate({selectedChampion, runePage, buildOrder}) {
    this.selectedChampion = selectedChampion;
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
    quints: repeat('', 3),
    marks: repeat('', 9),
    seals: repeat('', 9),
    glyphs: repeat('', 9)
  };
}

ChampionStore.storeName = 'ChampionStore';
ChampionStore.handlers = {};
ChampionStore.handlers[ChampionActions.SELECT_CHAMPION] = 'selectChampion';
ChampionStore.handlers[ChampionActions.SET_QUINT] = 'setQuint';
ChampionStore.handlers[ChampionActions.SET_MARK] = 'setMark';
ChampionStore.handlers[ChampionActions.SET_SEAL] = 'setSeal';
ChampionStore.handlers[ChampionActions.SET_GLYPH] = 'setGlyph';
ChampionStore.handlers[ChampionActions.ADD_ITEM] = 'addItem';
ChampionStore.handlers[ChampionActions.REMOVE_ITEM_INDEX] = 'removeItemIndex';
ChampionStore.handlers[ChampionActions.SWAP_ITEM_INDICES] = 'swapItemIndices';

export default ChampionStore;

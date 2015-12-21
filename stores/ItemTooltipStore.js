import BaseStore from 'fluxible/addons/BaseStore';

class ItemTooltipStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.dispatcher = dispatcher;
    this.anchor = null;
    this.item = null;
  }

  getAnchor() {
    return this.anchor;
  }

  getItem() {
    return this.item;
  }

  setEventData({anchor, item}) {
    this.anchor = anchor;
    this.item = item;
    this.emitChange();
  }

  dehydrate() {
    return {
      anchor: this.anchor,
      item: this.item
    };
  }

  rehydrate({anchor, item}) {
    this.anchor = anchor;
    this.item = item;
  }
}

ItemTooltipStore.storeName = 'ItemTooltipStore';

ItemTooltipStore.handlers = {
  'SET_ITEM_TOOLTIP_HOVER_EVENT': 'setEventData'
};

export default ItemTooltipStore;

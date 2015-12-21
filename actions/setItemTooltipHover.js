import ItemTooltipStore from '../stores/ItemTooltipStore';

function setItemTooltipHover(context, payload, done) {
  context.dispatch('SET_ITEM_TOOLTIP_HOVER_EVENT', payload);
  done();
}

export default setItemTooltipHover;

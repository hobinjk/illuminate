import React from 'react';
import statsApi from '../static/stats';
import { connectToStores } from 'fluxible-addons-react';
import ItemTooltipStore from '../stores/ItemTooltipStore';

class ItemTooltip extends React.Component {
  render() {
    if (!this.props.item || !this.props.anchor) {
      var style = {
        display: 'none'
      };
      return <div style={style}></div>;
    }
    console.log('anchor', this.props.anchor);
    let stats = this.props.item.stats;
    let statKeys = Object.keys(stats);
    let statDescriptions = statKeys.map(modifierKey => {
      let name = statsApi.getModifierName(modifierKey);
      let value = stats[modifierKey]
      let sign = '+';
      if (value < 0) {
        sign = '-';
      }
      return <p className="item-stat">{sign}{value} {name}</p>
    });

    var bounds = this.props.anchor.getBoundingClientRect();

    var style = {
      top: bounds.top + bounds.height,
      left: bounds.left
    };

    return <div className="tooltip item-icon-tooltip" style={style}>
      {this.props.item.name}
      {statDescriptions}
    </div>;
  }
}

ItemTooltip = connectToStores(ItemTooltip, [ItemTooltipStore], (context, props) => {
  let store = context.getStore(ItemTooltipStore);
  return {
    anchor: store.getAnchor(),
    item: store.getItem()
  }
});

export default ItemTooltip;

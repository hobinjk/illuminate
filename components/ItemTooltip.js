import React from 'react';
import statsApi from '../static/stats';

class ItemTooltip extends React.Component {
  render() {
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

    return <div className="tooltip item-icon-tooltip">
      {this.props.item.name}
      {statDescriptions}
    </div>;
  }
}

export default ItemTooltip;

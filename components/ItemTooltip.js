import React from 'react';

class ItemTooltip extends React.Component {
  render() {
    let stats = this.props.item.stats;
    let statKeys = Object.keys(stats);
    let statDescriptions = statKeys.map(statKey => (
      <p>{statKey}: {stats[statKey]}</p>
    ));

    return <div className="tooltip item-icon-tooltip">
      {this.props.item.name}
      {statDescriptions}
    </div>;
  }
}

export default ItemTooltip;

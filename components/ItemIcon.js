import React from 'react';
import staticApi from '../static/api';
import ItemTooltip from './ItemTooltip.js';

class ItemIcon extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.state = {hover: false};
  }

  onClick(event) {
    this.props.onClick(event, this.props.item, this.props.index);
  }

  onMouseOver() {
    this.setState({hover: true});
  }

  onMouseOut() {
    this.setState({hover: false});
  }

  render() {
    let itemTooltip = null
    if (this.state.hover) {
      itemTooltip = <ItemTooltip item={this.props.item}/>;
    }

    return <div className="icon-container">
      <img src={staticApi.getIcon(this.props.item)}
           title={this.props.item.name}
           alt={this.props.item.name}
           onClick={this.onClick}
           onMouseOver={this.onMouseOver}
           onMouseOut={this.onMouseOut}
           className="icon item-icon"/>
      {itemTooltip}
    </div>;
  }
}

export default ItemIcon;

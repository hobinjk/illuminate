import React from 'react';
import staticApi from '../static/api';
import setItemTooltipHover from '../actions/setItemTooltipHover';

class ItemIcon extends React.Component {
  static contextTypes = {
    executeAction: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onClick(event) {
    this.context.executeAction(setItemTooltipHover, {});
    this.props.onClick(event, this.props.item, this.props.index);
  }

  onMouseOver() {
    this.context.executeAction(setItemTooltipHover, {
      anchor: React.findDOMNode(this),
      item: this.props.item
    });
  }

  onMouseOut() {
    this.context.executeAction(setItemTooltipHover, {});
  }

  render() {
    return <div className="icon-container">
      <img src={staticApi.getIcon(this.props.item)}
           title={this.props.item.name}
           alt={this.props.item.name}
           onClick={this.onClick}
           onMouseOver={this.onMouseOver}
           onMouseOut={this.onMouseOut}
           className="icon item-icon"/>
    </div>;
  }
}

export default ItemIcon;

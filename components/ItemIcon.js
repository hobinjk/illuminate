import React from 'react';
import staticApi from '../static/api';

class ItemIcon extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    this.props.onClick(event, this.props.item, this.props.index);
  }

  render() {
    return <img src={staticApi.getIcon(this.props.item)}
                title={this.props.item.name}
                alt={this.props.item.name}
                onClick={this.onClick}
                className="icon item-icon"/>;
  }
}

export default ItemIcon;

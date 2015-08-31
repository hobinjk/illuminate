import React from 'react';
import staticApi from '../static/api';

class ItemIcon extends React.Component {
  render() {
    return <img src={staticApi.getIcon(this.props.item)} className="icon item-icon"/>;
  }
}

export default ItemIcon;

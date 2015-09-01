import React from 'react';
import ItemPicker from './ItemPicker';
import ItemIcon from './ItemIcon';
import ChampionStore from '../stores/ChampionStore';
import { connectToStores } from 'fluxible-addons-react';

class BuildOrder extends React.Component {
  constructor(props) {
    super(props);
    this.showPicker = this.showPicker.bind(this);
  }

  showPicker(event, item, index) {
    let picker = this.refs.picker;
    picker.setState({visible: true, target: event.target, item: item, index: index});
  }

  render() {
    let icons = [];
    for (let i = 0; i < this.props.buildOrder.length; i++) {
      let item = this.props.buildOrder[i];
      icons.push(<ItemIcon index={i} item={item} onClick={this.showPicker}/>);
    }
    return (<span className="build-order">
      {icons}
      <ItemPicker ref="picker"/>
    </span>);
  }
}

BuildOrder = connectToStores(BuildOrder, [ChampionStore], (context, props) => ({
  buildOrder: context.getStore(ChampionStore).getBuildOrder()
}));

export default BuildOrder;

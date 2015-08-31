import React from 'react';
import ItemPicker from './ItemPicker';
import ItemIcon from './ItemIcon';
import ChampionStore from '../stores/ChampionStore';
import { connectToStores } from 'fluxible-addons-react';

class BuildOrder extends React.Component {
  showPicker(event) {
    console.log(event.target);
    this.picker.setState({visible: true, target: event.target});
  }
  render() {
    let icons = this.props.buildOrder.map(item => {
      return <ItemIcon item={item} onClick={this.showPicker}/>;
    });
    this.picker = (
      <ItemPicker />
    );
    return (<div>
      {icons}
      {this.picker}
    </div>);
  }
}

BuildOrder = connectToStores(BuildOrder, [ChampionStore], (context, props) => ({
  buildOrder: context.getStore(ChampionStore).getBuildOrder()
}))

export default BuildOrder;

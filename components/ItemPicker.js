import React from 'react';
import _ from 'lodash';
import staticApi from '../static/api';
import ItemIcon from './ItemIcon';
import setItemAtIndex from '../actions/setItemAtIndex';
import ChampionStore from '../stores/ChampionStore';
import { connectToStores } from 'fluxible-addons-react';

class ItemPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {target: null, picked: null, visible: false};
    this.pickItem = this.pickItem.bind(this);
  }

  pickItem(event, item, index) {
    this.setState({visible: false, target: null});
    this.context.executeAction(setItemAtIndex, {item: item, index: index});
  }

  render() {
    if (!this.state.target) {
      return null;
    }
    let rect = this.state.target.getBoundingClientRect();
    let style = {
      left: rect.left,
      top: rect.top,
      display: this.state.visible ? 'block' : 'none'
    };

    let selected = this.state.item;
    let otherItems = _.without(staticApi.getItems(), selected);

    otherItems.sort(function(itemA, itemB) {
      if (itemA.group !== itemB.group) {
        return itemA.group < itemB.group ? -1 : 1;
      }
      return itemA.name < itemB.name ? -1 : 1;
    });

    otherItems = otherItems.filter((item) => {
      return item.id !== 'plus';
    });


    // Display selected first
    let items = [selected].concat(otherItems);

    let itemIcons = items.map((item) => {
      return <ItemIcon item={item} onClick={this.pickItem} index={this.state.index}/>
    });

    return <div style={style} className="picker">
      {itemIcons}
    </div>;
  }
}

ItemPicker.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};

// ItemPicker = connectToStores(ItemPicker, [ChampionStore], (context, props) => ({
//   champion: context.getStore(ChampionStore).getChampion()
// }));


export default ItemPicker;

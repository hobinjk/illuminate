import React from 'react';
import staticApi from '../static/api';
import ChampionPicker from './ItemPicker';
import ChampionStore from '../stores/ChampionStore';
import { connectToStores } from 'fluxible-addons-react';

class ChampionIcon extends React.Component {
  showPicker(event) {
    console.log(event.target);
    this.picker.setState({visible: true, target: event.target});
  }
  render() {
    this.picker = (
      <ChampionPicker />
    );
    return (<div>
      <img src={staticApi.getIcon(this.props.champion)} className="icon champion-icon" onClick={this.showPicker}/>;
      {this.picker}
    </div>);
  }
}

ChampionIcon = connectToStores(ChampionIcon, [ChampionStore], (context, props) => ({
  champion: context.getStore(ChampionStore).getChampion()
}))

export default ChampionIcon;

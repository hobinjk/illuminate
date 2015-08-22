import React from 'react';
import ChampionStore from '../stores/ChampionStore';
import { connectToStores } from 'fluxible-addons-react';

class SelectedChampionIcon extends React.Component {
  render() {
    return (
      <div>{this.props.selectedChampion}</div>
    )
  }
}

SelectedChampionIcon = connectToStores(SelectedChampionIcon, [ChampionStore], (context, props) => ({
  selectedChampion: context.getStore(ChampionStore).getSelectedChampion()
}))

export default SelectedChampionIcon;

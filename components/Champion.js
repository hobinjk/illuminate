import React from 'react';
import staticApi from '../static/api';
import ChampionIcon from './ChampionIcon';
import ChampionStore from '../stores/ChampionStore';
import ChampionPicker from './ChampionPicker';
import { connectToStores } from 'fluxible-addons-react';

class Champion extends React.Component {
  constructor(props) {
    super(props);
    this.showPicker = this.showPicker.bind(this);
  }

  showPicker(event, champion) {
    let picker = this.refs.picker;
    picker.setState({visible: true, target: event.target, champion: champion});
  }

  render() {
    return (<span className="champion">
      <ChampionIcon onClick={this.showPicker} champion={this.props.champion}/>
      <ChampionPicker ref="picker"/>
    </span>);
  }
}

Champion = connectToStores(Champion, [ChampionStore], (context, props) => ({
  champion: context.getStore(ChampionStore).getChampion()
}))

export default Champion;

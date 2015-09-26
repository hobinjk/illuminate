import React from 'react';
import _ from 'lodash';
import staticApi from '../static/api';
import ChampionIcon from './ChampionIcon';
import Picker from './Picker';
import setChampion from '../actions/setChampion';

class ChampionPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {target: null, picked: null, visible: false};
    this.pickChampion = this.pickChampion.bind(this);
  }

  pickChampion(event, champion) {
    this.setState({visible: false, target: null});
    this.context.executeAction(setChampion, {champion: champion});
  }

  render() {
    if (!this.state.target) {
      return null;
    }

    let selected = this.state.champion;
    let otherChampions = _.without(staticApi.getChampions(), selected);

    // Display selected first
    let champions = [selected].concat(otherChampions);

    let championIcons = champions.map((champion) => {
      return <ChampionIcon champion={champion} onClick={this.pickChampion}/>
    });

    return <Picker target={this.state.target} visible={this.state.visible}>
      {championIcons}
    </Picker>;
  }
}

ChampionPicker.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};

export default ChampionPicker;

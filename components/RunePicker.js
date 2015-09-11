import React from 'react';
import _ from 'lodash';
import staticApi from '../static/api';
import RuneIcon from './RuneIcon';
import setRuneAtIndex from '../actions/setRuneAtIndex';
import ChampionStore from '../stores/ChampionStore';
import { connectToStores } from 'fluxible-addons-react';

class RunePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {target: null, picked: null, visible: false};
    this.pickRune = this.pickRune.bind(this);
  }

  pickRune(event, rune, index) {
    this.setState({visible: false, target: null});
    this.context.executeAction(setRuneAtIndex, {rune: rune, index: index});
  }

  render() {
    if (!this.state.target) {
      return null;
    }
    let target = this.state.target;
    let style = {
      left: target.offsetLeft,
      top: target.offsetTop
    };

    let selected = this.state.rune;
    let otherRunes = _.without(staticApi.getRunes(), selected);

    otherRunes.sort(function(runeA, runeB) {
      if (runeA.group !== runeB.group) {
        return runeA.group < runeB.group ? -1 : 1;
      }
      return runeA.name < runeB.name ? -1 : 1;
    });

    otherRunes = otherRunes.filter(rune => {
      return rune.rune.type === selected.rune.type;
    });

    // Display selected first
    let runes = [selected].concat(otherRunes);

    let runeIcons = runes.map(rune => {
      return <RuneIcon rune={rune} onClick={this.pickRune} index={this.state.index}/>
    });

    return <div style={style} className="picker">
      {runeIcons}
    </div>;
  }
}

RunePicker.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};

export default RunePicker;

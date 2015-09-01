import React from 'react';
import ChampionStore from '../stores/ChampionStore';
import RuneIcons from './RuneIcons';
import { connectToStores } from 'fluxible-addons-react';

class RunePage extends React.Component {
  render() {
    let page = this.props.runePage;
    return (<span className="rune-page">
      <RuneIcons runes={page.quints}/>
      <RuneIcons runes={page.marks}/>
      <RuneIcons runes={page.glyphs}/>
      <RuneIcons runes={page.seals}/>
    </span>);
  }
}

RunePage = connectToStores(RunePage, [ChampionStore], (context, props) => ({
  runePage: context.getStore(ChampionStore).getRunePage()
}))

export default RunePage;

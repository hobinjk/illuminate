import React from 'react';
import ChampionStore from '../stores/ChampionStore';
import RuneIcons from './RuneIcons';
import { connectToStores } from 'fluxible-addons-react';

class RunePage extends React.Component {
  render() {
    let page = this.props.runePage;
    return (<div>
      Quints: <RuneIcons runes={page.quints}/>
      Marks: <RuneIcons runes={page.marks}/>
      Glyphs: <RuneIcons runes={page.glyphs}/>
      Seals: <RuneIcons runes={page.seals}/>
    </div>);
  }
}

RunePage = connectToStores(RunePage, [ChampionStore], (context, props) => ({
  runePage: context.getStore(ChampionStore).getRunePage()
}))

export default RunePage;

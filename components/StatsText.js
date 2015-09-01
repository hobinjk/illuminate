import React from 'react';
import ChampionStore from '../stores/ChampionStore';
import { connectToStores } from 'fluxible-addons-react';
import statsApi from '../static/stats';

class StatsText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {champion, runePage, buildOrder}  = this.props;
    let rawStats = statsApi.calculateFinal(champion, runePage, buildOrder);

    let statDisplay = [];
    for (let key in rawStats) {
      let name = statsApi.getName(key);
      if (!name) {
        continue;
      }
      let value = Math.round(rawStats[key] * 100) / 100;
      statDisplay.push(<p><span className="stat-name">{name}:</span> {value}</p>);
    }

    return (<div>
      {statDisplay}
    </div>);
  }
}

StatsText = connectToStores(StatsText, [ChampionStore], (context, props) => ({
  buildOrder: context.getStore(ChampionStore).getBuildOrder(),
  runePage: context.getStore(ChampionStore).getRunePage(),
  champion: context.getStore(ChampionStore).getChampion()
}));

export default StatsText;

import React from 'react';
import Champion from './Champion';
import BuildOrder from './BuildOrder';
import RunePage from './RunePage';

class ChampionBar extends React.Component {
  render() {
    return <div className="champion-bar">
          <Champion />
          <BuildOrder />
          <RunePage />
    </div>;
  }
}

export default ChampionBar;

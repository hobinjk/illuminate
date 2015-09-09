import React from 'react';
import { provideContext } from 'fluxible-addons-react';
import ChampionBar from './ChampionBar';
import StatGraphs from './StatGraphs';

class Application extends React.Component {
  render() {
    return (
      <div>
        <div id="topbar">
          <span className="title-topbar">Illuminate</span>
          <div id="topbar-menu">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/how-to">How To</a>
          </div>
        </div>
        <div id="application">
          <ChampionBar />
          <StatGraphs/>
        </div>
      </div>
    );
  }
}

Application = provideContext(Application);

export default Application;

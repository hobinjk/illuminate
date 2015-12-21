import React from 'react';
import { provideContext } from 'fluxible-addons-react';
import ChampionBar from './ChampionBar';
import StatGraphs from './StatGraphs';
import ItemTooltip from './ItemTooltip';

class Application extends React.Component {
  render() {
    return (
      <div>
        <div id="topbar">
          <span className="title-topbar">Illuminate</span>
          <div id="topbar-menu">
            <a href="https://github.com/hobinjk/illuminate">Project Home</a>
            <a href="https://github.com/hobinjk/illuminate/blob/master/TUTORIAL.md">Tutorial</a>
          </div>
        </div>
        <div id="application">
          <ChampionBar />
          <StatGraphs/>
          <ItemTooltip/>
        </div>
      </div>
    );
  }
}

Application = provideContext(Application);

export default Application;

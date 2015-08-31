import React from 'react';
import ChampionIcon from './ChampionIcon';
import BuildOrder from './BuildOrder';
import RunePage from './RunePage';

class Application extends React.Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <p>Welcome to the site!</p>
        <ChampionIcon />
        <BuildOrder />
        <RunePage />
      </div>
    );
  }
}

export default Application;

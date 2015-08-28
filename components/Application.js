import React from 'react';
import SelectedChampionIcon from './SelectedChampionIcon.js';
import RunePage from './RunePage.js';

class Application extends React.Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <p>Welcome to the site!</p>
        <SelectedChampionIcon />
        <RunePage />
      </div>
    );
  }
}

export default Application;

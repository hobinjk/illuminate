import React from 'react';
import staticApi from '../static/api';

class ChampionIcon extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    this.props.onClick(event, this.props.champion);
  }

  render() {
    return <img src={staticApi.getIcon(this.props.champion)}
                title={this.props.champion.name}
                alt={this.props.champion.name}
                className="icon champion-icon" onClick={this.onClick}/>;
  }
}

export default ChampionIcon;

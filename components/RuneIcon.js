import React from 'react';
import staticApi from '../static/api';

class RuneIcon extends React.Component {
  render() {
    return <img src={staticApi.getIcon(this.props.rune)}
                title={this.props.rune.name}
                alt={this.props.rune.name}
                className="icon rune-icon"/>;
  }
}

export default RuneIcon;

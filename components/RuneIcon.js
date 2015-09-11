import React from 'react';
import staticApi from '../static/api';

class RuneIcon extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    this.props.onClick(event, this.props.rune, this.props.index);
  }

  render() {
    return <img src={staticApi.getIcon(this.props.rune)}
                title={this.props.rune.name}
                alt={this.props.rune.name}
                onClick={this.onClick}
                className="icon rune-icon"/>;
  }
}

export default RuneIcon;

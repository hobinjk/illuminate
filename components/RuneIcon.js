import React from 'react';
import staticApi from '../static/api';

import './RuneIcon.css';

class RuneIcon extends React.Component {
  showPicker(event) {
    console.log(event.target);
    this.picker.setState({visible: true, target: event.target});
  }
  render() {
    return <img src={staticApi.getRuneIcon(this.props.rune)} className="rune-icon"/>;
  }
}

export default RuneIcon;

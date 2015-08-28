import React from 'react';
import RunePicker from './RunePicker';
import RuneIcon from './RuneIcon';

class RuneIcons extends React.Component {
  showPicker(event) {
    console.log(event.target);
    this.picker.setState({visible: true, target: event.target});
  }
  render() {
    let icons = this.props.runes.map(rune => {(
      <RuneIcon rune={rune} onClick={this.showPicker}/>
    )});
    this.picker = (
      <RunePicker />
    );
    return (<div>
      {icons}
      {this.picker}
    </div>);
  }
}

export default RuneIcons;

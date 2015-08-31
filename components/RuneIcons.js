import React from 'react';
import RunePicker from './RunePicker';
import RuneIcon from './RuneIcon';

class RuneIcons extends React.Component {
  showPicker(event) {
    console.log(event.target);
    this.picker.setState({visible: true, target: event.target});
  }
  render() {
    console.log(this.props.runes);
    let icons = this.props.runes.map(rune => {
      return <RuneIcon rune={rune} onClick={this.showPicker}/>;
    });
    console.log(icons);
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

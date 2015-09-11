import React from 'react';
import RunePicker from './RunePicker';
import RuneIcon from './RuneIcon';

class RuneIcons extends React.Component {
  constructor(props) {
    super(props);
    this.showPicker = this.showPicker.bind(this);
  }

  showPicker(event, rune, index) {
    this.refs.picker.setState({visible: true, target: event.target, rune: rune, index: index});
  }

  render() {
    let icons = this.props.runes.map((rune, i) => {
      return <RuneIcon key={rune.id + '_' + i} index={i} rune={rune} onClick={this.showPicker}/>;
    });
    return (<div className="rune-icons">
      {icons}
      <RunePicker ref="picker"/>
    </div>);
  }
}

export default RuneIcons;

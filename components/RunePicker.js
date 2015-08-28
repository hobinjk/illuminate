import React from 'react';

class RunePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {target: null};
  }

  render() {
    if (this.state.target) {
      return <div>
        pickadilly
      </div>;
    }
    return null;
  }
}

export default RunePicker;

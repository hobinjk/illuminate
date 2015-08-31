import React from 'react';

class ItemPicker extends React.Component {
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

export default ItemPicker;

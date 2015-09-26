import React from 'react';
import _ from 'lodash';

class Picker extends React.Component {
  componentDidUpdate() {
    let container = React.findDOMNode(this);
    if (!container) {
      return;
    }
    let actualWidth = container.clientWidth;
    let desiredWidth = container.offsetWidth;
    if (desiredWidth - actualWidth === 0) {
      return;
    }

    container.style.width = desiredWidth + (desiredWidth - actualWidth) + 'px';
  }

  render() {
    if (!this.props.target) {
      return null;
    }
    let rect = this.props.target.getBoundingClientRect();
    let style = {
      left: rect.left,
      top: rect.top,
      display: this.props.visible ? 'block' : 'none'
    };

    if (this.props.offset) {
      style.left = this.props.target.offsetLeft;
      style.top = this.props.target.offsetTop;
    }

    return <div className="picker" style={style}>
      {this.props.children}
    </div>;
  }
}

export default Picker;

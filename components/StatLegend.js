import React from 'react';
import toggleItemVisibility from '../actions/toggleStatVisibility';
import _ from 'lodash';

class StatLegend extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick(name) {
    this.context.executeAction(toggleStatVisibility, {name: name});
  }

  render() {
    let names = this.props.names;
    let colors = this.props.colors;
    let legend = _.zipWith(names, colors).map(function([name, color]) {
      let style = {
        backgroundColor: color
      };
      let divStyle = {
        color: color
      };
      return <div style={divStyle} className="stat-legend-item" onClick={this.onClick.bind(this, name)}>
        <span style={style} className="stat-legend-box"></span> {name}
      </div>;
    }.bind(this));

    return <div className="stat-legend">
      {legend}
    </div>;
  }
}

StatLegend.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};

export default StatLegend;

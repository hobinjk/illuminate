import React from 'react';
import toggleStatVisibility from '../actions/toggleStatVisibility';
import _ from 'lodash';

class StatGraphsLegend extends React.Component {
  static contextTypes = {
    executeAction: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  onClick(name) {
    this.context.executeAction(toggleStatVisibility, {name: name});
  }

  render() {
    let names = this.props.names;
    let colorScale = this.props.colorScale;
    let legend = names.map(function(name) {
      let color = colorScale(name)
      if (!this.props.visible[name]) {
        color = 'rgba(200, 200, 200, 0.5)';
      }
      let style = {
        backgroundColor: color
      };
      let divStyle = {
        color: color
      };
      return <div style={divStyle} className="stat-graphs-legend-item" onClick={this.onClick.bind(this, name)}>
        <span style={style} className="stat-graphs-legend-box"></span> {name}
      </div>;
    }.bind(this));

    return <div className="stat-graphs-legend">
      {legend}
    </div>;
  }
}

export default StatGraphsLegend;

import React from 'react';
import StatGraphsStore from '../stores/StatGraphsStore';
import toggleStatVisibility from '../actions/toggleStatVisibility';
import statsApi from '../static/stats';
import _ from 'lodash';
import { connectToStores } from 'fluxible-addons-react';

class StatGraphsLegend extends React.Component {
  static contextTypes = {
    executeAction: React.PropTypes.func.isRequired
  };

  onClick(key) {
    this.context.executeAction(toggleStatVisibility, {key: key});
  }

  render() {
    let legend = this.props.data.map(series => {
      let name = statsApi.getName(series.key);
      let color = statsApi.getColor(series.key);
      if (!this.props.visible[series.key]) {
        color = 'rgba(200, 200, 200, 0.5)';
      }
      let style = {
        backgroundColor: color
      };
      let divStyle = {
        color: color
      };
      return <div style={divStyle} className="stat-graphs-legend-item" onClick={this.onClick.bind(this, series.key)}>
        <span style={style} className="stat-graphs-legend-box"></span> {name}
      </div>;
    });

    return <div className="stat-graphs-legend">
      {legend}
    </div>;
  }
}

StatGraphsLegend = connectToStores(StatGraphsLegend, [StatGraphsStore], (context, props) => {
  let store = context.getStore(StatGraphsStore);
  return {
    data: store.getData(),
    visible: store.getVisible()
  };
});

export default StatGraphsLegend;

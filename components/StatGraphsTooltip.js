import React from 'react';
import StatGraphsStore from '../stores/StatGraphsStore';
import statsApi from '../static/stats';
import { connectToStores } from 'fluxible-addons-react';

class StatGraphsTooltip extends React.Component {
  render() {
    if (!this.props.hoverEvent) {
      return null;
    }
    let time = this.props.hoverEvent.time;
    let stats = this.props.statsAtTime;

    let statItems = stats.map(({key, value}) => {
      let name = statsApi.getName(key);
      let statStyle = {
        color: statsApi.getColor(key)
      };
      return <div style={statStyle} className="stat-graphs-tooltip-item">{name}: {value}</div>
    });

    let marginLeft = 5;
    let marginTop = 0;
    let style = {
      left: this.props.hoverEvent.localX + marginLeft + 'px',
      top: this.props.hoverEvent.localY + marginTop + 'px'
    };

    return <div style={style} className="stat-graphs-tooltip tooltip">
      {statItems}
    </div>;
  }
}

StatGraphsTooltip = connectToStores(StatGraphsTooltip, [StatGraphsStore], (context, props) => {
  let store = context.getStore(StatGraphsStore);
  let hoverEvent = store.getHoverEvent();
  let statsAtTime = [];
  if (hoverEvent) {
    statsAtTime = store.getVisibleStatsAtTime(hoverEvent.time);
  }
  return {
    hoverEvent: hoverEvent,
    statsAtTime: statsAtTime
  };
});

export default StatGraphsTooltip;

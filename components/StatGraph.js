import React from 'react';
import _ from 'lodash';
import StatGraphsStore from '../stores/StatGraphsStore';
import {connectToStores} from 'fluxible-addons-react';

// Inspired by http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/
class StatGraph extends React.Component {
  componentDidMount() {
    let el = React.findDOMNode(this.refs.graph);
    if (!el) {
      return;
    }
    if (!this.graphId) {
      this.graphId = el.id = 'stat-graph-' + Math.floor(Math.random() * 10000);
    }
    document.getElementById(this.graphId).innerHTML = '';

    this.graphViz = d3plus.viz()
          .container('#' + this.graphId)
          .type('line')
          .id('name')
          .text('name')
          .y('value')
          .x('time')
          .color(this.props.color)
          .draw();

    this.drawData();
  }

  componentDidUpdate() {
    this.drawData();
  }

  drawData() {
    console.log('data', this.props.data);
    this.graphViz.data(this.props.data).draw();
  }


  render() {
    let style = {
      opacity: this.props.visible ? 1 : 0,
      width: '100%',
      height: '100%'
    };
    return <div style={style} className="stat-graphs" ref="graph"></div>
  }
}

StatGraph = connectToStores(StatGraph, [StatGraphsStore], (context, props) => ({
  data: context.getStore(StatGraphsStore).getData(props.name),
  visible: context.getStore(StatGraphsStore).getVisible(props.name)
}));

export default StatGraph;

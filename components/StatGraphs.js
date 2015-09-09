import React from 'react';
import StatGraphsStore from '../stores/StatGraphsStore';
import { connectToStores } from 'fluxible-addons-react';
import statsApi from '../static/stats';
import _ from 'lodash';
import d3 from 'd3';
import d3Tip from 'd3-tip';

class StatGraphs extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let graphContainer = React.findDOMNode(this.refs.graphContainer);
    let data = this.props.data;
    this.createGraph(graphContainer, data);
    this.updateGraph(graphContainer, data);
  }

  componentDidUpdate() {
    let graphContainer = React.findDOMNode(this.refs.graphContainer);
    let data = this.props.data;
    this.updateGraph(graphContainer, data);
  }

  componentWillUnmount() {
    let graphContainer = React.findDOMNode(this.refs.graphContainer);
    this.destroyGraph(graphContainer);
  }


  createGraph(graphContainer, data) {
    if (!data || !data.length) {
      return;
    }

    let margin = 8;
    let width = graphContainer.getBoundingClientRect().width - margin * 2;
    let height = graphContainer.getBoundingClientRect().height - margin * 2;

    let xScale = d3.scale.linear().range([0, width]);
    xScale.domain([0, d3.max(data[0].data, d => d.x)]);


    let svg = d3.select(graphContainer).append('svg')
      .attr('width', width + 2 * margin)
      .attr('height', height + 2 * margin)
      .append('g')
      .attr('transform', 'translate(' + margin + ',' + margin + ')');
  }

  updateGraph(graphContainer, data) {
    if (!data || !data.length) {
      console.log('No data for update');
      return;
    }

    let margin = 8;
    let width = graphContainer.getBoundingClientRect().width - margin * 2;
    let height = graphContainer.getBoundingClientRect().height - margin * 2;

    let xScale = d3.scale.linear().range([0, width]);
    xScale.domain([0, d3.max(data[0].data, d => d.x)]);

    let colorScale = d3.scale.category20();

    // Scale data differently between 0-1, 1-500, and 500 upwards
    let ranges = [0, 1, 500];
    let rangedScales = ranges.map(range => d3.scale.linear().range([height, 0]));
    let rangedData = ranges.map(range => []);
    let rangedScaleMap = {};

    data.forEach(series => {
      console.log('Processing ' + series.name);
      let maxValue = d3.max(series.data, d => d.y);
      for (let i = ranges.length - 1; i >= 0; i--) {
        if (ranges[i] <= maxValue) {
          rangedData[i] = rangedData[i].concat(series.data);
          rangedScaleMap[series.name] = rangedScales[i];
          break;
        }
      }
    });

    for (let i = 0; i < ranges.length; i++) {
      rangedScales[i].domain([d3.min(rangedData[i], d => d.y), d3.max(rangedData[i], d => d.y)]);
    }

    function getScale(series) {
      return rangedScaleMap[series.name];
    }

    function makeSeriesLine(series) {
      let yScale = getScale(series);

      return d3.svg.line()
                   .x(function(d) { return xScale(d.x); })
                   .y(function(d) { return yScale(d.y); })
                   (series.data);
    }

    let seriesLines = d3.select(graphContainer)
      .select('svg')
      .selectAll('path.series-line')
      .data(data);

    seriesLines.enter()
      .append('path')
      .attr('class', 'series-line')
      .attr('fill', 'none')
      .attr('stroke', function(series) {
        return colorScale(series.name);
      })
      .attr('stroke-width', 2);

    seriesLines.transition()
      .attr('d', makeSeriesLine);

    seriesLines.exit().remove();

    let legendContainer = d3.select(graphContainer)
      .append('div')
      .attr('class', 'stat-graphs-legend');

    let legend = legendContainer.selectAll('p')
      .data(data)
      .enter()
        .append('div');
    legend.append('span')
          .attr('class', 'stat-graphs-legend-box')
          .style('background-color', function(d) { return colorScale(d.name); });
    legend.append('span')
          .text(function(d) { return d.name; })
          .style('color', function(d) { return colorScale(d.name); });
  }

  destroyGraph(graphContainer) {
  }

  render() {
    let style = {
      width: '100%',
      height: '640px'
    };
    return <div style={style} className="stat-graphs-container" ref="graphContainer">
    </div>;
  }
}

StatGraphs = connectToStores(StatGraphs, [StatGraphsStore], (context, props) => ({
  data: context.getStore(StatGraphsStore).getData()
}));

export default StatGraphs;

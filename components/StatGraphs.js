import React from 'react';
import StatGraphsStore from '../stores/StatGraphsStore';
import StatGraphsLegend from './StatGraphsLegend';
import StatGraphsTooltip from './StatGraphsTooltip';
import { connectToStores } from 'fluxible-addons-react';
import statsApi from '../static/stats';
import updateStatGraphsHover from '../actions/updateStatGraphsHover';
import endStatGraphsHover from '../actions/endStatGraphsHover';
import _ from 'lodash';
import d3 from 'd3';

class StatGraphs extends React.Component {
  static contextTypes = {
    executeAction: React.PropTypes.func.isRequired
  };

  componentDidMount() {
    let graphContainer = React.findDOMNode(this.refs.graphContainer);
    let data = this.props.data;
    this.createGraph(graphContainer);
    this.updateGraph(graphContainer, data);
  }

  componentDidUpdate() {
    let graphContainer = React.findDOMNode(this.refs.graphContainer);
    let data = this.props.data;
    this.updateGraph(graphContainer, data);
  }

  componentWillUnmount() {
    let graphContainer = React.findDOMNode(this.refs.graphContainer);
    this.updateGraph(graphContainer, []);
    this.destroyGraph(graphContainer);
  }


  createGraph(graphContainer) {
    let width = graphContainer.getBoundingClientRect().width;
    let height = graphContainer.getBoundingClientRect().height;

    let svg = d3.select(graphContainer).append('svg')
      .attr('width', '100%')
      .attr('height', height)
      .append('g')
      .attr('class', 'stat-graphs-graphics');

    d3.select(graphContainer).on('mouseleave', () => {
      this.context.executeAction(endStatGraphsHover, {});
    });
  }

  updateGraph(graphContainer, seriesList) {
    if (!seriesList || !seriesList.length) {
      return;
    }

    let width = graphContainer.getBoundingClientRect().width;
    let height = graphContainer.getBoundingClientRect().height;

    let xScale = d3.scale.linear().range([0, width]);
    xScale.domain([d3.min(seriesList[0].data, d => d.time), d3.max(seriesList[0].data, d => d.time)]);


    // Scale data differently between 0-1, 1-500, and 500 upwards
    let ranges = [0, 1, 500];
    let rangedScales = ranges.map(range => d3.scale.linear().range([height, 0]));
    let rangedData = ranges.map(range => []);
    let rangedScaleMap = {};

    seriesList.forEach(series => {
      let maxValue = d3.max(series.data, d => d.value);
      for (let i = ranges.length - 1; i >= 0; i--) {
        if (ranges[i] <= maxValue) {
          rangedData[i] = rangedData[i].concat(series.data);
          rangedScaleMap[series.key] = rangedScales[i];
          break;
        }
      }
    });

    for (let i = 0; i < ranges.length; i++) {
      rangedScales[i].domain([0, d3.max(rangedData[i], d => d.value)]);
    }

    function getScale(series) {
      return rangedScaleMap[series.key];
    }

    function makeSeriesLine(series) {
      let yScale = getScale(series);

      return d3.svg.line()
                   .x(function(d) { return xScale(d.time); })
                   .y(function(d) { return yScale(d.value); })
                   (series.data);
    }

    let nextAllowedMouseMove = Date.now();
    let mouseMoveDelay = 33; // 30fps-ish
    d3.select(graphContainer).on('mousemove', () => {
      if (Date.now() < nextAllowedMouseMove) {
        return;
      }
      let mouse = d3.mouse(graphContainer);
      this.context.executeAction(updateStatGraphsHover, {hoverEvent: {
        pageX: d3.event.pageX,
        pageY: d3.event.pageY,
        localX: mouse[0],
        localY: mouse[1],
        time: xScale.invert(mouse[0])
      }});
      nextAllowedMouseMove = Date.now() + mouseMoveDelay;
    });

    let seriesLines = d3.select(graphContainer)
      .selectAll('.stat-graphs-graphics')
      .selectAll('.series-line')
      .data(seriesList);

    seriesLines.enter()
      .append('path')
      .attr('class', 'series-line')
      .attr('fill', 'none')
            .attr('stroke-width', 2);

    seriesLines.transition()
      .attr('d', makeSeriesLine)
      .attr('stroke', series => {
        return statsApi.getColor(series.key);
      })
      .style('opacity', series => {
        return this.props.visible[series.key] ? 1 : 0;
      });


    seriesLines.exit().remove();

    let levelData = null;
    seriesList.forEach(series => {
      if (series.key === 'level') {
        levelData = series.data;
      }
    });

    if (levelData) {
      let lastLevel = 0;
      let levelUpData = [];

      levelData.forEach(level => {
        if (level.value <= lastLevel) {
          return;
        }
        lastLevel = level.value;
        levelUpData.push(level);
      });

      let levelTimeline = d3.select(graphContainer)
        .selectAll('.stat-graphs-graphics')
        .selectAll('.stat-graphs-level-line')
        .data(levelUpData);

      levelTimeline.enter()
        .append('text')
        .attr('class', 'stat-graphs-level-line')
        .text(level => {
          return level.value;
        });

      levelTimeline.transition()
        .attr('x', level => {
          return xScale(level.time);
        })
        .attr('y', height);

      levelTimeline.exit().remove();
    }
  }

  destroyGraph(graphContainer) {
  }

  render() {
    return <div className="stat-graphs-container" ref="graphContainer">
      <StatGraphsTooltip />
      <StatGraphsLegend />
    </div>;
  }
}

StatGraphs = connectToStores(StatGraphs, [StatGraphsStore], (context, props) => {
  let store = context.getStore(StatGraphsStore);
  return {
    data: store.getData(),
    visible: store.getVisible()
  };
});

export default StatGraphs;

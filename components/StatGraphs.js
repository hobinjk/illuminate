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
    this.createGraph();
  }

  createGraph() {
    let data = this.props.data;
    console.log(data);

    if (!data || !data.length) {
      return;
    }

    let graphContainer = React.findDOMNode(this.refs.graphContainer);
    graphContainer.innerHTML = '';
    let margin = 8;
    let width = graphContainer.getBoundingClientRect().width - margin * 2;
    let height = graphContainer.getBoundingClientRect().height - margin * 2;

    function yAccessor(d) {
      return d.y;
    }

    function xAccessor(d) {
      return d.x;
    }

    let xScale = d3.scale.linear().range([0, width]);
    xScale.domain([0, d3.max(data[0].data, xAccessor)]);


    let svg = d3.select(graphContainer).append('svg')
      .attr('width', width + 2 * margin)
      .attr('height', height + 2 * margin)
      .append('g')
      .attr('transform', 'translate(' + margin + ',' + margin + ')');

    let colorScale = d3.scale.category20();

    let tinyScale = d3.scale.linear().range([height, 0]);
    let smallScale = d3.scale.linear().range([height, 0]);
    let largeScale = d3.scale.linear().range([height, 0]);

    let tinyData = [];
    let smallData = [];
    let largeData = [];
    data.forEach(series => {
      if (series.name === 'Health' || series.name === 'Mana') {
        largeData = largeData.concat(series.data);
        return;
      }
      if (series.name === 'Attacks Per Second') {
        tinyData = tinyData.concat(series.data);
        return;
      }
      smallData = smallData.concat(series.data);
    });

    tinyScale.domain([d3.min(tinyData, yAccessor), d3.max(tinyData, yAccessor)]);
    smallScale.domain([d3.min(smallData, yAccessor), d3.max(smallData, yAccessor)]);
    largeScale.domain([d3.min(largeData, yAccessor), d3.max(largeData, yAccessor)]);


    function getScale(name) {
      if (name === 'Health' || name === 'Mana') {
        return largeScale;
      }
      if (name === 'Attacks Per Second') {
        return tinyScale;
      }
      return smallScale;
    }

    for (let series of data) {
      console.log(series);
      let graph = svg.append('g');

      let yScale = getScale(series.name);

      console.log(d3Tip);
      let tip = d3Tip().attr('class', 'd3-tip')
        .html(function(d) {
          return series.name + ': ' + d.y;
        });

      graph.call(tip);

      let circles = graph.selectAll('circle')
        .data(series.data)

      circles.enter()
        .append('circle')
        .attr('cx', function(d) { return xScale(d.x); })
        .attr('cy', function(d) { return yScale(d.y); })
        .attr('r', 8)
        .attr('fill', colorScale(series.name))
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

      circles.exit()
        .remove();

      circles.transition()
        .attr('cx', function(d) { return xScale(d.x); })
        .attr('cy', function(d) { return yScale(d.y); })

      let line = d3.svg.line()
        .x(function(d) { return xScale(d.x);  })
        .y(function(d) { return yScale(d.y);  });

      let path = graph.append('path')
        .datum(series.data)
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', colorScale(series.name))
        .attr('stroke-width', 2);

      path.transition().attr('d', line);
    }

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

  componentDidUpdate() {
    this.createGraph();
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

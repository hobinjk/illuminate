import StatGraphsStore from '../stores/StatGraphsStore';

function endStatGraphsHover(context, payload, done) {
  context.dispatch('SET_STAT_HOVER_EVENT', {hoverEvent: null});
  done();
}

export default endStatGraphsHover;

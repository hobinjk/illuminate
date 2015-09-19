import StatGraphsStore from '../stores/StatGraphsStore';

function updateStatGraphsHover(context, payload, done) {
  context.dispatch('SET_STAT_HOVER_EVENT', payload);
  done();
}

export default updateStatGraphsHover;

import StatGraphsStore from '../stores/StatGraphsStore';

function toggleStatVisibility(context, payload, done) {
  context.dispatch('TOGGLE_STAT_VISIBILITY', payload);
  done();
}

export default toggleStatVisibility;

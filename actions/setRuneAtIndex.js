import ChampionStore from '../stores/ChampionStore';

function setRuneAtIndex(context, payload, done) {
  context.dispatch('SET_RUNE_AT_INDEX', payload);
  done();
}

export default setRuneAtIndex;

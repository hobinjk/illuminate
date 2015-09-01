import ChampionStore from '../stores/ChampionStore';

function setItemAtIndex(context, payload, done) {
  context.dispatch('SET_ITEM_AT_INDEX', payload);
  done();
}

export default setItemAtIndex;

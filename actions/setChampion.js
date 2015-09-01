import ChampionStore from '../stores/ChampionStore';

function setChampion(context, payload, done) {
  context.dispatch('SET_CHAMPION', payload);
  done();
}

export default setChampion;

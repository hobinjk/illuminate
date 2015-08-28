import ChampionStore from '../stores/ChampionStore';

function setChampion(context, payload, done) {
  var championStore = context.getStore(ChampionStore);
  context.service.read('champion', payload.champion, {}, function(err, championData) {
    if (err) {
      context.dispatch('LOAD_FAILURE', err);
      done();
      return;
    }

    championStore.setChampion(championData);
    context.dispatch('SET_CHAMPION', championData);
    done();
  });

}

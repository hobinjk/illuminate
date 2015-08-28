import Fluxible from 'fluxible';
import Application from './components/Application';
import ChampionStore from './stores/ChampionStore';
import fetchrPlugin from 'fluxible-plugin-fetchr';

// create new fluxible instance
const app = new Fluxible({
  component: Application
});

app.plug(fetchrPlugin({
  xhrPath: '/riot'
}));

// register stores
app.registerStore(ChampionStore);

module.exports = app;

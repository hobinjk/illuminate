import Fluxible from 'fluxible';
import Application from './components/Application';
import ChampionStore from './stores/ChampionStore';
import MatchStore from './stores/MatchStore';
import StatGraphsStore from './stores/StatGraphsStore';
import ItemTooltipStore from './stores/ItemTooltipStore';
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
app.registerStore(MatchStore);
app.registerStore(StatGraphsStore);
app.registerStore(ItemTooltipStore);

module.exports = app;

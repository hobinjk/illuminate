let api = {};

import Config from './configs/api';
import request from 'request-promise';
import queryString from 'querystring';

function getData(pathElements, parameters) {
  parameters = parameters || {};
  var path = 'https://global.api.pvp.net/api/lol/' + pathElements.join('/');

  // jscs:disable
  parameters.api_key = Config.API_KEY;
  path += '?' + queryString.stringify(parameters);

  return request(path).then(function(body) {
    return JSON.parse(body);
  });
}

function getStaticData(pathElements, parameters) {
  var base = ['static-data', Config.REGION, 'v1.2'];
  base = base.concat(pathElements);
  return getData(base, parameters);
}

api.champions = function() {
  return getStaticData(['champion']);
};

api.champion = function(id) {
  return getStaticData(['champion', id]);
};

api.items = function() {
  return getStaticData(['item']);
};

api.item = function(id) {
  return getStaticData(['item', id]);
};

api.masteries = function() {
  return getStaticData(['mastery']);
};

api.mastery = function(id) {
  return getStaticData(['mastery', id]);
};

api.runes = function() {
  return getStaticData(['rune']);
};

api.rune = function(id) {
  return getStaticData(['rune', id]);
};

api.summonerSpells = function() {
  return getStaticData(['summoner-spell']);
};

api.summonerSpell = function(id) {
  return getStaticData(['summoner-spell', id]);
};
export default api;

import Config from '../configs/api';
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


function getApiResource(resource, params) {
  switch (resource) {
  case 'champions':
    return getStaticData(['champion']);
  case 'champion':
    return getStaticData(['champion', params.id]);
  case 'items':
    return getStaticData(['item']);
  case 'item':
    return getStaticData(['item', params.id]);
  case 'masteries':
    return getStaticData(['mastery']);
  case 'mastery':
    return getStaticData(['mastery', params.id]);
  case 'runes':
    return getStaticData(['rune']);
  case 'rune':
    return getStaticData(['rune', params.id]);
  case 'summoner-spells':
    return getStaticData(['summoner-spell']);
  case 'summoner-spell':
    return getStaticData(['summoner-spell', params.id]);
  }
  return null;
};

function apiRead(req, resource, params, config, callback) {
  let data = getApiResource(resource, params);
  if (!data) {
    callback(new Error('Fetching ' + resource + ' with params ' + params.toString() + ' failed'));
  } else {
    callback(data);
  }
}

const riotService = {
  name: 'riot',
  read: apiRead
};

export default riotService;

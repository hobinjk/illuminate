var request = require('request-promise');
var Promise = require('bluebird');
var Config = require('../configs/api.js');
var fs = require('fs');


function writeJoined(target, dataPrefix, dataNames) {
  var path = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/' + target + '?api_key=' + Config.API_KEY;

  function join(a, b) {
    var out = {};
    var allKeys = [];
    try {
      allKeys = Object.keys(a).concat(Object.keys(b));
    } catch(e) {
      console.log('a: ', a);
      console.log('b: ', b);
      throw e;
    }

    allKeys.forEach(function(key) {
      if (typeof(a[key]) === 'undefined' || a[key] === null) {
        out[key] = b[key];
      } else if (typeof(b[key]) === 'undefined' || b[key] === null) {
        out[key] = a[key];
      } else if (typeof(a[key]) === 'object' && typeof(b[key]) === 'object') {
        out[key] = join(a[key], b[key]);
      } else {
        out[key] = a[key];
      }
    });

    return out;
  }

  Promise.all(dataNames.map(function(data) {
    return request(path + '&' + dataPrefix + '=' + data);
  })).then(function (allObjects) {
    var data = allObjects.map(JSON.parse).reduce(function(a, b) {
      return join(a, b);
    });
    if (target === 'item') {
      data.data['plus'] = {
          'id': 'plus'
        , 'name': 'Add another item'
        , 'description': ''
        , 'gold': {
            'base': 0
          , 'total': 0
          , 'purchasable': true
        }
        , 'image': {
            'full': 'plus.png'
          , 'sprite': 'plus.png'
          , 'group': 'item'
          , 'x': 144
          , 'y': 48
          , 'w': 48
          , 'h': 48
        }
        , 'from': []
        , 'stats': {}
      };
    }

    var rawJson = JSON.stringify(data);
    fs.writeFileSync(target + '.js', 'export default ' + rawJson + ';');
  });
}

writeJoined('item', 'itemListData', ['gold', 'image', 'from', 'stats', 'requiredChampion', 'maps']);
writeJoined('champion', 'champData', ['image', 'stats']);
writeJoined('rune', 'runeListData', ['image', 'stats']);
writeJoined('mastery', 'masteryListData', ['all']);

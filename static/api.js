import staticRuneData from './rune';
import staticItemData from './item';
import staticChampionData from './champion';

function getIcon(data) {
  if (data.image.full === 'plus.png') {
    return '/assets/plus.png';
  }

  let imgName = data.image.full;
  let version = staticRuneData.version;
  let group = data.image.group;
  return 'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/' + group
         + '/' + imgName;
}

function getChampionById(id) {
  return staticChampionData.data[id];
}

function getRuneById(runeId) {
  return staticRuneData.data[runeId];
}

function getItemById(itemId) {
  return staticItemData.data[itemId];
}

function generateCachedEnumerator(data, filter) {
  let cache = [];
  for (let key in data.data) {
    if (filter) {
      if (!filter(data.data[key])) {
        continue;
      }
    }
    cache.push(data.data[key]);
  }
  return function() {
    return cache;
  }
}

let getItems = generateCachedEnumerator(staticItemData, function(item) {
  return item.gold.purchasable;
});

let getChampions = generateCachedEnumerator(staticChampionData);
let getRunes = generateCachedEnumerator(staticRuneData);

function getQuints() {
  return getRunes().filter(function(data) {
    return data.rune.type === 'black';
  });
}

function getMarks() {
  return getRunes().filter(function(data) {
    return data.rune.type === 'red';
  });
}

function getSeals() {
  return getRunes().filter(function(data) {
    return data.rune.type === 'yellow';
  });
}

function getGlyphs() {
  return getRunes().filter(function(data) {
    return data.rune.type === 'blue';
  });
}

export default {
  getIcon,
  getChampionById,
  getItemById,
  getRuneById,
  getItems,
  getChampions,
  getRunes,
  getMarks,
  getSeals,
  getGlyphs,
  getQuints
};

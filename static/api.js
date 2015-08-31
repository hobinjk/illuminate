import staticRuneData from './rune';
import staticItemData from './item';
import staticChampionData from './champion';

function getIcon(data) {
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


function getRunes() {
  if (getRunes._cache) {
    return getRunes._cache;
  }

  let runes = [];
  for (let key in staticRuneData.data) {
    runes.push(staticRuneData.data[key]);
  }
  getRunes._cache = runes;
  return runes;
}

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
  getRunes,
  getMarks,
  getSeals,
  getGlyphs,
  getQuints
};

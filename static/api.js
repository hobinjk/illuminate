import staticRuneData from './rune';

function getRuneIcon(runeId) {
  if (!staticRuneData.data[runeId]) {
    return '';
  }
  let imgName = staticRuneData.data[runeId].image.full;
  let version = staticRuneData.version;
  return 'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/rune/' + imgName;
}

function getRuneTitle(runeId) {
  return staticRuneData.data[runeId].name;
}

function getRuneStats(runeId) {
  return staticRuneData.data[runeId].stats;
}

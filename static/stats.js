import statsApi from './api.js';

function calculateFinal(champion, runePage, buildOrder) {
  let state = {
    xp: 9000 * 9000,
    gold: 9000 * 9000
  };
  return calculateAtState(state, champion, runePage, buildOrder);
}

function getLevelFromXp(xp) {
  // 0 required for level 0 or 1
  const xpRequired = [0, 0, 280, 660, 1140, 1720, 2400, 3180, 4060, 5040, 6120, 7300, 8580, 9960, 11440, 13020, 14700, 16480, 18360];
  for (let level = 1; level < 18; level++) {
    if (xp < xpRequired[level + 1]) {
      return level;
    }
  }
  return 18;
}

function calculateAtState(state, champion, runePage, buildOrder) {
  let baseStats = ['armor', 'attackdamage', 'attackspeed', 'attackspeedoffset', 'crit', 'hp', 'hpregen', 'mp', 'mpregen', 'spellblock'];

  let championLevel = getLevelFromXp(state.xp);

  let stats = {magicdamage: 0, attackspeed: 0};
  for (let base of baseStats) {
    stats[base] = champion.stats[base] || 0;
    let perLevel = champion.stats[base + 'perlevel'] || 0;
    stats[base] += perLevel * championLevel;
  }

  let gold = state.gold;
  let inventory = [];

  for (let item of buildOrder) {
    let goldCost = parseInt(item.gold.total);
    let from = [].concat(item.from);
    for (let i = 0; i < inventory.length; i++) {
      for (let j = 0; j < from.length; j++) {
        let reagentId = from[j];
        if (reagentId === inventory[i].id) {
          from[j] = '';
          inventory[i] = null;
          goldCost -= staticApi.getItemById(reagentId).gold.total;
          break;
        }
      }
    }
    if (gold < goldCost) {
      // Can't afford item
      break;
    }
    gold -= goldCost;
    inventory.push(item);
    inventory = inventory.filter((a) => {
      return !!a;
    });
  }
  inventory.forEach((item) => {
    applyStats(stats, item.stats);
  });

  stats['attackspersecond'] = getAttacksPerSecond(stats);
  stats['damagepersecond'] = stats['attackspersecond'] * stats['attackdamage'] * (1 + stats['crit']);

  return stats;
}

function getAttacksPerSecond(stats) {
  return Math.min(0.625/(1 + stats.attackspeedoffset) *
                  (1 + stats.attackspeed / 100));
}

function applyStats(baseStats, stats) {
  let flatMods = [
    ['magicdamage', 'FlatMagicDamageMod'],
    ['crit', 'FlatCritChanceMod'],
    ['attackdamage', 'FlatPhysicalDamageMod'],
    ['hp', 'FlatHPPoolMod'],
    ['mp', 'FlatMPPoolMod'],
    ['spellblock', 'FlatSpellBlockMod'],
    ['attackspeed', 'PercentAttackSpeedMod']
  ];

  for (let [baseStat, statMod] of flatMods) {
    baseStats[baseStat] += parseFloat(stats[statMod]) || 0;
  }
}

function getName(key) {
  let keyNames = {
    magicdamage: 'Magic Damage',
    attackspeed: 'Attack Speed Bonus',
    armor: 'Armor',
    attackdamage: 'Attack Damage',
    crit: 'Crit Chance',
    hp: 'Health',
    hpregen: 'Health Regen',
    mp: 'Mana',
    mpregen: 'Mana Regen',
    spellblock: 'Magic Resist',
    attackspersecond: 'Attacks Per Second',
    damagepersecond: 'Expected DPS'
  };
  return keyNames[key];
}

export default {
  calculateFinal,
  calculateAtState,
  getName
};

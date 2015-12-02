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

  let stats = {magicdamage: 0, attackspeed: 0, level: championLevel};
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

class FlatModifierAdd {
  constructor(flatModifierStat, baseStat) {
    this.flatModifierStat = flatModifierStat;
    this.baseStat = baseStat;
  }

  apply(baseStats, stats) {
    baseStats[this.baseStat] += parseFloat(stats[this.flatModifierStat]) || 0;
  }
}


const modifiers = [
  new FlatModifierAdd('FlatMagicDamageMod', 'magicdamage'),
  new FlatModifierAdd('FlatCritChanceMod', 'crit'),
  new FlatModifierAdd('FlatPhysicalDamageMod', 'attackdamage'),
  new FlatModifierAdd('FlatHPPoolMod', 'hp'),
  new FlatModifierAdd('FlatMPPoolMod', 'mp'),
  new FlatModifierAdd('FlatSpellBlockMod', 'spellblock'),
  new FlatModifierAdd('PercentAttackSpeedMod', 'attackspeed')
];

function applyStats(baseStats, stats) {
  for (let modifier of modifiers) {
    modifier.apply(baseStats, stats);
  }
}

const staticStatsData = {
  magicdamage: {
    name: 'Magic Damage',
    color: '#1f77b4'
  },
  attackspeed: {
    name: 'Attack Speed Bonus',
    color: '#aec7e8'
  },
  armor: {
    name: 'Armor',
    color: '#ff7f0e'
  },
  attackdamage: {
    name: 'Attack Damage',
    color: '#ffbb78'
  },
  crit: {
    name: 'Crit Chance',
    color: '#2ca02c'
  },
  hp: {
    name: 'Health',
    color: '#98df8a'
  },
  hpregen: {
    name: 'Health Regen',
    color: '#d62728'
  },
  mp: {
    name: 'Mana',
    color: '#ff9896'
  },
  mpregen: {
    name: 'Mana Regen',
    color: '#9467bd'
  },
  spellblock: {
    name: 'Magic Resist',
    color: '#c5b0d5'
  },
  attackspersecond: {
    name: 'Attacks Per Second',
    color: '#8c564b'
  },
  damagepersecond: {
    name: 'Expected DPS',
    color: '#c49c94'
  },
  level: {
    name: 'Level',
    color: '#e377c2'
  },
  gold: {
    name: 'Gold',
    color: '#f7b6d2'
  }
};
function getName(key) {
  let data = staticStatsData[key];
  if (!data) {
    return null;
  }
  return data.name;
}

function getColor(key) {
  let data = staticStatsData[key];
  if (!data) {
    return null;
  }
  return data.color;
}

function getModifierName(key) {
  switch (key) {
  case 'FlatMagicDamageMod':
    return getName('magicdamage');
  case 'FlatCritChanceMod':
    return getName('crit');
  case 'FlatPhysicalDamageMod':
    return getName('attackdamage');
  case 'FlatHPPoolMod':
    return getName('hp');
  case 'FlatMPPoolMod':
    return getName('mp');
  case 'FlatSpellBlockMod':
    return getName('spellblock');
  case 'PercentAttackSpeedMod':
    return getName('attackspeed');
  }
  return key;
}

export default {
  calculateFinal,
  calculateAtState,
  getName,
  getModifierName,
  getColor
};

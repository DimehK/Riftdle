/**
 * Métadonnées complètes des champions League of Legends
 * Inclut: gender, position, species, rangeType, region
 */

interface ChampionMetadata {
  gender: string;
  position: string[];
  species: string[];
  rangeType: string;
  region: string[];
}

export const championMetadata: Record<string, ChampionMetadata> = {
  // A
  'Aatrox': { gender: 'Male', position: ['Top'], species: ['Darkin'], rangeType: 'Melee', region: ['Runeterra'] },
  'Ahri': { gender: 'Female', position: ['Mid'], species: ['Vastaya'], rangeType: 'Ranged', region: ['Ionia'] },
  'Akali': { gender: 'Female', position: ['Mid', 'Top'], species: ['Human'], rangeType: 'Melee', region: ['Ionia'] },
  'Akshan': { gender: 'Male', position: ['Mid', 'ADC'], species: ['Human'], rangeType: 'Ranged', region: ['Shurima'] },
  'Alistar': { gender: 'Male', position: ['Support'], species: ['Minotaur'], rangeType: 'Melee', region: ['Runeterra'] },
  'Amumu': { gender: 'Male', position: ['Jungle'], species: ['Undead'], rangeType: 'Melee', region: ['Shurima'] },
  'Anivia': { gender: 'Female', position: ['Mid'], species: ['God'], rangeType: 'Ranged', region: ['Freljord'] },
  'Annie': { gender: 'Female', position: ['Mid'], species: ['Human', 'Magically Altered'], rangeType: 'Ranged', region: ['Noxus'] },
  'Aphelios': { gender: 'Male', position: ['ADC'], species: ['Human', 'Spiritualist'], rangeType: 'Ranged', region: ['Targon'] },
  'Ashe': { gender: 'Female', position: ['ADC'], species: ['Human', 'Iceborn'], rangeType: 'Ranged', region: ['Freljord'] },
  'Aurelion Sol': { gender: 'Male', position: ['Mid'], species: ['Dragon', 'Celestial'], rangeType: 'Ranged', region: ['Targon'] },
  'Aurora': { gender: 'Female', position: ['Mid'], species: ['Human', 'Vastaya'], rangeType: 'Ranged', region: ['Freljord'] },
  'Azir': { gender: 'Male', position: ['Mid'], species: ['God-Warrior'], rangeType: 'Ranged', region: ['Shurima'] },

  // B
  'Bard': { gender: 'Male', position: ['Support'], species: ['Celestial'], rangeType: 'Ranged', region: ['Runeterra'] },
  'Bel\'Veth': { gender: 'Female', position: ['Jungle'], species: ['Void-Being'], rangeType: 'Melee', region: ['Void'] },
  'Blitzcrank': { gender: 'Male', position: ['Support'], species: ['Golem'], rangeType: 'Melee', region: ['Zaun'] },
  'Brand': { gender: 'Male', position: ['Support', 'Mid'], species: ['Human', 'Magically Altered'], rangeType: 'Ranged', region: ['Freljord'] },
  'Braum': { gender: 'Male', position: ['Support'], species: ['Human', 'Iceborn'], rangeType: 'Melee', region: ['Freljord'] },
  'Briar': { gender: 'Female', position: ['Jungle'], species: ['Vampire'], rangeType: 'Melee', region: ['Noxus'] },

  // C
  'Caitlyn': { gender: 'Female', position: ['ADC'], species: ['Human'], rangeType: 'Ranged', region: ['Piltover'] },
  'Camille': { gender: 'Female', position: ['Top'], species: ['Human', 'Cyborg'], rangeType: 'Melee', region: ['Piltover'] },
  'Cassiopeia': { gender: 'Female', position: ['Mid'], species: ['Human', 'Magically Altered'], rangeType: 'Ranged', region: ['Noxus'] },
  'Cho\'Gath': { gender: 'Male', position: ['Top'], species: ['Void-Being'], rangeType: 'Melee', region: ['Void'] },
  'Corki': { gender: 'Male', position: ['Mid', 'ADC'], species: ['Yordle'], rangeType: 'Ranged', region: ['Bandle City'] },

  // D
  'Darius': { gender: 'Male', position: ['Top'], species: ['Human'], rangeType: 'Melee', region: ['Noxus'] },
  'Diana': { gender: 'Female', position: ['Jungle', 'Mid'], species: ['Human', 'Aspect'], rangeType: 'Melee', region: ['Targon'] },
  'Dr. Mundo': { gender: 'Male', position: ['Top'], species: ['Human', 'Chemically Altered'], rangeType: 'Melee', region: ['Zaun'] },
  'Draven': { gender: 'Male', position: ['ADC'], species: ['Human'], rangeType: 'Ranged', region: ['Noxus'] },

  // E
  'Ekko': { gender: 'Male', position: ['Jungle', 'Mid'], species: ['Human'], rangeType: 'Melee', region: ['Zaun'] },
  'Elise': { gender: 'Female', position: ['Jungle'], species: ['Human', 'Magically Altered'], rangeType: 'Ranged', region: ['Shadow Isles'] },
  'Evelynn': { gender: 'Female', position: ['Jungle'], species: ['Demon'], rangeType: 'Melee', region: ['Runeterra'] },
  'Ezreal': { gender: 'Male', position: ['ADC'], species: ['Human', 'Magically Altered'], rangeType: 'Ranged', region: ['Piltover'] },

  // F
  'Fiddlesticks': { gender: 'Other', position: ['Jungle'], species: ['Demon'], rangeType: 'Ranged', region: ['Runeterra'] },
  'Fiora': { gender: 'Female', position: ['Top'], species: ['Human'], rangeType: 'Melee', region: ['Demacia'] },
  'Fizz': { gender: 'Male', position: ['Mid'], species: ['Yordle'], rangeType: 'Melee', region: ['Bilgewater'] },

  // G
  'Galio': { gender: 'Male', position: ['Mid', 'Support'], species: ['Golem'], rangeType: 'Melee', region: ['Demacia'] },
  'Gangplank': { gender: 'Male', position: ['Top'], species: ['Human'], rangeType: 'Melee', region: ['Bilgewater'] },
  'Garen': { gender: 'Male', position: ['Top'], species: ['Human'], rangeType: 'Melee', region: ['Demacia'] },
  'Gnar': { gender: 'Male', position: ['Top'], species: ['Yordle'], rangeType: 'Ranged', region: ['Freljord'] },
  'Gragas': { gender: 'Male', position: ['Jungle', 'Top'], species: ['Human'], rangeType: 'Melee', region: ['Freljord'] },
  'Graves': { gender: 'Male', position: ['Jungle'], species: ['Human'], rangeType: 'Ranged', region: ['Bilgewater'] },
  'Gwen': { gender: 'Female', position: ['Top'], species: ['Doll'], rangeType: 'Melee', region: ['Shadow Isles'] },

  // H
  'Hecarim': { gender: 'Male', position: ['Jungle'], species: ['Undead'], rangeType: 'Melee', region: ['Shadow Isles'] },
  'Heimerdinger': { gender: 'Male', position: ['Mid', 'Top'], species: ['Yordle'], rangeType: 'Ranged', region: ['Piltover'] },
  'Hwei': { gender: 'Male', position: ['Mid', 'Support'], species: ['Human'], rangeType: 'Ranged', region: ['Ionia'] },

  // I
  'Illaoi': { gender: 'Female', position: ['Top'], species: ['Human'], rangeType: 'Melee', region: ['Bilgewater'] },
  'Irelia': { gender: 'Female', position: ['Top', 'Mid'], species: ['Human'], rangeType: 'Melee', region: ['Ionia'] },
  'Ivern': { gender: 'Male', position: ['Jungle'], species: ['Spirit'], rangeType: 'Ranged', region: ['Ionia'] },

  // J
  'Janna': { gender: 'Female', position: ['Support'], species: ['God', 'Elemental'], rangeType: 'Ranged', region: ['Zaun'] },
  'Jarvan IV': { gender: 'Male', position: ['Jungle'], species: ['Human'], rangeType: 'Melee', region: ['Demacia'] },
  'Jax': { gender: 'Male', position: ['Top', 'Jungle'], species: ['Unknown'], rangeType: 'Melee', region: ['Icathia'] },
  'Jayce': { gender: 'Male', position: ['Top', 'Mid'], species: ['Human'], rangeType: 'Ranged', region: ['Piltover'] },
  'Jhin': { gender: 'Male', position: ['ADC'], species: ['Human', 'Spiritualist'], rangeType: 'Ranged', region: ['Ionia'] },
  'Jinx': { gender: 'Female', position: ['ADC'], species: ['Human', 'Chemically Altered'], rangeType: 'Ranged', region: ['Zaun'] },

  // K
  'K\'Sante': { gender: 'Male', position: ['Top'], species: ['Human'], rangeType: 'Melee', region: ['Shurima'] },
  'Kai\'Sa': { gender: 'Female', position: ['ADC'], species: ['Human', 'Void-Being'], rangeType: 'Ranged', region: ['Void'] },
  'Kalista': { gender: 'Female', position: ['ADC'], species: ['Undead'], rangeType: 'Ranged', region: ['Shadow Isles'] },
  'Karma': { gender: 'Female', position: ['Support', 'Mid'], species: ['Human', 'Spiritualist'], rangeType: 'Ranged', region: ['Ionia'] },
  'Karthus': { gender: 'Male', position: ['Jungle'], species: ['Undead'], rangeType: 'Ranged', region: ['Shadow Isles'] },
  'Kassadin': { gender: 'Male', position: ['Mid'], species: ['Human', 'Void-Being'], rangeType: 'Melee', region: ['Shurima'] },
  'Katarina': { gender: 'Female', position: ['Mid'], species: ['Human'], rangeType: 'Melee', region: ['Noxus'] },
  'Kayle': { gender: 'Female', position: ['Top'], species: ['Aspect'], rangeType: 'Melee', region: ['Targon'] },
  'Kayn': { gender: 'Male', position: ['Jungle'], species: ['Human', 'Darkin'], rangeType: 'Melee', region: ['Ionia'] },
  'Kennen': { gender: 'Male', position: ['Top'], species: ['Yordle'], rangeType: 'Ranged', region: ['Ionia'] },
  'Kha\'Zix': { gender: 'Male', position: ['Jungle'], species: ['Void-Being'], rangeType: 'Melee', region: ['Void'] },
  'Kindred': { gender: 'Other', position: ['Jungle'], species: ['God', 'Spirit'], rangeType: 'Ranged', region: ['Runeterra'] },
  'Kled': { gender: 'Male', position: ['Top'], species: ['Yordle'], rangeType: 'Melee', region: ['Noxus'] },
  'Kog\'Maw': { gender: 'Male', position: ['ADC'], species: ['Void-Being'], rangeType: 'Ranged', region: ['Void'] },

  // L
  'LeBlanc': { gender: 'Female', position: ['Mid'], species: ['Human', 'Magically Altered'], rangeType: 'Ranged', region: ['Noxus'] },
  'Lee Sin': { gender: 'Male', position: ['Jungle'], species: ['Human', 'Spiritualist'], rangeType: 'Melee', region: ['Ionia'] },
  'Leona': { gender: 'Female', position: ['Support'], species: ['Human', 'Aspect'], rangeType: 'Melee', region: ['Targon'] },
  'Lillia': { gender: 'Female', position: ['Jungle'], species: ['Spirit'], rangeType: 'Ranged', region: ['Ionia'] },
  'Lissandra': { gender: 'Female', position: ['Mid'], species: ['Human', 'Iceborn'], rangeType: 'Ranged', region: ['Freljord'] },
  'Lucian': { gender: 'Male', position: ['ADC'], species: ['Human'], rangeType: 'Ranged', region: ['Demacia'] },
  'Lulu': { gender: 'Female', position: ['Support'], species: ['Yordle'], rangeType: 'Ranged', region: ['Bandle City'] },
  'Lux': { gender: 'Female', position: ['Mid', 'Support'], species: ['Human', 'Magically Altered'], rangeType: 'Ranged', region: ['Demacia'] },

  // M
  'Malphite': { gender: 'Male', position: ['Top', 'Support'], species: ['Golem'], rangeType: 'Melee', region: ['Ixtal'] },
  'Malzahar': { gender: 'Male', position: ['Mid'], species: ['Human', 'Void-Being'], rangeType: 'Ranged', region: ['Void'] },
  'Maokai': { gender: 'Male', position: ['Top', 'Support'], species: ['Spirit'], rangeType: 'Melee', region: ['Shadow Isles'] },
  'Master Yi': { gender: 'Male', position: ['Jungle'], species: ['Human'], rangeType: 'Melee', region: ['Ionia'] },
  'Milio': { gender: 'Male', position: ['Support'], species: ['Human'], rangeType: 'Ranged', region: ['Ixtal'] },
  'Miss Fortune': { gender: 'Female', position: ['ADC'], species: ['Human'], rangeType: 'Ranged', region: ['Bilgewater'] },
  'Mordekaiser': { gender: 'Male', position: ['Top'], species: ['Undead'], rangeType: 'Melee', region: ['Noxus'] },
  'Morgana': { gender: 'Female', position: ['Support'], species: ['Aspect'], rangeType: 'Ranged', region: ['Targon'] },

  // N
  'Naafiri': { gender: 'Female', position: ['Mid'], species: ['Darkin'], rangeType: 'Melee', region: ['Shurima'] },
  'Nami': { gender: 'Female', position: ['Support'], species: ['Vastaya'], rangeType: 'Ranged', region: ['Runeterra'] },
  'Nasus': { gender: 'Male', position: ['Top'], species: ['God-Warrior'], rangeType: 'Melee', region: ['Shurima'] },
  'Nautilus': { gender: 'Male', position: ['Support'], species: ['Undead'], rangeType: 'Melee', region: ['Bilgewater'] },
  'Neeko': { gender: 'Female', position: ['Mid', 'Support'], species: ['Vastaya'], rangeType: 'Ranged', region: ['Ixtal'] },
  'Nidalee': { gender: 'Female', position: ['Jungle'], species: ['Human', 'Magically Altered'], rangeType: 'Ranged', region: ['Ixtal'] },
  'Nilah': { gender: 'Female', position: ['ADC'], species: ['Human'], rangeType: 'Melee', region: ['Bilgewater'] },
  'Nocturne': { gender: 'Male', position: ['Jungle'], species: ['Demon'], rangeType: 'Melee', region: ['Runeterra'] },
  'Nunu & Willump': { gender: 'Male', position: ['Jungle'], species: ['Human', 'Yeti'], rangeType: 'Melee', region: ['Freljord'] },

  // O
  'Olaf': { gender: 'Male', position: ['Jungle', 'Top'], species: ['Human'], rangeType: 'Melee', region: ['Freljord'] },
  'Orianna': { gender: 'Female', position: ['Mid'], species: ['Golem'], rangeType: 'Ranged', region: ['Piltover'] },
  'Ornn': { gender: 'Male', position: ['Top'], species: ['God'], rangeType: 'Melee', region: ['Freljord'] },

  // P
  'Pantheon': { gender: 'Male', position: ['Top', 'Mid', 'Support'], species: ['Human', 'Aspect'], rangeType: 'Melee', region: ['Targon'] },
  'Poppy': { gender: 'Female', position: ['Jungle', 'Top'], species: ['Yordle'], rangeType: 'Melee', region: ['Demacia'] },
  'Pyke': { gender: 'Male', position: ['Support'], species: ['Undead'], rangeType: 'Melee', region: ['Bilgewater'] },

  // Q
  'Qiyana': { gender: 'Female', position: ['Mid'], species: ['Human'], rangeType: 'Melee', region: ['Ixtal'] },
  'Quinn': { gender: 'Female', position: ['Top'], species: ['Human'], rangeType: 'Ranged', region: ['Demacia'] },

  // R
  'Rakan': { gender: 'Male', position: ['Support'], species: ['Vastaya'], rangeType: 'Melee', region: ['Ionia'] },
  'Rammus': { gender: 'Male', position: ['Jungle'], species: ['God-Warrior'], rangeType: 'Melee', region: ['Shurima'] },
  'Rek\'Sai': { gender: 'Female', position: ['Jungle'], species: ['Void-Being'], rangeType: 'Melee', region: ['Void'] },
  'Rell': { gender: 'Female', position: ['Support'], species: ['Human', 'Magically Altered'], rangeType: 'Melee', region: ['Noxus'] },
  'Renata Glasc': { gender: 'Female', position: ['Support'], species: ['Human', 'Chemically Altered'], rangeType: 'Ranged', region: ['Zaun'] },
  'Renekton': { gender: 'Male', position: ['Top'], species: ['God-Warrior'], rangeType: 'Melee', region: ['Shurima'] },
  'Rengar': { gender: 'Male', position: ['Jungle', 'Top'], species: ['Vastaya'], rangeType: 'Melee', region: ['Ixtal'] },
  'Riven': { gender: 'Female', position: ['Top'], species: ['Human'], rangeType: 'Melee', region: ['Noxus'] },
  'Rumble': { gender: 'Male', position: ['Top'], species: ['Yordle'], rangeType: 'Melee', region: ['Bandle City'] },
  'Ryze': { gender: 'Male', position: ['Mid', 'Top'], species: ['Human', 'Magically Altered'], rangeType: 'Ranged', region: ['Runeterra'] },

  // S
  'Samira': { gender: 'Female', position: ['ADC'], species: ['Human'], rangeType: 'Ranged', region: ['Noxus'] },
  'Sejuani': { gender: 'Female', position: ['Jungle'], species: ['Human', 'Iceborn'], rangeType: 'Melee', region: ['Freljord'] },
  'Senna': { gender: 'Female', position: ['Support', 'ADC'], species: ['Human', 'Undead'], rangeType: 'Ranged', region: ['Demacia'] },
  'Seraphine': { gender: 'Female', position: ['Support', 'Mid'], species: ['Human'], rangeType: 'Ranged', region: ['Piltover'] },
  'Sett': { gender: 'Male', position: ['Top'], species: ['Human', 'Vastaya'], rangeType: 'Melee', region: ['Ionia'] },
  'Shaco': { gender: 'Male', position: ['Jungle'], species: ['Demon'], rangeType: 'Melee', region: ['Runeterra'] },
  'Shen': { gender: 'Male', position: ['Top'], species: ['Human', 'Spiritualist'], rangeType: 'Melee', region: ['Ionia'] },
  'Shyvana': { gender: 'Female', position: ['Jungle'], species: ['Dragon', 'Human'], rangeType: 'Melee', region: ['Demacia'] },
  'Singed': { gender: 'Male', position: ['Top'], species: ['Human', 'Chemically Altered'], rangeType: 'Melee', region: ['Zaun'] },
  'Sion': { gender: 'Male', position: ['Top'], species: ['Undead'], rangeType: 'Melee', region: ['Noxus'] },
  'Sivir': { gender: 'Female', position: ['ADC'], species: ['Human'], rangeType: 'Ranged', region: ['Shurima'] },
  'Skarner': { gender: 'Male', position: ['Jungle'], species: ['Brackern'], rangeType: 'Melee', region: ['Ixtal'] },
  'Smolder': { gender: 'Male', position: ['ADC'], species: ['Dragon'], rangeType: 'Ranged', region: ['Runeterra'] },
  'Sona': { gender: 'Female', position: ['Support'], species: ['Human', 'Magically Altered'], rangeType: 'Ranged', region: ['Demacia'] },
  'Soraka': { gender: 'Female', position: ['Support'], species: ['Celestial'], rangeType: 'Ranged', region: ['Targon'] },
  'Swain': { gender: 'Male', position: ['Support', 'Mid'], species: ['Human'], rangeType: 'Ranged', region: ['Noxus'] },
  'Sylas': { gender: 'Male', position: ['Mid', 'Jungle'], species: ['Human', 'Magically Altered'], rangeType: 'Melee', region: ['Demacia'] },
  'Syndra': { gender: 'Female', position: ['Mid'], species: ['Human', 'Magically Altered'], rangeType: 'Ranged', region: ['Ionia'] },

  // T
  'Tahm Kench': { gender: 'Male', position: ['Support', 'Top'], species: ['Demon'], rangeType: 'Melee', region: ['Runeterra'] },
  'Taliyah': { gender: 'Female', position: ['Jungle', 'Mid'], species: ['Human'], rangeType: 'Ranged', region: ['Shurima'] },
  'Talon': { gender: 'Male', position: ['Mid'], species: ['Human'], rangeType: 'Melee', region: ['Noxus'] },
  'Taric': { gender: 'Male', position: ['Support'], species: ['Human', 'Aspect'], rangeType: 'Melee', region: ['Targon'] },
  'Teemo': { gender: 'Male', position: ['Top'], species: ['Yordle'], rangeType: 'Ranged', region: ['Bandle City'] },
  'Thresh': { gender: 'Male', position: ['Support'], species: ['Undead'], rangeType: 'Ranged', region: ['Shadow Isles'] },
  'Tristana': { gender: 'Female', position: ['ADC'], species: ['Yordle'], rangeType: 'Ranged', region: ['Bandle City'] },
  'Trundle': { gender: 'Male', position: ['Jungle', 'Top'], species: ['Troll'], rangeType: 'Melee', region: ['Freljord'] },
  'Tryndamere': { gender: 'Male', position: ['Top'], species: ['Human', 'Magically Altered'], rangeType: 'Melee', region: ['Freljord'] },
  'Twisted Fate': { gender: 'Male', position: ['Mid'], species: ['Human', 'Magically Altered'], rangeType: 'Ranged', region: ['Bilgewater'] },
  'Twitch': { gender: 'Male', position: ['ADC'], species: ['Rat', 'Chemically Altered'], rangeType: 'Ranged', region: ['Zaun'] },

  // U
  'Udyr': { gender: 'Male', position: ['Jungle'], species: ['Human', 'Spiritualist'], rangeType: 'Melee', region: ['Freljord'] },
  'Urgot': { gender: 'Male', position: ['Top'], species: ['Human', 'Chemically Altered'], rangeType: 'Ranged', region: ['Zaun'] },

  // V
  'Varus': { gender: 'Male', position: ['ADC'], species: ['Human', 'Darkin'], rangeType: 'Ranged', region: ['Ionia'] },
  'Vayne': { gender: 'Female', position: ['ADC'], species: ['Human'], rangeType: 'Ranged', region: ['Demacia'] },
  'Veigar': { gender: 'Male', position: ['Mid'], species: ['Yordle'], rangeType: 'Ranged', region: ['Bandle City'] },
  'Vel\'Koz': { gender: 'Male', position: ['Mid', 'Support'], species: ['Void-Being'], rangeType: 'Ranged', region: ['Void'] },
  'Vex': { gender: 'Female', position: ['Mid'], species: ['Yordle'], rangeType: 'Ranged', region: ['Shadow Isles'] },
  'Vi': { gender: 'Female', position: ['Jungle'], species: ['Human'], rangeType: 'Melee', region: ['Piltover'] },
  'Viego': { gender: 'Male', position: ['Jungle'], species: ['Undead'], rangeType: 'Melee', region: ['Shadow Isles'] },
  'Viktor': { gender: 'Male', position: ['Mid'], species: ['Human', 'Cyborg'], rangeType: 'Ranged', region: ['Zaun'] },
  'Vladimir': { gender: 'Male', position: ['Mid', 'Top'], species: ['Vampire'], rangeType: 'Ranged', region: ['Noxus'] },
  'Volibear': { gender: 'Male', position: ['Jungle', 'Top'], species: ['God'], rangeType: 'Melee', region: ['Freljord'] },

  // W
  'Warwick': { gender: 'Male', position: ['Jungle'], species: ['Human', 'Chemically Altered'], rangeType: 'Melee', region: ['Zaun'] },
  'Wukong': { gender: 'Male', position: ['Jungle', 'Top'], species: ['Vastaya'], rangeType: 'Melee', region: ['Ionia'] },

  // X
  'Xayah': { gender: 'Female', position: ['ADC'], species: ['Vastaya'], rangeType: 'Ranged', region: ['Ionia'] },
  'Xerath': { gender: 'Male', position: ['Mid', 'Support'], species: ['God-Warrior'], rangeType: 'Ranged', region: ['Shurima'] },
  'Xin Zhao': { gender: 'Male', position: ['Jungle'], species: ['Human'], rangeType: 'Melee', region: ['Demacia'] },

  // Y
  'Yasuo': { gender: 'Male', position: ['Mid', 'Top'], species: ['Human'], rangeType: 'Melee', region: ['Ionia'] },
  'Yone': { gender: 'Male', position: ['Mid', 'Top'], species: ['Human', 'Spirit'], rangeType: 'Melee', region: ['Ionia'] },
  'Yorick': { gender: 'Male', position: ['Top'], species: ['Human', 'Undead'], rangeType: 'Melee', region: ['Shadow Isles'] },
  'Yuumi': { gender: 'Female', position: ['Support'], species: ['Cat', 'Magically Altered'], rangeType: 'Ranged', region: ['Bandle City'] },

  // Z
  'Zac': { gender: 'Male', position: ['Jungle'], species: ['Golem'], rangeType: 'Melee', region: ['Zaun'] },
  'Zed': { gender: 'Male', position: ['Mid'], species: ['Human'], rangeType: 'Melee', region: ['Ionia'] },
  'Zeri': { gender: 'Female', position: ['ADC'], species: ['Human', 'Magically Altered'], rangeType: 'Ranged', region: ['Zaun'] },
  'Ziggs': { gender: 'Male', position: ['Mid'], species: ['Yordle'], rangeType: 'Ranged', region: ['Zaun'] },
  'Zilean': { gender: 'Male', position: ['Support', 'Mid'], species: ['Human', 'Magically Altered'], rangeType: 'Ranged', region: ['Icathia'] },
  'Zoe': { gender: 'Female', position: ['Mid'], species: ['Human', 'Aspect'], rangeType: 'Ranged', region: ['Targon'] },
  'Zyra': { gender: 'Female', position: ['Support'], species: ['Plant', 'Magically Altered'], rangeType: 'Ranged', region: ['Ixtal'] },
};

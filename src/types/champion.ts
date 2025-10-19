export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  tags: string[];
  partype: string;

  // NOUVEAUX CHAMPS LOLDLE
  gender: 'Male' | 'Female' | 'Other';
  position: string[];       // ["Mid", "Support"]
  species: string;          // "Vastaya", "Human", "Yordle", etc.
  resource: string;         // "Mana", "Energy", "None", etc.
  range: 'Melee' | 'Ranged';
  region: string[];         // ["Ionia", "Bilgewater"]
  releaseYear: number;      // 2011, 2013, etc.

  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  stats: {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
  };
  image: {
    full: string;
    sprite: string;
    group: string;
  };
}

export interface ChampionGuess {
  champion: Champion;
  isCorrect: boolean;
}
export interface ProPlayer {
  id: string;
  ign: string;                    // Pseudo du joueur
  realName: string;               // Nom réel
  startYear: number;              // Année de début (ex: 2013)
  role: string;                   // Top, Jungle, Mid, ADC, Support
  league: string;                 // LCK, LPL, LEC, LCS, etc.
  favoriteChampion: string;       // Champion préféré
  birthYear: number;              // Année de naissance
  hasWonWorlds: boolean;          // A gagné les Worlds ?
  region: string;                 // Korea, China, Europe, NA
  team?: string;                  // Équipe actuelle (optionnel)
  imageUrl?: string;              // Photo (optionnel)
}

export interface ProPlayerGuess {
  player: ProPlayer;
  isCorrect: boolean;
}
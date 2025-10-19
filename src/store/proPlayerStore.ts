import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProPlayer, ProPlayerGuess } from '@/types/proPlayer';

interface ProPlayerStore {
  // État du jeu
  currentPlayer: ProPlayer | null;
  guesses: ProPlayerGuess[];
  isGameWon: boolean;
  gaveUp: boolean;

  // Daily challenge
  dailyPlayerId: string | null;
  dailyDate: string | null; // ISO date string
  dailyCompleted: boolean;

  // Statistiques
  winstreak: number;
  bestStreak: number;
  totalGamesPlayed: number;
  totalWins: number;

  // Actions
  setCurrentPlayer: (player: ProPlayer) => void;
  addGuess: (player: ProPlayer) => void;
  resetGame: () => void;
  incrementWinstreak: () => void;
  resetWinstreak: () => void;
  revealAnswer: () => void;
  resetAllStats: () => void;
  checkAndResetDaily: () => void;
  setDailyPlayer: (playerId: string) => void;
}

export const useProPlayerStore = create<ProPlayerStore>()(
  persist(
    (set, get) => ({
      currentPlayer: null,
      guesses: [],
      isGameWon: false,
      gaveUp: false,
      dailyPlayerId: null,
      dailyDate: null,
      dailyCompleted: false,
      winstreak: 0,
      bestStreak: 0,
      totalGamesPlayed: 0,
      totalWins: 0,

      setCurrentPlayer: (player) => {
        set({
          currentPlayer: player,
          guesses: [],
          isGameWon: false,
          gaveUp: false
        });
      },

      addGuess: (player) => {
        const { currentPlayer, guesses } = get();

        if (!currentPlayer || get().isGameWon) return;

        const alreadyGuessed = guesses.some(
          g => g.player.id === player.id
        );
        if (alreadyGuessed) return;

        const isCorrect = player.id === currentPlayer.id;

        set((state) => ({
          guesses: [...state.guesses, { player, isCorrect }],
          isGameWon: isCorrect,
        }));

        if (isCorrect) {
          get().incrementWinstreak();
          set((state) => ({
            totalWins: state.totalWins + 1,
            totalGamesPlayed: state.totalGamesPlayed + 1,
            dailyCompleted: true,
          }));
        }
      },

      resetGame: () => {
        const { isGameWon, gaveUp, guesses } = get();

        // Si abandon ou perte (et qu'il y a eu des tentatives), reset winstreak et incrémenter games played
        if (!isGameWon || gaveUp) {
          get().resetWinstreak();
          // Incrémenter totalGamesPlayed seulement si le jeu était actif (au moins 1 essai) et qu'on a perdu
          if (guesses.length > 0) {
            set((state) => ({
              totalGamesPlayed: state.totalGamesPlayed + 1,
            }));
          }
        }

        set({
          currentPlayer: null,
          guesses: [],
          isGameWon: false,
          gaveUp: false,
          dailyCompleted: false,
        });
      },

      incrementWinstreak: () => {
        set((state) => {
          const newStreak = state.winstreak + 1;
          return {
            winstreak: newStreak,
            bestStreak: Math.max(newStreak, state.bestStreak),
          };
        });
      },

      resetWinstreak: () => {
        set({ winstreak: 0 });
      },

      revealAnswer: () => {
        const { currentPlayer } = get();
        if (!currentPlayer) return;

        // Reset winstreak car c'est un abandon
        get().resetWinstreak();

        // Ajouter la bonne réponse comme dernière tentative
        set((state) => ({
          guesses: [...state.guesses, { player: currentPlayer, isCorrect: true }],
          isGameWon: true,
          gaveUp: true,
          dailyCompleted: true,
        }));
      },

      // Réinitialiser toutes les statistiques
      resetAllStats: () => {
        set({
          winstreak: 0,
          bestStreak: 0,
          totalGamesPlayed: 0,
          totalWins: 0,
        });
      },

      // Set daily player
      setDailyPlayer: (playerId: string) => {
        const now = new Date();
        set({
          dailyPlayerId: playerId,
          dailyDate: now.toISOString(),
          dailyCompleted: false,
        });
      },

      // Check if we need to reset for a new day (1pm CET)
      checkAndResetDaily: () => {
        const { dailyDate } = get();

        if (!dailyDate) return;

        // Get current time in CET
        const now = new Date();
        const cetTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));

        // Get the daily reset time (1pm CET today)
        const resetTime = new Date(cetTime);
        resetTime.setHours(13, 0, 0, 0);

        // If current time is before 1pm, the reset time should be for yesterday
        if (cetTime.getHours() < 13) {
          resetTime.setDate(resetTime.getDate() - 1);
        }

        const lastDailyDate = new Date(dailyDate);

        // If the last daily date is before the reset time, we need to reset
        if (lastDailyDate < resetTime) {
          set({
            dailyPlayerId: null,
            dailyDate: null,
            dailyCompleted: false,
            currentPlayer: null,
            guesses: [],
            isGameWon: false,
            gaveUp: false,
          });
        }
      },
    }),
    {
      name: 'loldle-proplayer-storage',
      partialize: (state) => ({
        winstreak: state.winstreak,
        bestStreak: state.bestStreak,
        totalGamesPlayed: state.totalGamesPlayed,
        totalWins: state.totalWins,
        dailyPlayerId: state.dailyPlayerId,
        dailyDate: state.dailyDate,
        dailyCompleted: state.dailyCompleted,
        currentPlayer: state.currentPlayer,
        guesses: state.guesses,
        isGameWon: state.isGameWon,
        gaveUp: state.gaveUp,
      }),
    }
  )
);
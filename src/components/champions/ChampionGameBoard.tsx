'use client';

import { useEffect, useState } from 'react';
import { useChampionStore } from '@/store/championStore';
import { Champion } from '@/types/champion';
import ChampionGuessInput from './ChampionGuessInput';
import ChampionResultRow from './ChampionResultRow';
import { getChampionSplashUrl } from '@/utils/riotApi';

interface Props {
  champions: Champion[];
}

export default function ChampionGameBoard({ champions }: Props) {
  const {
    currentChampion,
    guesses,
    isGameWon,
    gaveUp,
    setCurrentChampion,
    addGuess,
    resetGame,
    revealAnswer,
  } = useChampionStore();

  const [initialized, setInitialized] = useState(false);
  const [revealedLetters, setRevealedLetters] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Démarrer une nouvelle partie
  const startNewGame = () => {
    const randomChamp = champions[Math.floor(Math.random() * champions.length)];
    resetGame();
    setCurrentChampion(randomChamp);
    setRevealedLetters(0);
    setShowCelebration(false);
  };

  // Initialiser le jeu au chargement (une seule fois)
  useEffect(() => {
    if (!initialized && !currentChampion && champions.length > 0) {
      const randomChamp = champions[Math.floor(Math.random() * champions.length)];
      setCurrentChampion(randomChamp);
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  // Gérer une tentative
  const handleGuess = (champion: Champion) => {
    addGuess(champion);
  };

  // Show celebration after delay when game is won
  useEffect(() => {
    if (isGameWon && !gaveUp) {
      const timer = setTimeout(() => {
        setShowCelebration(true);
      }, 1500); // 1.5 second delay to show the green row first
      return () => clearTimeout(timer);
    } else if (gaveUp) {
      setShowCelebration(true);
    }
  }, [isGameWon, gaveUp]);

  // Abandonner
  const handleGiveUp = () => {
    revealAnswer();
  };

  // Loading state
  if (!currentChampion) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-2xl text-white">Loading champions...</div>
      </div>
    );
  }

  const guessedChampionIds = guesses.map(g => g.champion.id);

  // Calculate hint - show revealed letters
  const getHint = () => {
    if (!currentChampion || isGameWon || revealedLetters === 0) return null;

    // Cap revealed letters at the name length
    const maxReveals = Math.min(revealedLetters, currentChampion.name.length);
    const hint = currentChampion.name.substring(0, maxReveals);
    const remaining = Math.max(0, currentChampion.name.length - maxReveals);

    return {
      letters: hint,
      blanks: '_'.repeat(remaining)
    };
  };

  const hint = getHint();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Zone de victoire */}
      {isGameWon && currentChampion && showCelebration && (
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${getChampionSplashUrl(currentChampion.id)})`,
              filter: 'blur(8px) brightness(0.4)'
            }}
          />
          <div className="relative z-10 p-12 text-center space-y-6">
            {!gaveUp && <div className="text-6xl mb-4">🎉</div>}
            <h2 className="text-5xl font-bold text-white drop-shadow-lg">
              {gaveUp ? 'Nice try!' : 'Congratulations!'}
            </h2>
            <p className="text-2xl text-white drop-shadow-md">
              {gaveUp ? (
                <>The champion was <span className="font-bold text-yellow-300">{currentChampion.name}</span></>
              ) : (
                <>You found <span className="font-bold text-yellow-300">{currentChampion.name}</span></>
              )}
            </p>
            <p className="text-xl text-gray-200 drop-shadow-md">
              {currentChampion.title}
            </p>
            {!gaveUp && (
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 inline-block">
                <p className="text-3xl font-bold text-white">
                  Guessed in {guesses.length} {guesses.length === 1 ? 'try' : 'tries'}!
                </p>
              </div>
            )}
            <button
              onClick={startNewGame}
              className="mt-8 px-8 py-4 bg-black/50 backdrop-blur-md border-2 border-white/30 text-white text-xl rounded-2xl hover:border-blue-400 font-bold shadow-xl transform transition-transform duration-500 hover:scale-105"
            >
              Play Again
            </button>
          </div>
        </div>
      )}


      {/* Input de devinette */}
      {!isGameWon && (
        <>
          <ChampionGuessInput
            champions={champions}
            onGuess={handleGuess}
            disabled={isGameWon}
            guessedChampions={guessedChampionIds}
          />

          {/* Hint System */}
          {guesses.length >= 3 && revealedLetters < (guesses.length - 2) && revealedLetters < currentChampion.name.length && (
            <div className="text-center">
              <button
                onClick={() => setRevealedLetters(prev => prev + 1)}
                className="px-6 py-3 bg-black/40 backdrop-blur-md border-2 border-yellow-400 text-yellow-300 rounded-xl hover:border-yellow-500 hover:bg-yellow-400/20 font-bold shadow-lg transition-all duration-500"
              >
                💡 Reveal Next Letter ({revealedLetters}/{Math.min(guesses.length - 2, currentChampion.name.length)})
              </button>
            </div>
          )}

          {hint && (
            <div className="bg-black/40 backdrop-blur-md border-2 border-yellow-400 rounded-xl p-4 text-center">
              <div className="text-yellow-300 font-bold text-sm mb-2">💡 Hint</div>
              <div className="text-white text-3xl font-bold tracking-widest">
                {hint.letters}
                <span className="text-gray-500">{hint.blanks}</span>
              </div>
              <div className="text-xs text-gray-300 mt-2">
                {revealedLetters} letter{revealedLetters > 1 ? 's' : ''} revealed
              </div>
            </div>
          )}
        </>
      )}

      {/* Liste des tentatives */}
      <div className="space-y-3">
        {[...guesses].reverse().map((guess, idx) => (
          <ChampionResultRow
            key={guesses.length - 1 - idx}
            guess={guess.champion}
            answer={currentChampion}
          />
        ))}
      </div>

      {/* Boutons d'action */}
      {!isGameWon && guesses.length > 0 && (
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleGiveUp}
            className="px-6 py-3 bg-black/40 backdrop-blur-md border-2 border-white/20 text-white rounded-xl hover:border-blue-400 font-bold shadow-lg"
          >
            😔 Give Up
          </button>
          <button
            onClick={startNewGame}
            className="px-6 py-3 bg-black/40 backdrop-blur-md border-2 border-white/20 text-white rounded-xl hover:border-blue-400 font-bold shadow-lg"
          >
            🔄 Skip to New Game
          </button>
        </div>
      )}

      {/* Légende pour les débutants */}
      {!isGameWon && guesses.length === 0 && (
        <div className="bg-black/40 backdrop-blur-md border-2 border-white/20 rounded-xl p-4 text-white">
          <h3 className="text-lg font-bold mb-3 text-center">How to Play</h3>
          <div className="grid grid-cols-3 gap-3 text-xs max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-6 h-6 bg-green-500 rounded-md mx-auto mb-2"></div>
              <p className="font-bold text-sm">Green</p>
              <p className="text-xs opacity-75">Correct match!</p>
            </div>
            <div className="text-center">
              <div className="w-6 h-6 bg-yellow-500 rounded-md mx-auto mb-2"></div>
              <p className="font-bold text-sm">Yellow</p>
              <p className="text-xs opacity-75">Partial match</p>
            </div>
            <div className="text-center">
              <div className="w-6 h-6 bg-red-500 rounded-md mx-auto mb-2 flex items-center justify-center text-sm">
                ↓
              </div>
              <p className="font-bold text-sm">Red + Arrow</p>
              <p className="text-xs opacity-75">Wrong value</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSplashArtStore, ZOOM_LEVELS } from '@/store/splashArtStore';
import { Champion } from '@/types/champion';
import ChampionGuessInput from '@/components/champions/ChampionGuessInput';
import { getChampionSplashUrl, getChampionImageUrl, getChampionSkins } from '@/utils/riotApi';

interface Props {
  champions: Champion[];
}

export default function SplashArtGameBoard({ champions }: Props) {
  const {
    currentChampion,
    currentSkinNum,
    currentSkinName,
    guessedChampionIds,
    isGameWon,
    gaveUp,
    zoomLevel,
    setCurrentChampion,
    addGuess,
    resetGame,
    revealAnswer,
  } = useSplashArtStore();

  const [initialized, setInitialized] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Random origin for the zoom, stable per champion + skin
  const zoomOrigin = useMemo(() => {
    if (!currentChampion) return { x: 50, y: 40 };
    const seed = (parseInt(currentChampion.key, 10) || 0) + currentSkinNum;
    const x = 20 + (seed * 37 % 60); // 20-80%
    const y = 15 + (seed * 53 % 50); // 15-65%
    return { x, y };
  }, [currentChampion, currentSkinNum]);

  const startNewGame = async () => {
    const randomChamp = champions[Math.floor(Math.random() * champions.length)];
    resetGame();
    const skins = await getChampionSkins(randomChamp.id);
    const randomSkin = skins[Math.floor(Math.random() * skins.length)];
    setCurrentChampion(randomChamp, randomSkin.num, randomSkin.name);
    setShowCelebration(false);
  };

  useEffect(() => {
    if (!initialized && !currentChampion && champions.length > 0) {
      setInitialized(true);
      const randomChamp = champions[Math.floor(Math.random() * champions.length)];
      getChampionSkins(randomChamp.id).then((skins) => {
        const randomSkin = skins[Math.floor(Math.random() * skins.length)];
        setCurrentChampion(randomChamp, randomSkin.num, randomSkin.name);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  const handleGuess = (champion: Champion) => {
    addGuess(champion);
  };

  useEffect(() => {
    if (isGameWon && !gaveUp) {
      const timer = setTimeout(() => setShowCelebration(true), 500);
      return () => clearTimeout(timer);
    } else if (gaveUp) {
      setShowCelebration(true);
    }
  }, [isGameWon, gaveUp]);

  const handleGiveUp = () => {
    revealAnswer();
  };

  if (!currentChampion) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-2xl text-white">Loading champions...</div>
      </div>
    );
  }

  const currentScale = ZOOM_LEVELS[zoomLevel];
  const splashUrl = getChampionSplashUrl(currentChampion.id, currentSkinNum);
  const skinLabel = currentSkinName === 'default' ? currentChampion.name : currentSkinName;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Victory / Give Up display */}
      {isGameWon && showCelebration && (
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${splashUrl})`,
              filter: 'blur(8px) brightness(0.4)',
            }}
          />
          <div className="relative z-10 p-12 text-center space-y-6">
            {!gaveUp && <div className="text-6xl mb-4">🎉</div>}
            <h2 className="text-5xl font-bold text-white drop-shadow-lg">
              {gaveUp ? 'Nice try!' : 'Congratulations!'}
            </h2>
            <div className="flex justify-center">
              <img
                src={splashUrl}
                alt={skinLabel}
                className="max-h-64 rounded-2xl border-2 border-white/30 shadow-xl"
              />
            </div>
            <p className="text-2xl text-white drop-shadow-md">
              {gaveUp ? (
                <>The champion was <span className="font-bold text-yellow-300">{currentChampion.name}</span></>
              ) : (
                <>You found <span className="font-bold text-yellow-300">{currentChampion.name}</span></>
              )}
            </p>
            {currentSkinNum !== 0 && (
              <p className="text-lg text-[#0AC8B9] drop-shadow-md">
                Skin: {skinLabel}
              </p>
            )}
            <p className="text-xl text-gray-200 drop-shadow-md">
              {currentChampion.title}
            </p>
            {!gaveUp && (
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 inline-block">
                <p className="text-3xl font-bold text-white">
                  Guessed in {guessedChampionIds.length} {guessedChampionIds.length === 1 ? 'try' : 'tries'}!
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

      {/* Splash Art Viewer */}
      {!isGameWon && (
        <>
          <div className="flex flex-col items-center gap-4">
            <div className="text-white text-lg font-semibold">
              Guess the champion from the splash art!
            </div>
            <div
              className="relative w-[340px] h-[220px] sm:w-[500px] sm:h-[300px] md:w-[600px] md:h-[350px] rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl bg-black/60"
            >
              <img
                src={splashUrl}
                alt="Mystery champion splash art"
                className="absolute w-full h-full object-cover transition-transform duration-700 ease-out"
                style={{
                  transform: `scale(${currentScale})`,
                  transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                }}
                draggable={false}
              />
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <span>Zoom: {Math.round(currentScale * 100)}%</span>
              <span className="text-white/40">|</span>
              <span>Attempts: {guessedChampionIds.length}</span>
            </div>
          </div>

          {/* Guess input */}
          <ChampionGuessInput
            champions={champions}
            onGuess={handleGuess}
            disabled={isGameWon}
            guessedChampions={guessedChampionIds}
          />

          {/* Previous guesses */}
          {guessedChampionIds.length > 0 && (
            <div className="max-w-2xl mx-auto space-y-2">
              <div className="text-white text-sm font-semibold text-center mb-3">
                Previous guesses
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {[...guessedChampionIds].reverse().map((id) => {
                  const champ = champions.find((c) => c.id === id);
                  if (!champ) return null;
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-2 bg-red-500/30 border border-red-400/50 rounded-xl px-3 py-2 field-reveal"
                    >
                      <img
                        src={getChampionImageUrl(champ.id)}
                        alt={champ.name}
                        className="w-8 h-8 rounded-lg border border-white/30"
                      />
                      <span className="text-white text-sm font-medium">{champ.name}</span>
                      <span className="text-red-400">✕</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* Action buttons */}
      {!isGameWon && guessedChampionIds.length > 0 && (
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

      {/* How to play */}
      {!isGameWon && guessedChampionIds.length === 0 && (
        <div className="bg-black/40 backdrop-blur-md border-2 border-white/20 rounded-xl p-4 text-white">
          <h3 className="text-lg font-bold mb-3 text-center">How to Play</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">🔍</div>
              <p className="font-bold text-sm">Zoomed In</p>
              <p className="text-xs opacity-75">You see a small part of a splash art (could be any skin!)</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">❌</div>
              <p className="font-bold text-sm">Wrong Guess</p>
              <p className="text-xs opacity-75">The image zooms out to reveal more</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="font-bold text-sm">Correct!</p>
              <p className="text-xs opacity-75">Fewer guesses = better score</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

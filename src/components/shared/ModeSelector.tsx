'use client';

interface Props {
  currentMode: 'champions' | 'proplayers';
  onModeChange: (mode: 'champions' | 'proplayers') => void;
}

export default function ModeSelector({ currentMode, onModeChange }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <h2 className="text-white text-2xl font-bold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }}>Choose Game Mode</h2>
      <div className="flex gap-4 flex-wrap justify-center">
        {/* Mode Champions */}
        <button
          onClick={() => onModeChange('champions')}
          className={`group relative px-8 py-6 rounded-2xl font-bold text-lg transition-all duration-500 ${
            currentMode === 'champions'
              ? 'bg-black/60 backdrop-blur-md border-3 border-blue-400 text-white shadow-2xl scale-110'
              : 'bg-black/40 backdrop-blur-md border-2 border-white/30 text-gray-200 hover:border-blue-400 shadow-lg hover:scale-105'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <div>Champions</div>
            {currentMode === 'champions' && (
              <div className="text-xs bg-white/20 px-3 py-1 rounded-full">
                Active
              </div>
            )}
          </div>
          {/* Badge nombre de champions */}
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full group/badge cursor-help">
            160+
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover/badge:block w-48 bg-black/90 text-white text-xs rounded-lg px-3 py-2 shadow-xl border border-white/20 z-50">
              Champions are up to date with Riot API!
              <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-black/90"></div>
            </div>
          </div>
        </button>

        {/* Mode Pro Players */}
        <button
          onClick={() => onModeChange('proplayers')}
          className={`group relative px-8 py-6 rounded-2xl font-bold text-lg transition-all duration-500 ${
            currentMode === 'proplayers'
              ? 'bg-black/60 backdrop-blur-md border-3 border-blue-400 text-white shadow-2xl scale-110'
              : 'bg-black/40 backdrop-blur-md border-2 border-white/30 text-gray-200 hover:border-blue-400 shadow-lg hover:scale-105'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <div>Pro Players</div>
            {currentMode === 'proplayers' && (
              <div className="text-xs bg-white/20 px-3 py-1 rounded-full">
                Active
              </div>
            )}
          </div>
          {/* Badge nombre de joueurs */}
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full group/badge cursor-help">
            20+
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover/badge:block w-56 bg-black/90 text-white text-xs rounded-lg px-3 py-2 shadow-xl border border-white/20 z-50">
              Sorry, I add them manually... More coming soon!
              <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-black/90"></div>
            </div>
          </div>
        </button>
      </div>

      {/* Description du mode actif */}
      <div className="bg-black/40 backdrop-blur-md border-2 border-white/20 rounded-xl p-6 max-w-3xl">
        <p className="text-white text-center text-2xl font-semibold">
          {currentMode === 'champions' ? (
            <>
              Guess the champion based on gender, position, species, range, region, and release year
            </>
          ) : (
            <>
              Guess the pro player based on their career, region, and achievements
            </>
          )}
        </p>
      </div>
    </div>
  );
}

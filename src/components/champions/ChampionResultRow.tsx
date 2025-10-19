import { Champion } from '@/types/champion';
import { getChampionImageUrl } from '@/utils/riotApi';

interface Props {
  guess: Champion;
  answer: Champion;
}

export default function ChampionResultRow({ guess, answer }: Props) {
  const isCorrect = guess.id === answer.id;

  // Comparer une valeur simple
  const compareValue = (guessVal: string | number | boolean, answerVal: string | number | boolean) => {
    if (guessVal === answerVal) return 'bg-green-500 text-white';
    return 'bg-red-500 text-white';
  };

  // Comparer des arrays (position, region)
  const compareArray = (guessArr: string[], answerArr: string[]) => {
    const hasMatch = guessArr.some(item => answerArr.includes(item));
    const allMatch = guessArr.length === answerArr.length &&
                     guessArr.every(item => answerArr.includes(item));

    if (allMatch) return 'bg-green-500 text-white';
    if (hasMatch) return 'bg-yellow-500 text-white'; // Orange partiel
    return 'bg-red-500 text-white';
  };

  // Comparer l'année avec flèche
  const compareYear = (guessYear: number, answerYear: number) => {
    if (guessYear === answerYear) {
      return { bg: 'bg-green-500 text-white', arrow: '=' };
    }
    if (guessYear < answerYear) {
      return { bg: 'bg-red-500 text-white', arrow: '↑' };
    }
    return { bg: 'bg-red-500 text-white', arrow: '↓' };
  };

  const yearComp = compareYear(guess.releaseYear, answer.releaseYear);

  // Si c'est la bonne réponse
  if (isCorrect) {
    return (
      <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-6 shadow-lg animate-pulse">
        <div className="flex items-center gap-4 text-white">
          <img
            src={getChampionImageUrl(guess.id)}
            alt={guess.name}
            className="w-20 h-20 rounded-xl border-4 border-white shadow-lg"
          />
          <div>
            <div className="text-3xl font-bold">{guess.name}</div>
            <div className="text-xl opacity-90">{guess.title}</div>
          </div>
          <div className="ml-auto text-5xl">🎉</div>
        </div>
      </div>
    );
  }

  // Affichage normal - 8 colonnes
  return (
    <div className="grid grid-cols-8 gap-2 p-2">
      {/* 1. Champion */}
      <div className="bg-gray-700 text-white p-3 rounded-lg flex flex-col items-center justify-center field-reveal field-delay-1">
        <img
          src={getChampionImageUrl(guess.id)}
          alt={guess.name}
          className="w-16 h-16 rounded-lg mb-2"
        />
        <div className="text-sm font-bold text-center">{guess.name}</div>
      </div>

      {/* 2. Gender */}
      <div className={`${compareValue(guess.gender, answer.gender)} p-3 rounded-lg flex flex-col items-center justify-center field-reveal field-delay-2`}>
        <div className="text-xs opacity-75 mb-1">Gender</div>
        <div className="text-xs font-bold">{guess.gender}</div>
      </div>

      {/* 3. Position */}
      <div className={`${compareArray(guess.position, answer.position)} p-3 rounded-lg flex flex-col items-center justify-center field-reveal field-delay-3`}>
        <div className="text-xs opacity-75 mb-1">Position</div>
        <div className="text-xs font-bold text-center">
          {guess.position.join(', ')}
        </div>
      </div>

      {/* 4. Species */}
      <div className={`${compareValue(guess.species, answer.species)} p-3 rounded-lg flex flex-col items-center justify-center field-reveal field-delay-4`}>
        <div className="text-xs opacity-75 mb-1">Species</div>
        <div className="text-xs font-bold text-center">{guess.species}</div>
      </div>

      {/* 5. Resource */}
      <div className={`${compareValue(guess.resource, answer.resource)} p-3 rounded-lg flex flex-col items-center justify-center field-reveal field-delay-5`}>
        <div className="text-xs opacity-75 mb-1">Resource</div>
        <div className="text-sm font-bold text-center">{guess.resource}</div>
      </div>

      {/* 6. Range */}
      <div className={`${compareValue(guess.range, answer.range)} p-3 rounded-lg flex flex-col items-center justify-center field-reveal field-delay-6`}>
        <div className="text-xs opacity-75 mb-1">Range</div>
        <div className="text-2xl">
          {guess.range === 'Ranged' ? '🏹' : '⚔️'}
        </div>
        <div className="text-xs font-bold">{guess.range}</div>
      </div>

      {/* 7. Region */}
      <div className={`${compareArray(guess.region, answer.region)} p-3 rounded-lg flex flex-col items-center justify-center field-reveal field-delay-7`}>
        <div className="text-xs opacity-75 mb-1">Region</div>
        <div className="text-xs font-bold text-center">
          {guess.region.join(', ')}
        </div>
      </div>

      {/* 8. Year */}
      <div className={`${yearComp.bg} p-3 rounded-lg flex flex-col items-center justify-center field-reveal field-delay-8`}>
        <div className="text-xs opacity-75 mb-1">Year</div>
        <div className="text-xl font-bold">{guess.releaseYear}</div>
        <div className="text-xl">{yearComp.arrow}</div>
      </div>
    </div>
  );
}

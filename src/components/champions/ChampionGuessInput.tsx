'use client';

import { useState, useEffect, useRef } from 'react';
import { Champion } from '@/types/champion';
import { getChampionImageUrl } from '@/utils/riotApi';

interface Props {
  champions: Champion[];
  onGuess: (champion: Champion) => void;
  disabled: boolean;
  guessedChampions: string[]; // IDs des champions déjà essayés
}

export default function ChampionGuessInput({
  champions,
  onGuess,
  disabled,
  guessedChampions
}: Props) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Champion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtrer les suggestions quand l'utilisateur tape
  useEffect(() => {
    if (input.length > 0) {
      const searchLower = input.toLowerCase();
      const filtered = champions.filter((champ) => {
        // Exclure les champions déjà devinés
        if (guessedChampions.includes(champ.id)) return false;

        // Rechercher dans plusieurs champs
        return (
          champ.name.toLowerCase().includes(searchLower) ||
          champ.title.toLowerCase().includes(searchLower) ||
          champ.gender.toLowerCase().includes(searchLower) ||
          champ.species.toLowerCase().includes(searchLower) ||
          champ.resource.toLowerCase().includes(searchLower) ||
          champ.range.toLowerCase().includes(searchLower) ||
          champ.position.some(p => p.toLowerCase().includes(searchLower)) ||
          champ.region.some(r => r.toLowerCase().includes(searchLower)) ||
          champ.tags.some(t => t.toLowerCase().includes(searchLower))
        );
      });
      setSuggestions(filtered.slice(0, 8)); // Max 8 suggestions
      setSelectedIndex(0);
    } else {
      setSuggestions([]);
    }
  }, [input, champions, guessedChampions]);

  // Sélectionner un champion
  const handleSelect = (champion: Champion) => {
    onGuess(champion);
    setInput('');
    setSuggestions([]);
    setSelectedIndex(0);
  };

  // Navigation clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        (prev - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions[selectedIndex]) {
        handleSelect(suggestions[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Type a champion name, position, or region to filter..."
          className="w-full px-6 py-4 text-lg bg-black/40 backdrop-blur-md border-2 border-white/20 rounded-2xl focus:border-white/40 focus:outline-none disabled:bg-gray-100 disabled:border-gray-300 transition-colors shadow-lg text-white placeholder-gray-400"
          autoComplete="off"
        />
        {input && !disabled && (
          <button
            onClick={() => setInput('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        )}
      </div>

      {/* Liste des suggestions */}
      {suggestions.length > 0 && !disabled && (
        <div className="absolute z-50 w-full mt-2 bg-black/90 backdrop-blur-md border-2 border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          {suggestions.map((champ, index) => (
            <button
              key={champ.id}
              onClick={() => handleSelect(champ)}
              className={`w-full px-6 py-3 text-left flex items-center gap-4 transition-colors ${
                index === selectedIndex
                  ? 'bg-white/20 text-white'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <img
                src={getChampionImageUrl(champ.id)}
                alt={champ.name}
                className="w-12 h-12 rounded-lg border-2 border-gray-300"
              />
              <div>
                <div className="font-bold text-lg">{champ.name}</div>
                <div className={`text-sm ${
                  index === selectedIndex ? 'text-gray-200' : 'text-gray-400'
                }`}>
                  {champ.title}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
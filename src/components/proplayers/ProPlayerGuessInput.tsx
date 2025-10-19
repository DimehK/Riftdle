'use client';

import { useState, useRef, useEffect } from 'react';
import { ProPlayer } from '@/types/proPlayer';

interface Props {
  proPlayers: ProPlayer[];
  onGuess: (player: ProPlayer) => void;
  disabled: boolean;
  guessedPlayers: string[];
}

export default function ProPlayerGuessInput({ proPlayers, onGuess, disabled, guessedPlayers }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState<ProPlayer[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtrer les joueurs selon le terme de recherche
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPlayers([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = proPlayers.filter(player => {
      // Exclure les joueurs déjà devinés
      if (guessedPlayers.includes(player.id)) return false;

      const searchLower = searchTerm.toLowerCase();
      return (
        player.ign.toLowerCase().includes(searchLower) ||
        player.realName.toLowerCase().includes(searchLower) ||
        player.region.toLowerCase().includes(searchLower) ||
        player.league.toLowerCase().includes(searchLower) ||
        player.role.toLowerCase().includes(searchLower) ||
        (player.team && player.team.toLowerCase().includes(searchLower)) ||
        player.favoriteChampion.toLowerCase().includes(searchLower)
      );
    }).slice(0, 8); // Max 8 suggestions

    setFilteredPlayers(filtered);
    setShowSuggestions(filtered.length > 0);
    setSelectedIndex(0);
  }, [searchTerm, proPlayers, guessedPlayers]);

  // Gérer la sélection d'un joueur
  const handleSelectPlayer = (player: ProPlayer) => {
    onGuess(player);
    setSearchTerm('');
    setFilteredPlayers([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Navigation au clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredPlayers.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredPlayers[selectedIndex]) {
          handleSelectPlayer(filteredPlayers[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Type a player name, role, or region to filter..."
          className="w-full px-6 py-4 text-lg rounded-2xl bg-black/40 backdrop-blur-md text-white placeholder-gray-400 border-2 border-white/20 focus:border-white/40 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
          ⭐
        </div>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && filteredPlayers.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-black/90 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-white/20 overflow-hidden">
          {filteredPlayers.map((player, index) => (
            <button
              key={player.id}
              onClick={() => handleSelectPlayer(player)}
              className={`w-full px-6 py-4 flex items-center gap-4 transition-all ${
                index === selectedIndex
                  ? 'bg-white/20 text-white'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <div className="flex-1 text-left">
                <div className="font-bold text-lg">{player.ign}</div>
                <div className="text-sm opacity-75">
                  {player.realName} • {player.role} • {player.team || player.league}
                </div>
              </div>
              <div className="text-xs bg-white/10 px-3 py-1 rounded-full">
                {player.region}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Info si aucun résultat */}
      {searchTerm.trim() !== '' && filteredPlayers.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-black/90 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-white/20 p-6 text-center text-white">
          <div className="text-4xl mb-2">🤔</div>
          <p className="font-bold">No player found</p>
          <p className="text-sm opacity-75 mt-1">
            {guessedPlayers.length > 0
              ? 'This player might have already been guessed'
              : 'Try a different name or IGN'}
          </p>
        </div>
      )}
    </div>
  );
}

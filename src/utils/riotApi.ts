import { Champion } from '@/types/champion';
import { championReleaseYears } from '@/data/championReleaseYears';
import { championMetadata } from '@/data/championMetadata';

const DDRAGON_VERSION = '15.20.1';
const BASE_URL = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}`;

/**
 * Récupère tous les champions depuis l'API Riot
 */
export async function getAllChampions(): Promise<Champion[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/data/en_US/champion.json`,
      {
        next: { revalidate: 86400 } // Cache 24h
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch champions');
    }

    const data = await response.json();
    const champions = Object.values(data.data) as Champion[];

    // Ajouter les métadonnées personnalisées
    return champions.map(champ => {
      const metadata = championMetadata[champ.name] || championMetadata[champ.id];
      return {
        ...champ,
        releaseYear: (championReleaseYears[champ.name] || championReleaseYears[champ.id]) as number,
        gender: (metadata?.gender || 'Other') as 'Male' | 'Female' | 'Other',
        position: metadata?.position || [],
        species: metadata?.species?.[0] || 'Unknown', // Prendre la première espèce
        resource: champ.partype,
        range: (metadata?.rangeType || 'Melee') as 'Melee' | 'Ranged',
        region: metadata?.region || [],
      };
    });
  } catch (error) {
    console.error('Error fetching champions:', error);
    return [];
  }
}

/**
 * Récupère les détails d'un champion spécifique
 */
export async function getChampionDetails(championId: string): Promise<Champion | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/data/en_US/champion/${championId}.json`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch champion: ${championId}`);
    }

    const data = await response.json();
    return data.data[championId] as Champion;
  } catch (error) {
    console.error(`Error fetching champion ${championId}:`, error);
    return null;
  }
}

/**
 * Retourne l'URL de l'image d'un champion
 */
export function getChampionImageUrl(championId: string): string {
  return `${BASE_URL}/img/champion/${championId}.png`;
}

/**
 * Retourne l'URL du splash art d'un champion
 */
export function getChampionSplashUrl(championId: string): string {
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg`;
}
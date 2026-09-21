import {
  DUPLAS_RANKING,
  INDIVIDUAL_SIMULADO_RANKING,
  RankingDuplaItem,
  RankingIndividualItem,
} from '../data/rankingsData';
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const STORAGE_KEY_DUPLAS = 'tjam_rankings_duplas';
const STORAGE_KEY_INDIVIDUAL = 'tjam_rankings_individual';

export class RankingsService {
  /**
   * Retrieves the current Duplas ranking from localStorage, falling back to default.
   */
  static getDuplasRanking(): RankingDuplaItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DUPLAS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Error loading duplas ranking from localStorage:', err);
    }
    return [...DUPLAS_RANKING];
  }

  /**
   * Retrieves the current Individual ranking from localStorage, falling back to default.
   */
  static getIndividualRanking(): RankingIndividualItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_INDIVIDUAL);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Error loading individual ranking from localStorage:', err);
    }
    return [...INDIVIDUAL_SIMULADO_RANKING];
  }

  /**
   * Saves the Duplas ranking to localStorage and synchronizes with Firestore.
   */
  static async saveDuplasRanking(items: RankingDuplaItem[]): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEY_DUPLAS, JSON.stringify(items));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('tjam_rankings_updated'));

      // Try sync with Firestore in the background
      try {
        const docRef = doc(db, 'system_rankings', 'duplas');
        await setDoc(docRef, { items, updatedAt: new Date().toISOString() });
      } catch (firestoreErr) {
        console.warn('Firestore duplas ranking sync note:', firestoreErr);
      }
    } catch (err) {
      console.error('Error saving duplas ranking:', err);
    }
  }

  /**
   * Saves the Individual ranking to localStorage and synchronizes with Firestore.
   */
  static async saveIndividualRanking(items: RankingIndividualItem[]): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEY_INDIVIDUAL, JSON.stringify(items));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('tjam_rankings_updated'));

      // Try sync with Firestore in the background
      try {
        const docRef = doc(db, 'system_rankings', 'individual');
        await setDoc(docRef, { items, updatedAt: new Date().toISOString() });
      } catch (firestoreErr) {
        console.warn('Firestore individual ranking sync note:', firestoreErr);
      }
    } catch (err) {
      console.error('Error saving individual ranking:', err);
    }
  }

  /**
   * Updates a single Dupla ranking row by index.
   */
  static async updateDuplaItem(index: number, updates: Partial<RankingDuplaItem>): Promise<RankingDuplaItem[]> {
    const list = this.getDuplasRanking();
    if (index >= 0 && index < list.length) {
      list[index] = { ...list[index], ...updates };
      await this.saveDuplasRanking(list);
    }
    return list;
  }

  /**
   * Updates a single Individual ranking row by index.
   */
  static async updateIndividualItem(index: number, updates: Partial<RankingIndividualItem>): Promise<RankingIndividualItem[]> {
    const list = this.getIndividualRanking();
    if (index >= 0 && index < list.length) {
      list[index] = { ...list[index], ...updates };
      await this.saveIndividualRanking(list);
    }
    return list;
  }

  /**
   * Adds a new Dupla to the ranking list.
   */
  static async addDuplaItem(item: RankingDuplaItem): Promise<RankingDuplaItem[]> {
    const list = this.getDuplasRanking();
    list.push(item);
    await this.saveDuplasRanking(list);
    return list;
  }

  /**
   * Adds a new Individual to the ranking list.
   */
  static async addIndividualItem(item: RankingIndividualItem): Promise<RankingIndividualItem[]> {
    const list = this.getIndividualRanking();
    list.push(item);
    await this.saveIndividualRanking(list);
    return list;
  }

  /**
   * Deletes a Dupla item by index.
   */
  static async deleteDuplaItem(index: number): Promise<RankingDuplaItem[]> {
    const list = this.getDuplasRanking();
    if (index >= 0 && index < list.length) {
      list.splice(index, 1);
      await this.saveDuplasRanking(list);
    }
    return list;
  }

  /**
   * Deletes an Individual item by index.
   */
  static async deleteIndividualItem(index: number): Promise<RankingIndividualItem[]> {
    const list = this.getIndividualRanking();
    if (index >= 0 && index < list.length) {
      list.splice(index, 1);
      await this.saveIndividualRanking(list);
    }
    return list;
  }

  /**
   * Resets both rankings back to default initial values.
   */
  static async resetToDefaults(): Promise<{ duplas: RankingDuplaItem[]; individual: RankingIndividualItem[] }> {
    await this.saveDuplasRanking([...DUPLAS_RANKING]);
    await this.saveIndividualRanking([...INDIVIDUAL_SIMULADO_RANKING]);
    return {
      duplas: [...DUPLAS_RANKING],
      individual: [...INDIVIDUAL_SIMULADO_RANKING],
    };
  }

  /**
   * Loads initial remote data from Firestore if available.
   */
  static async syncFromFirestore(): Promise<void> {
    try {
      const duplasSnap = await getDoc(doc(db, 'system_rankings', 'duplas'));
      if (duplasSnap.exists() && Array.isArray(duplasSnap.data()?.items)) {
        localStorage.setItem(STORAGE_KEY_DUPLAS, JSON.stringify(duplasSnap.data().items));
      }
      const indSnap = await getDoc(doc(db, 'system_rankings', 'individual'));
      if (indSnap.exists() && Array.isArray(indSnap.data()?.items)) {
        localStorage.setItem(STORAGE_KEY_INDIVIDUAL, JSON.stringify(indSnap.data().items));
      }
      window.dispatchEvent(new Event('storage'));
    } catch {
      // offline or not configured yet
    }
  }
}

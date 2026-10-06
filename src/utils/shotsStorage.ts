import { SwavyShot } from '../types';

const DB_NAME = 'swavy_shots_db';
const STORE_NAME = 'user_shots';
const DB_VERSION = 1;

function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function loadCustomShots(): Promise<SwavyShot[]> {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const results = request.result as SwavyShot[];
        resolve(results || []);
      };

      request.onerror = () => {
        resolve([]);
      };
    });
  } catch (err) {
    console.warn('Failed to load from IndexedDB, trying localStorage', err);
    try {
      const saved = localStorage.getItem('swavy_custom_shots');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  }
}

export async function saveCustomShots(shots: SwavyShot[]): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      // Clear existing records before adding new batch
      const clearReq = store.clear();
      
      clearReq.onsuccess = () => {
        shots.forEach((shot) => {
          store.put(shot);
        });
      };

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = () => {
        reject(transaction.error);
      };
    });
  } catch (err) {
    console.warn('Failed to save to IndexedDB, fallback to localStorage', err);
    try {
      localStorage.setItem('swavy_custom_shots', JSON.stringify(shots));
    } catch {}
  }
}

export async function clearCustomShots(): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    try {
      localStorage.removeItem('swavy_custom_shots');
    } catch {}
  }
}

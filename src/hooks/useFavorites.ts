import { useState, useEffect, useCallback } from 'react';
import { Exercise } from '../types/exercise';

const FAVORITES_KEY = 'fitness-app-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Exercise[]>([]);

  // Load favorites from localStorage on mount and listen for changes
  useEffect(() => {
    const loadFavorites = () => {
      const savedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites));
        } catch (error) {
          // Hata durumunda boş array kullan
          setFavorites([]);
        }
      }
    };

    loadFavorites();

    // Listen for storage changes (cross-tab synchronization)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === FAVORITES_KEY) {
        loadFavorites();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Custom event for same-tab updates
    const handleCustomStorageChange = () => {
      loadFavorites();
    };

    window.addEventListener('favoritesUpdated', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleCustomStorageChange);
    };
  }, []);

  const addToFavorites = useCallback((exercise: Exercise) => {
    setFavorites(currentFavorites => {
      // Check if already exists to prevent duplicates
      if (!currentFavorites.some(fav => fav.id === exercise.id)) {
        const updatedFavorites = [...currentFavorites, exercise];
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
        return updatedFavorites;
      }
      return currentFavorites;
    });
  }, []);

  const removeFromFavorites = useCallback((exerciseId: string) => {
    setFavorites(currentFavorites => {
      const updatedFavorites = currentFavorites.filter(fav => fav.id !== exerciseId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  }, []);

  const isFavorite = useCallback((exerciseId: string) => {
    // localStorage'dan direkt okuyarak güncel durumu al
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (savedFavorites) {
      try {
        const currentFavorites = JSON.parse(savedFavorites);
        return currentFavorites.some((fav: Exercise) => fav.id === exerciseId);
      } catch (error) {
        return false;
      }
    }
    return false;
  }, []);

  const toggleFavorite = useCallback((exercise: Exercise) => {
    // localStorage'dan güncel favorileri al
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    let currentFavorites: Exercise[] = [];
    
    if (savedFavorites) {
      try {
        currentFavorites = JSON.parse(savedFavorites);
      } catch (error) {
        currentFavorites = [];
      }
    }
    
    const isCurrentlyFavorite = currentFavorites.some(fav => fav.id === exercise.id);
    let updatedFavorites: Exercise[];
    
    if (isCurrentlyFavorite) {
      updatedFavorites = currentFavorites.filter(fav => fav.id !== exercise.id);
    } else {
      updatedFavorites = [...currentFavorites, exercise];
    }
    
    // localStorage'a kaydet
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    
    // State'i güncelle
    setFavorites(updatedFavorites);
    
    // Custom event tetikle
    window.dispatchEvent(new Event('favoritesUpdated'));
  }, []);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  };
};
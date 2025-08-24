import React from 'react';
import { Dumbbell, Heart } from 'lucide-react';

interface HeaderProps {
  showFavorites: boolean;
  onToggleView: () => void;
  onGoHome: () => void;
  favoritesCount: number;
}

const Header: React.FC<HeaderProps> = ({ showFavorites, onToggleView, onGoHome, favoritesCount }) => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <button
            onClick={onGoHome}
            className="flex items-center gap-3 focus:outline-none"
          >
            <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
              <Dumbbell className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">FitnessPro</h1>
              <p className="text-purple-200 mt-1 text-sm sm:text-base hidden sm:block">Egzersiz Kütüphanesi</p>
            </div>
          </button>
          
          {showFavorites ? (
            // Favori sayfasındayken sadece favori sayısını göster
            <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-pink-600 to-purple-600 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-xl shadow-lg text-sm sm:text-base">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-pink-300 text-pink-300" />
              <span className="font-medium hidden sm:inline">
                Favoriler ({favoritesCount})
              </span>
              <span className="font-medium sm:hidden">
                ♥ {favoritesCount}
              </span>
            </div>
          ) : (
            // Ana sayfadayken favori butonunu göster
            <button
              onClick={onToggleView}
              className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-lg text-sm sm:text-base"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium hidden sm:inline">
                Favoriler ({favoritesCount})
              </span>
              <span className="font-medium sm:hidden">
                ♥ {favoritesCount}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { Exercise } from '../types/exercise';
import ExerciseCard from './ExerciseCard';
import { useFavorites } from '../hooks/useFavorites';
import { Search, AlertCircle } from 'lucide-react';

interface ExerciseGridProps {
  exercises: Exercise[];
  isLoading?: boolean;
  error?: string | null;
  isSearchResult?: boolean;
  searchQuery?: string;
  onExerciseClick?: (exercise: Exercise) => void;
}

const ExerciseGrid: React.FC<ExerciseGridProps> = ({
  exercises,
  isLoading = false,
  error,
  isSearchResult = false,
  searchQuery = '',
  onExerciseClick,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-slate-100">
            <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse" />
            <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
              <div className="h-5 sm:h-6 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 sm:h-4 bg-slate-200 rounded animate-pulse w-3/4" />
              <div className="h-3 sm:h-4 bg-slate-200 rounded animate-pulse w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 sm:py-16 px-4">
        <div className="bg-red-50 border border-red-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-md mx-auto shadow-lg">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-red-800 mb-2">Hata Oluştu</h3>
          <p className="text-sm sm:text-base text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (exercises.length === 0) {
    if (isSearchResult) {
      return (
        <div className="text-center py-8 sm:py-16 px-4">
          <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-md mx-auto shadow-lg">
            <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">
              "{searchQuery}" için sonuç bulunamadı
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mb-4">
              Arama kriterlerinize uygun egzersiz bulunamadı. Lütfen farklı terimler deneyin.
            </p>
            <div className="text-xs text-slate-500">
              <p>• Farklı kelimeler deneyin</p>
              <p>• Daha kısa terimler kullanın</p>
              <p>• Kas grubu filtrelerini kullanın</p>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="text-center py-8 sm:py-16 px-4">
        <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-md mx-auto shadow-lg">
          <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">Egzersiz Bulunamadı</h3>
          <p className="text-sm sm:text-base text-slate-600">
            Seçilen kriterlere uygun egzersiz bulunamadı. Lütfen farklı filtreler deneyin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          isFavorite={isFavorite(exercise.id)}
          onToggleFavorite={() => toggleFavorite(exercise)}
          onClick={() => onExerciseClick?.(exercise)}
        />
      ))}
    </div>
  );
};

export default ExerciseGrid;
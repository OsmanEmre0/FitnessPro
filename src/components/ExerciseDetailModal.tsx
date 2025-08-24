import React from 'react';
import { X, Target, Dumbbell, Heart } from 'lucide-react';
import { Exercise } from '../types/exercise';
import { useFavorites } from '../hooks/useFavorites';

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
}

const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  isOpen,
  onClose,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!isOpen || !exercise) {
    return null;
  }

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-1 sm:p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[calc(100vw-16px)] sm:max-w-lg md:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto scrollbar-hide smooth-scroll">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 sm:py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Egzersiz Detayları</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                     {/* Image */}
           <div className="aspect-[3/2] bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
            {(exercise.imageUrl || exercise.gifUrl) ? (
              <img
                src={exercise.imageUrl || exercise.gifUrl}
                alt={exercise.name}
                className="w-full h-full object-contain bg-white"
                loading="lazy"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400">
                <Dumbbell className="w-16 h-16 mb-2" />
                <p className="text-sm">Resim bulunamadı</p>
              </div>
            )}
          </div>

          {/* Exercise Info */}
          <div className="space-y-4">
            {/* Name */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {capitalizeFirst(exercise.name)}
              </h3>
            </div>

            {/* Target Muscle */}
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Target className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-purple-800">Hedef Kas</p>
                <p className="text-slate-700">{capitalizeFirst(exercise.target)}</p>
              </div>
            </div>

            {/* Equipment */}
            <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
              <Dumbbell className="w-5 h-5 text-pink-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-pink-800">Ekipman</p>
                <p className="text-slate-700">{capitalizeFirst(exercise.equipment)}</p>
              </div>
            </div>

            {/* Description */}
            {exercise.description && (
              <div className="p-4 bg-slate-50 rounded-lg">
                <h4 className="text-lg font-semibold text-slate-900 mb-2">Açıklama</h4>
                <p className="text-slate-700 leading-relaxed">{exercise.description}</p>
              </div>
            )}

            {/* Instructions */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">Yapılış Talimatları</h4>
              <ol className="space-y-2">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-sm font-medium rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <p className="text-slate-700 leading-relaxed">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Body Part */}
            <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
              <p className="text-sm font-medium text-slate-800 mb-1">Kas Grubu</p>
              <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                {capitalizeFirst(exercise.bodyPart)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-4 sm:px-6 py-3 sm:py-4 rounded-b-2xl">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => toggleFavorite(exercise)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                isFavorite(exercise.id)
                  ? 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite(exercise.id) ? 'fill-pink-500 text-pink-500' : ''
                }`}
              />
              <span className="font-medium hidden sm:inline">
                {isFavorite(exercise.id) ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
              </span>
              <span className="font-medium sm:hidden">
                {isFavorite(exercise.id) ? 'Çıkar' : 'Ekle'}
              </span>
            </button>
            
            <button
              onClick={onClose}
              className="px-3 sm:px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200 text-xs sm:text-sm font-medium"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailModal;

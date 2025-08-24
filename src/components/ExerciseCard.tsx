import React, { useState, useEffect } from 'react';
import { Heart, Target, Dumbbell } from 'lucide-react';
import { Exercise } from '../types/exercise';

interface ExerciseCardProps {
  exercise: Exercise;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  isFavorite,
  onToggleFavorite,
  onClick,
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Şimdilik blob URL'leri temizlemiyoruz - sadece çalıştığından emin olalım
  // useEffect(() => {
  //   return () => {
  //     if (exercise.imageUrl && exercise.imageUrl.startsWith('blob:')) {
  //       URL.revokeObjectURL(exercise.imageUrl);
  //     }
  //   };
  // }, [exercise.imageUrl]);

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  // Resim URL'ini kontrol et ve düzelt
  const getValidImageUrl = (exercise: Exercise) => {
    // Önce imageUrl'i kontrol et (/image endpoint'inden gelen)
    if (exercise.imageUrl && exercise.imageUrl.trim()) {
      return exercise.imageUrl;
    }
    
    // Eğer imageUrl yoksa gifUrl'i kullan (fallback)
    if (exercise.gifUrl && exercise.gifUrl.trim()) {
      return exercise.gifUrl;
    }
    
    return null;
  };

  const validImageUrl = getValidImageUrl(exercise);

  return (
    <div 
      className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group lg:hover:scale-105 border border-slate-100 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center relative overflow-hidden">
          {imageLoading && !imageError && validImageUrl && (
            <div className="animate-pulse bg-gradient-to-br from-slate-200 to-slate-300 w-full h-full flex items-center justify-center">
              <Dumbbell className="w-8 h-8 sm:w-12 sm:h-12 text-slate-400" />
            </div>
          )}
          {!imageError && validImageUrl ? (
            <img
              src={validImageUrl}
              alt={exercise.name}
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`w-full h-full object-contain bg-white transition-opacity duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 p-8">
              <Dumbbell className="w-12 h-12 sm:w-16 sm:h-16 mb-2" />
              <p className="text-xs sm:text-sm text-center">
                {validImageUrl ? 'Resim yüklenemedi' : 'Resim bulunamadı'}
              </p>
            </div>
          )}
          
          {/* Loading overlay */}
          {imageLoading && !imageError && validImageUrl && (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-purple-600 mb-2"></div>
                <p className="text-xs text-slate-500">Resim yükleniyor...</p>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-full transition-all duration-300 lg:hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-lg"
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
              isFavorite
                ? 'fill-pink-500 text-pink-500'
                : 'text-slate-600 hover:text-pink-500'
            }`}
          />
        </button>
      </div>
      
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
          {capitalizeFirst(exercise.name)}
        </h3>
        
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2">
            <Target className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-slate-600">
              <span className="font-medium">Hedef Kas:</span> {capitalizeFirst(exercise.target)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Dumbbell className="w-3 h-3 sm:w-4 sm:h-4 text-pink-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-slate-600">
              <span className="font-medium">Ekipman:</span> {capitalizeFirst(exercise.equipment)}
            </span>
          </div>
          
          <div className="pt-1 sm:pt-2 border-t border-slate-100">
            <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs font-medium px-2 sm:px-3 py-1 rounded-full">
              {capitalizeFirst(exercise.bodyPart)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
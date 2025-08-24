import React, { useState } from 'react';
import ExerciseDetailModal from './components/ExerciseDetailModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import BodyPartFilter from './components/BodyPartFilter';
import ExerciseGrid from './components/ExerciseGrid';
import LoadingSpinner from './components/LoadingSpinner';
import {
  useExercises,
  useExercisesByBodyPart,
  useBodyParts,
  useSearchExercises,
} from './hooks/useExercises';
import { useFavorites } from './hooks/useFavorites';
import { SearchFormValues, Exercise } from './types/exercise';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent: React.FC = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const { favorites } = useFavorites();
  
  // API Hooks
  const { data: allExercises, isLoading: allExercisesLoading, error: allExercisesError } = useExercises();
  const { data: bodyPartExercises, isLoading: bodyPartLoading, error: bodyPartError } = useExercisesByBodyPart(selectedBodyPart);
  const { data: bodyParts, isLoading: bodyPartsLoading } = useBodyParts();
  const { data: searchResults, isLoading: searchLoading, error: searchError } = useSearchExercises(searchQuery);

  // Determine which exercises to show
  const getDisplayExercises = () => {
    if (showFavorites) {
      return favorites;
    }
    
    if (searchQuery.length > 2) {
      return searchResults || [];
    }
    
    if (selectedBodyPart === 'all') {
      return allExercises || [];
    }
    
    return bodyPartExercises || [];
  };

  // Determine loading state
  const isLoading = () => {
    if (showFavorites) return false;
    if (searchQuery.length > 2) return searchLoading;
    if (selectedBodyPart === 'all') return allExercisesLoading;
    return bodyPartLoading;
  };

  // Determine error state
  const getError = () => {
    if (showFavorites) return null;
    if (searchQuery.length > 2) return searchError?.message || null;
    if (selectedBodyPart === 'all') return allExercisesError?.message || null;
    return bodyPartError?.message || null;
  };

  // API anahtarı kontrolü
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  if (!apiKey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto shadow-lg text-center">
          <h2 className="text-xl font-bold text-red-800 mb-4">API Anahtarı Gerekli</h2>
          <p className="text-red-600 mb-4">
            ExerciseDB API'sini kullanmak için RapidAPI anahtarınızı .env dosyasına eklemeniz gerekiyor.
          </p>
          <p className="text-sm text-red-500">
            VITE_RAPIDAPI_KEY=your_api_key_here
          </p>
        </div>
      </div>
    );
  }

  const handleSearch = (values: SearchFormValues) => {
    setSearchQuery(values.query.toLowerCase());
    setShowFavorites(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleBodyPartChange = (bodyPart: string) => {
    setSelectedBodyPart(bodyPart);
    setSearchQuery('');
    setShowFavorites(false);
  };

  const handleToggleView = () => {
    setShowFavorites(!showFavorites);
    if (!showFavorites) {
      setSearchQuery('');
      setSelectedBodyPart('all');
    }
  };

  const handleGoHome = () => {
    setShowFavorites(false);
    setSearchQuery('');
    setSelectedBodyPart('all');
  };

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExercise(null);
  };



  const displayExercises = getDisplayExercises();
  const loading = isLoading();
  const error = getError();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 overflow-x-hidden">
      <Header
        showFavorites={showFavorites}
        onToggleView={handleToggleView}
        onGoHome={handleGoHome}
        favoritesCount={favorites.length}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        {!showFavorites && (
          <>
            {/* Search Section */}
            <div className="mb-8 sm:mb-12">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  Egzersiz Ara
                </h2>
                <p className="text-sm sm:text-base text-slate-600 px-4">
                  İstediğiniz egzersizi adıyla arayın
                </p>
              </div>
              <SearchForm 
                onSubmit={handleSearch} 
                isLoading={searchLoading}
                onClear={handleClearSearch}
                currentQuery={searchQuery}
              />
            </div>

            {/* Body Part Filter */}
            {searchQuery.length <= 2 && (
              <div className="mb-8 sm:mb-12 -mx-4 sm:mx-0">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                    Kas Grubuna Göre Filtrele
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 px-4">
                    İlgilendiğiniz kas grubunu seçin
                  </p>
                </div>
                <div className="px-4 sm:px-0">
                  <BodyPartFilter
                    bodyParts={bodyParts || []}
                    selectedBodyPart={selectedBodyPart}
                    onBodyPartChange={handleBodyPartChange}
                    isLoading={bodyPartsLoading}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {/* Results Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6 px-2 sm:px-0">
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
              {showFavorites 
                ? 'Favori Egzersizlerim'
                : searchQuery.length > 2
                ? `"${searchQuery}" için sonuçlar`
                : selectedBodyPart === 'all'
                ? 'Tüm Egzersizler'
                : `${selectedBodyPart.charAt(0).toUpperCase() + selectedBodyPart.slice(1)} Egzersizleri`
              }
            </h2>
            {!loading && displayExercises.length > 0 && (
              <span className="text-xs sm:text-sm text-slate-500 font-medium">
                {displayExercises.length} egzersiz
              </span>
            )}
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <ExerciseGrid
              exercises={displayExercises}
              isLoading={loading}
              error={error}
              isSearchResult={searchQuery.length > 2}
              searchQuery={searchQuery}
              onExerciseClick={handleExerciseClick}
            />
          )}
        </div>
      </main>

      {/* Exercise Detail Modal */}
      <ExerciseDetailModal
        exercise={selectedExercise}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};

export default App;
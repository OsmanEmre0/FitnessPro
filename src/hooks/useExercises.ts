import { useQuery } from '@tanstack/react-query';
import { exerciseApi } from '../services/api';
import { Exercise } from '../types/exercise';

// Egzersizlere resim URL'lerini ekleyen yardımcı fonksiyon
const addImagesToExercises = async (exercises: Exercise[]): Promise<Exercise[]> => {
  const exercisesWithImages = await Promise.all(
    exercises.map(async (exercise) => {
      try {
        const imageUrl = await exerciseApi.getExerciseImage(exercise.id);
        
        return {
          ...exercise,
          imageUrl: imageUrl || exercise.gifUrl // Eğer imageUrl yoksa gifUrl'e fallback
        };
      } catch (error) {
        // Hata durumunda gifUrl'e fallback
        return {
          ...exercise,
          imageUrl: exercise.gifUrl
        };
      }
    })
  );
  
  return exercisesWithImages;
};

export const useExercises = () => {
  return useQuery<Exercise[]>({
    queryKey: ['exercises'],
    queryFn: async () => {
      const exercises = await exerciseApi.getAllExercises(1000, 0);
      return addImagesToExercises(exercises);
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useExercisesByBodyPart = (bodyPart: string) => {
  return useQuery<Exercise[]>({
    queryKey: ['exercises', 'bodyPart', bodyPart],
    queryFn: async () => {
      const exercises = await exerciseApi.getExercisesByBodyPart(bodyPart, 1000);
      return addImagesToExercises(exercises);
    },
    enabled: !!bodyPart && bodyPart !== 'all',
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
  });
};

export const useBodyParts = () => {
  return useQuery<string[]>({
    queryKey: ['bodyParts'],
    queryFn: exerciseApi.getBodyPartsList,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 120, // 2 hours
  });
};

export const useSearchExercises = (query: string) => {
  return useQuery<Exercise[]>({
    queryKey: ['exercises', 'search', query],
    queryFn: async () => {
      const exercises = await exerciseApi.searchExercises(query, 50);
      return addImagesToExercises(exercises);
    },
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 20,
  });
};
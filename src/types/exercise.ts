export interface Exercise {
  id: string;
  name: string;
  target: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  imageUrl?: string; // /image endpoint'inden gelen resim URL'i
  description?: string;
  instructions: string[];
  secondaryMuscles: string[];
}

export interface ExerciseFilters {
  bodyPart: string;
  searchQuery: string;
}

export interface SearchFormValues {
  query: string;
}
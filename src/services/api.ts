import axios from 'axios';
import { Exercise } from '../types/exercise';

const API_BASE_URL = 'https://exercisedb.p.rapidapi.com';
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-rapidapi-key': API_KEY || '',
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
  },
  timeout: 15000,
});

export const exerciseApi = {
  getAllExercises: async (limit: number = 100, offset: number = 0): Promise<Exercise[]> => {
    try {
      const response = await api.get(`/exercises`, {
        params: { limit, offset }
      });
      
      return response.data;
    } catch (error) {
      throw new Error('Egzersizler yüklenirken hata oluştu');
    }
  },

  getExercisesByBodyPart: async (bodyPart: string, limit: number = 100): Promise<Exercise[]> => {
    try {
      const response = await api.get(`/exercises/bodyPart/${bodyPart}`, {
        params: { limit }
      });
      
      return response.data;
    } catch (error) {
      throw new Error('Kas grubu egzersizleri yüklenirken hata oluştu');
    }
  },

  searchExercises: async (query: string, limit: number = 20): Promise<Exercise[]> => {
    try {
      const response = await api.get(`/exercises/name/${query}`, {
        params: { limit }
      });
      
      return response.data;
    } catch (error) {
      throw new Error('Arama sonuçları yüklenirken hata oluştu');
    }
  },

  getBodyPartsList: async (): Promise<string[]> => {
    try {
      const response = await api.get('/exercises/bodyPartList');
      return response.data;
    } catch (error) {
      throw new Error('Kas grupları yüklenirken hata oluştu');
    }
  },

  // Egzersiz resmi çekme fonksiyonu - /image endpoint kullanarak
  getExerciseImage: async (exerciseId: string): Promise<string> => {
    try {
      const response = await api.get('/image', {
        params: {
          exerciseId: exerciseId,
          resolution: '180'
        },
        responseType: 'blob'
      });
      
      // Blob'dan URL oluştur
      if (response.data instanceof Blob) {
        const blobUrl = URL.createObjectURL(response.data);
        return blobUrl;
      }
      
      return '';
    } catch (error) {
      return '';
    }
  },
};


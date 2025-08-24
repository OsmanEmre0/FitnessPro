import React from 'react';
import { Dumbbell } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-16">
      <div className="relative">
        <Dumbbell className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 animate-bounce" />
        <div className="absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 border-4 border-purple-200 rounded-full animate-ping" />
      </div>
      <p className="mt-4 text-base sm:text-lg font-medium text-slate-600">Egzersizler yükleniyor...</p>
    </div>
  );
};

export default LoadingSpinner;
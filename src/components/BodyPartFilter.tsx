import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface BodyPartFilterProps {
  bodyParts: string[];
  selectedBodyPart: string;
  onBodyPartChange: (bodyPart: string) => void;
  isLoading?: boolean;
}

const BodyPartFilter: React.FC<BodyPartFilterProps> = ({
  bodyParts,
  selectedBodyPart,
  onBodyPartChange,
  isLoading = false,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Dropdown dışına tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Seçim yapıldığında dropdown'ı kapat
  const handleBodyPartSelect = (bodyPart: string) => {
    onBodyPartChange(bodyPart);
    setIsDropdownOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="min-w-[140px] h-14 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  // Desktop görünümü (yatay scroll)
  const DesktopView = () => (
    <div className="hidden md:flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
      <button
        onClick={() => onBodyPartChange('all')}
        className={`flex-shrink-0 min-w-[120px] lg:min-w-[140px] px-6 lg:px-8 py-3 lg:py-4 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-lg hover:shadow-xl whitespace-nowrap ${
          selectedBodyPart === 'all'
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-300'
            : 'bg-white text-slate-700 hover:bg-gradient-to-r hover:from-slate-50 hover:to-purple-50 border border-slate-200'
        }`}
      >
        Tümü
      </button>
      {bodyParts.map((bodyPart) => (
        <button
          key={bodyPart}
          onClick={() => onBodyPartChange(bodyPart)}
          className={`flex-shrink-0 min-w-[120px] lg:min-w-[140px] px-6 lg:px-8 py-3 lg:py-4 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-lg hover:shadow-xl whitespace-nowrap ${
            selectedBodyPart === bodyPart
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-300'
              : 'bg-white text-slate-700 hover:bg-gradient-to-r hover:from-slate-50 hover:to-purple-50 border border-slate-200'
          }`}
        >
          {capitalizeFirst(bodyPart)}
        </button>
      ))}
    </div>
  );

  // Mobile görünümü (dropdown)
  const MobileView = () => (
    <div className="md:hidden relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl font-semibold text-slate-700 flex items-center justify-between transition-all duration-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 shadow-lg"
      >
        <span>
          {selectedBodyPart === 'all' ? 'Tümü' : capitalizeFirst(selectedBodyPart)}
        </span>
        {isDropdownOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500" />
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto">
          <button
            onClick={() => handleBodyPartSelect('all')}
            className={`w-full px-4 py-3 text-left font-semibold transition-colors duration-200 hover:bg-purple-50 first:rounded-t-xl last:rounded-b-xl ${
              selectedBodyPart === 'all'
                ? 'bg-purple-100 text-purple-700'
                : 'text-slate-700'
            }`}
          >
            Tümü
          </button>
          {bodyParts.map((bodyPart) => (
            <button
              key={bodyPart}
              onClick={() => handleBodyPartSelect(bodyPart)}
              className={`w-full px-4 py-3 text-left font-semibold transition-colors duration-200 hover:bg-purple-50 first:rounded-t-xl last:rounded-b-xl ${
                selectedBodyPart === bodyPart
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-slate-700'
              }`}
            >
              {capitalizeFirst(bodyPart)}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <DesktopView />
      <MobileView />
    </div>
  );
};

export default BodyPartFilter;
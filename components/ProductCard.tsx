import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductCardProps {
  image: string;
  titleKey: string;
  onClick?: () => void;
  className?: string;
  showHoverEffect?: boolean;
}

export default function ProductCard({ 
  image, 
  titleKey, 
  onClick, 
  className = '', 
  showHoverEffect = true 
}: ProductCardProps) {
  const { t } = useLanguage();

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 ${
        showHoverEffect ? 'hover:scale-105 hover:shadow-2xl' : ''
      } ${className}`}
    >
      {/* Image Container */}
      <div className="relative aspect-w-16 aspect-h-12 bg-gray-200 dark:bg-gray-800">
        <img
          src={image}
          alt={t(titleKey)}
          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          decoding="async"
          width={640}
          height={480}
        />
        
        {/* Dark Overlay for Better Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Text Container with Better Contrast */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
          {/* Title with Enhanced Visibility */}
          <div className="relative">
            {/* Text Shadow Background */}
            <div className="absolute inset-0 bg-black/50 rounded-md blur-sm"></div>
            
            {/* Title Text */}
            <h3 className="relative text-white font-bold text-base sm:text-lg md:text-xl mb-2 px-3 py-2 rounded-md bg-black/30 backdrop-blur-sm border border-white/20">
              {t(titleKey)}
            </h3>
            
            {/* Bottom Accent Line */}
            <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full w-16 mt-2"></div>
          </div>
        </div>
        
        {/* Hover Overlay for Additional Info */}
        {showHoverEffect && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
              {/* View Icon */}
              <div className="mt-3 sm:mt-4 flex items-center gap-2 text-blue-400">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-xs sm:text-sm font-semibold">Нажмите для просмотра</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Subtle Border */}
      <div className="absolute inset-0 border-2 border-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

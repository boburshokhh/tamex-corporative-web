import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Преобразуем путь к WebP версии (если доступна)
  const getWebPSrc = (originalSrc: string) => {
    if (originalSrc.endsWith('.jpg') || originalSrc.endsWith('.jpeg')) {
      return originalSrc.replace(/\.(jpg|jpeg)$/i, '.webp');
    }
    if (originalSrc.endsWith('.png')) {
      return originalSrc.replace(/\.png$/i, '.webp');
    }
    return originalSrc;
  };

  const webpSrc = getWebPSrc(src);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}
      
      {/* WebP с fallback на оригинал */}
      <picture>
        <source
          srcSet={webpSrc}
          type="image/webp"
          onLoad={handleLoad}
          onError={handleError}
        />
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
        />
      </picture>
    </div>
  );
}


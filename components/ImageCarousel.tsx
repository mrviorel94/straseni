'use client';

import { useState } from 'react';

interface ImageCarouselProps {
  images: string[];
  title: string;
  sold?: boolean;
}

export default function ImageCarousel({ images, title, sold }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full bg-gray-200 rounded-lg overflow-hidden group" style={{ aspectRatio: '16 / 9' }}>
      <img
        src={images[currentIndex]}
        alt={`${title} - Image ${currentIndex + 1}`}
        className={`w-full h-full object-cover transition-all duration-300 ${sold ? 'grayscale opacity-60' : ''}`}
      />

      {sold && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl font-bold text-red-600 rotate-12 transform scale-150 drop-shadow-lg">
            VÂNDUT
          </div>
        </div>
      )}

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        aria-label="Previous image"
      >
        ←
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        aria-label="Next image"
      >
        →
      </button>

      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

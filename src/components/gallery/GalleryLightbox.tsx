
import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '@/types/gallery';

interface GalleryLightboxProps {
  selectedImage: GalleryImage | null;
  currentIndex: number;
  totalImages: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const GalleryLightbox = ({ 
  selectedImage, 
  currentIndex, 
  totalImages, 
  onClose, 
  onNext, 
  onPrev 
}: GalleryLightboxProps) => {
  if (!selectedImage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
      <div className="relative max-w-4xl max-h-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation Buttons */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image */}
        <div className="relative">
          <img
            src={selectedImage.src}
            alt={selectedImage.title}
            className="max-w-full max-h-[80vh] object-contain mx-auto"
          />
          
          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
            <span className="text-xs bg-gold px-3 py-1 rounded-full mb-2 block w-fit">
              {selectedImage.category}
            </span>
            <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
            <p className="text-sm opacity-90">{selectedImage.description}</p>
            <div className="mt-2 text-xs opacity-70">
              {currentIndex + 1} of {totalImages}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryLightbox;

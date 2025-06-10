
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GalleryImage } from '@/types/gallery';

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage, index: number) => void;
}

const GalleryGrid = ({ images, onImageClick }: GalleryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {images.map((image, index) => (
        <Card 
          key={image.id} 
          className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          onClick={() => onImageClick(image, index)}
        >
          <CardContent className="p-0 relative">
            <div className="aspect-square overflow-hidden">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs bg-gold px-2 py-1 rounded-full mb-2 block w-fit">
                    {image.category}
                  </span>
                  <h3 className="font-semibold text-sm">{image.title}</h3>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GalleryGrid;

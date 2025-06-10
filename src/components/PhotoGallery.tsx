
import React, { useState } from 'react';
import GalleryGrid from './gallery/GalleryGrid';
import GalleryLightbox from './gallery/GalleryLightbox';
import GalleryPagination from './gallery/GalleryPagination';
import { galleryImages } from '@/data/galleryImages';
import { GalleryImage } from '@/types/gallery';

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 12;

  // Calculate pagination
  const totalPages = Math.ceil(galleryImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = galleryImages.slice(startIndex, endIndex);

  const openLightbox = (image: GalleryImage, index: number) => {
    // Calculate the actual index in the full images array
    const actualIndex = startIndex + index;
    setSelectedImage(image);
    setCurrentIndex(actualIndex);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(galleryImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(galleryImages[prevIndex]);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-cream">
      <div className="container-section">
        <div className="text-center mb-16">
          <h2 className="section-heading">Our Catering Gallery</h2>
          <p className="section-subheading mx-auto">
            Discover the excellence of our catering services through these beautiful moments captured at various events
          </p>
        </div>

        {/* Gallery Grid */}
        <GalleryGrid images={currentImages} onImageClick={openLightbox} />

        {/* Pagination */}
        <GalleryPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* Gallery Info */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, galleryImages.length)} of {galleryImages.length} photos
          </p>
        </div>

        {/* Lightbox Modal */}
        <GalleryLightbox
          selectedImage={selectedImage}
          currentIndex={currentIndex}
          totalImages={galleryImages.length}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-playfair font-bold mb-4">Ready to Experience Our Excellence?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let us bring the same level of quality and presentation to your next event. Contact us today to discuss your catering needs.
          </p>
          <a href="#booking" className="btn-primary">
            Book Our Service
          </a>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;

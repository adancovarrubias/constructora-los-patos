import React, { useState, useEffect, useCallback } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from './Carousel';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from './Dialog';
import { Button } from './Button';
import { X, ZoomIn } from 'lucide-react';
import styles from './PremiumGallery.module.css';

export type GalleryImage = {
  url: string;
  alt: string;
  category: string;
};

type PremiumGalleryProps = {
  images: GalleryImage[];
  className?: string;
};

export const PremiumGallery = ({ images, className }: PremiumGalleryProps) => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [modalApi, setModalApi] = useState<CarouselApi>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = ['Todos', ...Array.from(new Set(images.map((img) => img.category)))];
  const filteredImages = activeCategory === 'Todos'
    ? images
    : images.filter((img) => img.category === activeCategory);

  const handleImageClick = (index: number) => {
    const originalIndex = images.findIndex(img => img.url === filteredImages[index].url);
    setCurrentSlide(originalIndex);
    setIsModalOpen(true);
  };

  const onSelect = useCallback((api: CarouselApi) => {
    setCurrentSlide(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!mainApi) return;
    mainApi.on('select', () => onSelect(mainApi));
    return () => {
      mainApi.off('select', onSelect);
    };
  }, [mainApi, onSelect]);

  useEffect(() => {
    if (mainApi) {
      mainApi.reInit();
      mainApi.scrollTo(0, true);
    }
  }, [activeCategory, mainApi]);

  useEffect(() => {
    if (isModalOpen && modalApi) {
      modalApi.scrollTo(currentSlide, true);
    }
  }, [isModalOpen, modalApi, currentSlide]);

  return (
    <div className={`${styles.galleryContainer} ${className || ''}`}>
      <div className={styles.filterContainer}>
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'primary' : 'ghost'}
            onClick={() => setActiveCategory(category)}
            className={styles.filterButton}
          >
            {category}
          </Button>
        ))}
      </div>

      <Carousel setApi={setMainApi} className={styles.carouselWrapper} opts={{ loop: true }}>
        <CarouselContent>
          {filteredImages.map((image, index) => (
            <CarouselItem key={index} className={styles.carouselItem}>
              <div className={styles.imageWrapper} onClick={() => handleImageClick(index)}>
                <img
                  src={image.url}
                  alt={image.alt}
                  className={styles.galleryImage}
                  loading="lazy"
                />
                <div className={styles.overlay}>
                  <ZoomIn className={styles.zoomIcon} />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className={styles.modalContent}>
          <Carousel setApi={setModalApi} className={styles.modalCarousel} opts={{ loop: true, startIndex: currentSlide }}>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className={styles.modalImageContainer}>
                    <img
                      src={image.url}
                      alt={image.alt}
                      className={styles.modalImage}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className={styles.modalNav} />
            <CarouselNext className={styles.modalNav} />
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  );
};
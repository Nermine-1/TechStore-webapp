'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || 'https://placehold.co/800x600.png');

  useEffect(() => {
    // Ensure selectedImage is updated if images prop changes and selectedImage is no longer valid
    if (images && images.length > 0 && !images.includes(selectedImage)) {
      setSelectedImage(images[0]);
    } else if ((!images || images.length === 0) && selectedImage !== 'https://placehold.co/800x600.png') {
        setSelectedImage('https://placehold.co/800x600.png');
    }
  }, [images, selectedImage]);


  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full overflow-hidden rounded-lg border bg-muted shadow-sm">
        <Image
          src="https://placehold.co/800x600.png"
          alt={`${productName} placeholder image`}
          width={800}
          height={800}
          className="h-full w-full object-cover"
          data-ai-hint="product placeholder"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square w-full overflow-hidden rounded-lg border bg-card shadow-md">
        <Image
          src={selectedImage}
          alt={`Main image of ${productName}`}
          width={800}
          height={800}
          className="h-full w-full object-cover transition-opacity duration-300"
          data-ai-hint="product detail image"
          priority // Prioritize loading of the main product image
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={cn(
                'aspect-square overflow-hidden rounded-md border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                selectedImage === image ? 'border-primary shadow-md' : 'border-transparent hover:border-muted-foreground/50'
              )}
              aria-label={`View image ${index + 1} of ${productName}`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1} of ${productName}`}
                width={150}
                height={150}
                className="h-full w-full object-cover"
                data-ai-hint="product thumbnail"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

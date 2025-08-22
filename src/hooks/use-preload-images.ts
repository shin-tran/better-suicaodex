"use client";

import { useEffect, useRef, useState } from "react";

interface UsePreloadImagesOptions {
  images: string[];
  preloadCount?: number;
  visibilityThreshold?: number;
}

export function usePreloadImages({
  images,
  preloadCount = 5,
  visibilityThreshold = 0.1
}: UsePreloadImagesOptions) {
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const imageRefs = useRef<Map<number, HTMLElement>>(new Map());

  // Preload ảnh
  const preloadImage = (src: string) => {
    if (preloadedImages.has(src)) return;
    
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setPreloadedImages(prev => new Set([...prev, src]));
    };
    img.onerror = () => {
      console.warn(`Failed to preload image: ${src}`);
    };
  };

  // Setup Intersection Observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const newVisibleImages = new Set(visibleImages);
        
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-image-index') || '0');
          
          if (entry.isIntersecting) {
            newVisibleImages.add(index);
          } else {
            newVisibleImages.delete(index);
          }
        });
        
        setVisibleImages(newVisibleImages);
      },
      {
        threshold: visibilityThreshold,
        rootMargin: '50px 0px 200px 0px' // Mở rộng vùng detect để preload sớm hơn
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [visibilityThreshold]);

  // Preload images dựa trên những ảnh đang visible
  useEffect(() => {
    if (visibleImages.size === 0) return;

    const maxVisibleIndex = Math.max(...Array.from(visibleImages));
    const imagesToPreload: string[] = [];

    // Preload các ảnh tiếp theo
    for (let i = 1; i <= preloadCount; i++) {
      const nextIndex = maxVisibleIndex + i;
      if (nextIndex < images.length) {
        imagesToPreload.push(images[nextIndex]);
      }
    }

    // Bắt đầu preload
    imagesToPreload.forEach(preloadImage);
  }, [visibleImages, images, preloadCount]);

  // Function để register element với observer
  const registerImageElement = (index: number, element: HTMLElement | null) => {
    if (!element || !observerRef.current) return;

    // Unobserve previous element if exists
    const previousElement = imageRefs.current.get(index);
    if (previousElement) {
      observerRef.current.unobserve(previousElement);
    }

    // Set data attribute and observe new element
    element.setAttribute('data-image-index', index.toString());
    imageRefs.current.set(index, element);
    observerRef.current.observe(element);
  };

  return {
    registerImageElement,
    preloadedImages,
    visibleImages
  };
}

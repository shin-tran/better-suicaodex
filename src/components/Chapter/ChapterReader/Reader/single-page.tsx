"use client";

import { useConfig } from "@/hooks/use-config";
import MangaImage from "./manga-image";
import { useState, useRef, useEffect } from "react";

interface SinglePageProps {
  images: string[];
}

export default function SinglePage({ images }: SinglePageProps) {
  //   const [config] = useConfig();
  const [currentPage, setCurrentPage] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  const goToNextPage = () => {
    if (currentPage < images.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    const container = e.currentTarget;
    const clickX = e.clientX - container.getBoundingClientRect().left;
    const containerWidth = container.clientWidth;

    if (clickX > containerWidth / 2) {
      goToNextPage();
    } else {
      goToPreviousPage();
    }
  };

  return (
    <>
      <div className="mt-2 text-center">
        {currentPage + 1}/{images.length}
      </div>
      <div className="min-w-0 relative mt-2" ref={imageContainerRef}>
        <div
          className="overflow-x-auto flex items-center h-full select-none cursor-pointer"
          onClick={handleClick}
        >
          <MangaImage
            src={images[currentPage]}
            alt={`Trang ${currentPage + 1}`}
            onLoaded={() => {}}
          />
        </div>
      </div>
    </>
  );
}

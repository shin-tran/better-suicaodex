"use client";

import { useEffect, useState } from "react";
import MangaSlide from "./manga-slide";

interface RandomMangaSlideProps {
  mangaList: any[];
}

export default function RandomMangaSlide({ mangaList }: RandomMangaSlideProps) {
  const [currentManga, setCurrentManga] = useState(mangaList[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mangaList.length);
      setCurrentManga(mangaList[randomIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, [mangaList]);

  return <MangaSlide manga={currentManga} />;
}

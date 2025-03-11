"use client";

import { Chapter, ChapterAggregate } from "@/types/types";
import ChapterNav from "./chapter-nav";
import LongStrip from "./long-strip";
import useSWR from "swr";
import { getChapterAggregate } from "@/lib/mangadex/chapter";
import { Loader, Loader2 } from "lucide-react";
import { useEffect } from "react";

interface ReaderProps {
  images: string[];
  chapterData: Chapter;
}

export default function Reader({ images, chapterData }: ReaderProps) {
  const { data, isLoading, error, mutate } = useSWR(
    [
      "aggregate",
      chapterData.manga.id,
      chapterData.language,
      chapterData.group.map((group) => group.id),
    ],
    ([, mangaId, language, groups]) =>
      getChapterAggregate(mangaId, language, groups),
    {
      refreshInterval: 1000 * 60 * 30,
      revalidateOnFocus: false,
    }
  );

  // Check if current chapter exists in the aggregate data
  const chapterExists = data?.some(volume => 
    volume.chapters.some(chapter => chapter.id === chapterData.id || 
      chapter.other?.some(id => id === chapterData.id))
  );

  // If data loaded but chapter doesn't exist, try revalidating
  useEffect(() => {
    if (data && !chapterExists) {
      console.log("Chapter not found in aggregate data, revalidating...");
      mutate();
    }
  }, [data, chapterExists, mutate]);

  if (isLoading || (data && !chapterExists)) {
    return (
      <>
        <LongStrip images={images} />
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 p-3 rounded-lg backdrop-blur-sm">
          <Loader2 size={35} className="animate-spin text-primary" />
        </div>
      </>
    );
  }
  
  if (error || !data) return <LongStrip images={images} />;

  return (
    <>
      <LongStrip images={images} />
      <ChapterNav chapterData={chapterData} chapterAggregate={data} />
    </>
  );
}

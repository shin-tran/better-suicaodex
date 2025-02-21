"use client";

import { Chapter, ChapterAggregate } from "@/types/types";
import ChapterNav from "./chapter-nav";
import LongStrip from "./long-strip";
import useSWR from "swr";
import { getChapterAggregate } from "@/lib/mangadex/chapter";
import { Loader, Loader2 } from "lucide-react";

interface ReaderProps {
  images: string[];
  chapterData: Chapter;
}

export default function Reader({ images, chapterData }: ReaderProps) {
  const { data, isLoading, error } = useSWR(
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

  if (isLoading)
    return (
      <div className="flex w-full justify-center">
        <Loader2 size={35} className="animate-spin text-primary" />
      </div>
    );
  if (error) return <div>Error</div>;
  if (!data) return <div>Not Found</div>;

  return (
    <>
      <ChapterNav chapterData={chapterData} chapterAggregate={data} />
      <LongStrip images={images} />
    </>
  );
}

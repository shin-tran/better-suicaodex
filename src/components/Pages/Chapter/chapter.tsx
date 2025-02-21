"use client";

import ChapterInfo from "@/components/Chapter/ChapterReader/chapter-info";
import Reader from "@/components/Chapter/ChapterReader/Reader";
import LongStrip from "@/components/Chapter/ChapterReader/Reader/long-strip";
import { getChapterAggregate, getChapterDetail } from "@/lib/mangadex/chapter";
import useSWR from "swr";

interface ChapterProps {
  id: string;
}

export default function Chapter({ id }: ChapterProps) {
  const { data, isLoading, error } = useSWR(
    ["chapter", id],
    ([, id]) => getChapterDetail(id),
    {
      refreshInterval: 1000 * 60 * 30,
      revalidateOnFocus: false,
    }
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>Not found</div>;

  return (
    <>
      <ChapterInfo chapter={data} />

      {!!data.pages && <Reader images={data.pages} chapterData={data} />}
    </>
  );
}

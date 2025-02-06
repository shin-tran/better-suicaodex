import { getChapterVolume } from "@/lib/mangadex/chapter";
import { Volume } from "@/types/types";
import { useEffect, useState } from "react";
import { ChapterCard } from "./chapter-card";

interface ChapterListProps {
  mangaID: string;
  language: string;
  limit: number;
  finalChapter?: string;
}

export const ChapterList = ({
  mangaID,
  language,
  limit,
  finalChapter,
}: ChapterListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [volume, setVolume] = useState<Volume[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { volumes, total } = await getChapterVolume(
          mangaID,
          language,
          limit,
          offset
        );
        console.log(volumes);
        setVolume(volumes);
        setTotalPages(Math.ceil(total / limit));
      } catch (error) {
        console.log(error);
        setFetchFailed(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  if (fetchFailed) return <p>Failed to fetch data</p>;

  if (isLoading) return <p>Loading...</p>;

  if (totalPages === 0) return <p>No chapters found</p>;
  if (totalPages > 1000) setCurrentPage(1000); //temporary for testing
  return (
    <div className="flex flex-col gap-2">
      {volume.length > 0 &&
        volume[0].chapters.map((chapter) => (
          <ChapterCard
            key={chapter.chapter}
            chapters={chapter}
            finalChapter={finalChapter}
          />
        ))}
    </div>
  );
};

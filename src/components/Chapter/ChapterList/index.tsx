import { getChapterVolume } from "@/lib/mangadex/chapter";
import { Volume } from "@/types/types";
import { useEffect, useState } from "react";
import { VolumeCard } from "./volume-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
    <>
      <div className="flex flex-col gap-0">
        {volume.length > 0 &&
          volume.map((vol) => (
            <VolumeCard
              key={vol.vol}
              volume={vol}
              finalChapter={finalChapter}
            />
          ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationPrevious
              className="w-8 h-8"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            />

            {totalPages <= 7 ? (
              // Show all pages if total is 7 or less
              Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    className="w-8 h-8"
                    isActive={i + 1 === currentPage}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))
            ) : currentPage <= 4 ? (
              // Near start: show 1, 2, 3, 4, 5, ..., lastPage
              <>
                {[1, 2, 3, 4, 5].map((num) => (
                  <PaginationItem key={num}>
                    <PaginationLink
                      className="w-8 h-8"
                      isActive={num === currentPage}
                      onClick={() => setCurrentPage(num)}
                    >
                      {num}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationEllipsis />
                <PaginationItem>
                  <PaginationLink
                    className="w-8 h-8"
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            ) : currentPage >= totalPages - 3 ? (
              // Near end: show 1, ..., lastPage-4, lastPage-3, lastPage-2, lastPage-1, lastPage
              <>
                <PaginationItem>
                  <PaginationLink
                    className="w-8 h-8"
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationEllipsis />
                {[
                  totalPages - 4,
                  totalPages - 3,
                  totalPages - 2,
                  totalPages - 1,
                  totalPages,
                ].map((num) => (
                  <PaginationItem key={num}>
                    <PaginationLink
                      className="w-8 h-8"
                      isActive={num === currentPage}
                      onClick={() => setCurrentPage(num)}
                    >
                      {num}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </>
            ) : (
              // Middle: show 1, ..., currentPage-1, currentPage, currentPage+1, ..., lastPage
              <>
                <PaginationItem>
                  <PaginationLink
                    className="w-8 h-8"
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationEllipsis />
                {[currentPage - 1, currentPage, currentPage + 1].map((num) => (
                  <PaginationItem key={num}>
                    <PaginationLink
                      className="w-8 h-8"
                      isActive={num === currentPage}
                      onClick={() => setCurrentPage(num)}
                    >
                      {num}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationEllipsis />
                <PaginationItem>
                  <PaginationLink
                    className="w-8 h-8"
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationNext
              className="w-8 h-8"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

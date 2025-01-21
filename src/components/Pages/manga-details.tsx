"use client";

import { Manga } from "@/types/types";
import MangaCover from "../Manga/manga-cover";
import Background from "../Manga/background";
import { useIsMobile } from "@/hooks/use-mobile";
import { MangaStatsComponent } from "../Manga/manga-stats";
import { cn } from "@/lib/utils";

interface MangaDetailsProps {
  manga: Manga;
}

export default function MangaDetails({ manga }: MangaDetailsProps) {
  const isMobile = useIsMobile();
  return (
    <>
      <Background id={manga.id} src={manga.cover} />

      {isMobile ? (
        <div className="flex flex-row gap-4 px-4 mt-2">
          <MangaCover
            id={manga.id}
            cover={manga.cover}
            alt={manga.title}
            //placeholder="/doro_think.webp"
            loading="lazy"
            className="max-w-[130px] shadow-md"
            isExpandable
            //priority
          />

          <div className="flex flex-col gap-2 justify-between">
            <div className="flex flex-col gap-1.5">
              <p className="drop-shadow-md font-black text-2xl leading-7">
                {manga.title}
              </p>
              {!!manga.altTitle && (
                <h2 className="drop-shadow-md text-lg leading-5">
                  {manga.altTitle}
                </h2>
              )}
              <p className="drop-shadow-md text-sm">
                {manga.author.map((a) => a.name).join(", ")}
              </p>
            </div>
            {!!manga.stats && <MangaStatsComponent stats={manga.stats} />}
          </div>
        </div>
      ) : (
        <div className="flex px-4 mt-2 gap-4">
          <MangaCover
            id={manga.id}
            cover={manga.cover}
            alt={manga.title}
            placeholder="/doro_think.webp"
            loading="lazy"
            className="max-w-[200px] shadow-md"
            isExpandable
            //priority
          />
          <div className="flex flex-col gap-2 justify-start">
            <p
              className={cn(
                "drop-shadow-md font-black",
                "text-3xl md:text-5xl md:text-white lg:text-6xl"
              )}
            >
              {manga.title}
            </p>
            {!!manga.altTitle && (
              <h2 className="text-lg md:text-white">{manga.altTitle}</h2>
            )}
            <p className="text-sm md:text-white">
              {manga.author.map((a) => a.name).join(", ")}
            </p>
            {/* {!!manga.stats && <MangaStatsComponent stats={manga.stats} />} */}
          </div>
        </div>
      )}
    </>
  );
}

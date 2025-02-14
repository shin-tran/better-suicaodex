"use client";

import MangaCover from "@/components/Manga/manga-cover";
import { MangaStatsComponent } from "@/components/Manga/manga-stats";
import StatusChip from "@/components/Manga/Tags/status-tag";
import { Card, CardContent } from "@/components/ui/card";
import { Manga } from "@/types/types";

interface CompactCardProps {
  manga: Manga;
}

export default function CompactCard({ manga }: CompactCardProps) {
  return (
    <Card className="rounded-md shadow-sm hover:bg-accent transition-colors duration-200">
      <CardContent className="flex gap-2 p-2">
        <MangaCover
          id={manga.id}
          cover={manga.cover}
          alt={manga.title}
          placeholder="/images/xidoco.jpg"
          wrapper="w-14 h-auto border"
          className="!w-14 !h-20 !object-cover"
        />
        <div className="flex flex-col justify-evenly w-full">
          <p className="line-clamp-1 font-black text-xl">{manga.title}</p>

          {!!manga.stats && (
            <MangaStatsComponent stats={manga.stats} size="sm" />
          )}

          <StatusChip status={manga.status} />
        </div>
      </CardContent>
    </Card>
  );
}

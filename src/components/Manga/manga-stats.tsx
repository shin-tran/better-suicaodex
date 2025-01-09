"use client";

import { MangaStats } from "@/types/types";
import { FC, useEffect, useState } from "react";
import { Bookmark, MessageSquare, Star } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { RatingChart } from "./rating-chart";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";

interface MangaStatsProps {
  stats: MangaStats;
}

export const MangaStatsComponent: FC<MangaStatsProps> = ({ stats }) => {
  const [config] = useConfig();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <div className="flex flex-row gap-2">
      {isMobile ? (
        <Popover>
          <PopoverTrigger asChild>
            <span className="flex items-center gap-1 text-sm cursor-pointer text-[hsl(var(--primary))] drop-shadow-md">
              <Star size={16} />
              <span>{stats.rating.bayesian.toFixed(2)}</span>
            </span>
          </PopoverTrigger>
          <PopoverContent
            className={cn("w-80 py-2 px-0", `theme-${config.theme}`)}
          >
            <RatingChart stats={stats} />
          </PopoverContent>
        </Popover>
      ) : (
        <HoverCard openDelay={0}>
          <HoverCardTrigger asChild>
            <span className="flex items-center gap-1 text-sm cursor-pointer text-[hsl(var(--primary))] drop-shadow-md">
              <Star size={16} />
              <span>{stats.rating.bayesian.toFixed(2)}</span>
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 py-2 px-0 rounded-md">
            <RatingChart stats={stats} />
          </HoverCardContent>
        </HoverCard>
      )}

      <span className="flex items-center gap-1 text-sm drop-shadow-md">
        <Bookmark size={16} />
        <span>{stats.follows.toLocaleString("en-US")}</span>
      </span>
      <span className="flex items-center gap-1 text-sm drop-shadow-md">
        <MessageSquare size={16} />
        {!!stats.comments && (
          <span>{stats.comments.toLocaleString("en-US")}</span>
        )}
      </span>
    </div>
  );
};

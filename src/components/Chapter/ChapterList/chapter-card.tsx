"use client";
import { ChapterGroup } from "@/types/types";
import { Card } from "../../ui/card";
import { Clock, MessageSquare, Users } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn, formatTimeToNow } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ChapterCardProps {
  chapters: ChapterGroup;
  finalChapter?: string;
}

export const ChapterCard = ({ chapters, finalChapter }: ChapterCardProps) => {
  const router = useRouter();
  if (chapters.group.length > 1) return <p> 2 con mẹ mày</p>;

  return (
    <Link suppressHydrationWarning href={`/chapter/${chapters.group[0].id}`}>
      <Card className="flex flex-col justify-between rounded-none px-1.5 py-1.5 shadow-sm relative min-h-14 hover:bg-accent">
        <div className="flex justify-between">
          <div className="flex items-center space-x-1">
            <p className="font-semibold text-sm md:text-base line-clamp-1">
              {chapters.chapter
                ? `Ch. ${chapters.chapter}
        ${chapters.group[0].title ? ` - ${chapters.group[0].title}` : ""}`
                : "Oneshot"}
            </p>
            {finalChapter && finalChapter === chapters.chapter && (
              <span className="text-[0.625rem] font-bold bg-primary rounded-sm px-1">
                END
              </span>
            )}
          </div>

          <Button
            size="sm"
            variant="ghost"
            className="rounded-sm gap-0.5 h-6 px-1"
          >
            <MessageSquare />
          </Button>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <Users size={16} />
            {chapters.group[0].group.length === 0 ? (
              <span className="line-clamp-1 font-normal text-xs px-[0.25rem]">
                No Group
              </span>
            ) : (
              chapters.group[0].group.map((group) => (
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      className:
                        "line-clamp-1 font-normal rounded-sm h-4 py-0 px-[0.25rem] hover:underline hover:text-primary",
                      size: "sm",
                    })
                  )}
                  href={`/groups/${group.id}`}
                  key={group.id}
                >
                  {group.name}
                </Link>
                // <Button
                //   key={group.id}
                //   variant="ghost"
                //   className="line-clamp-1 font-normal rounded-sm h-4 py-0 px-[0.25rem] hover:underline hover:text-primary"
                //   size="sm"
                //   onClick={(e: React.MouseEvent) => {
                //     e.preventDefault();
                //     e.stopPropagation();
                //     router.push(`/groups/${group.id}`);
                //   }}
                // >
                //   {group.name}
                // </Button>
              ))
            )}
          </div>
          <div className="flex items-center space-x-1 justify-self-start">
            <Clock size={16} />
            <time
              className="text-xs font-light line-clamp-1"
              dateTime={new Date(chapters.group[0].updatedAt).toDateString()}
            >
              {formatTimeToNow(new Date(chapters.group[0].updatedAt))}
            </time>
          </div>
        </div>
      </Card>
    </Link>
  );
};

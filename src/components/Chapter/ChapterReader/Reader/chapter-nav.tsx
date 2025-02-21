"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useKeyDown from "@/hooks/use-keydown";
import { Chapter, ChapterAggregate } from "@/types/types";
import { ArrowLeft, ArrowRight, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ChapterNavProps {
  chapterData: Chapter;
  chapterAggregate: ChapterAggregate[];
}

export default function ChapterNav({
  chapterData,
  chapterAggregate,
}: ChapterNavProps) {
  let currentVolIndex = chapterAggregate.findIndex((aggregate) =>
    aggregate.chapters.some((chapter) => chapter.id === chapterData.id)
  );

  if (currentVolIndex === -1) {
    currentVolIndex = chapterAggregate.findIndex((aggregate) =>
      aggregate.chapters.some((chapter) =>
        chapter.other?.some((id) => id === chapterData.id)
      )
    );
  }

  const currentChapterIndex = chapterAggregate[
    currentVolIndex
  ].chapters.findIndex((chapter) => chapter.id === chapterData.id);

  const prevChapter = chapterAggregate[currentVolIndex].chapters[
    currentChapterIndex + 1
  ]?.id
    ? chapterAggregate[currentVolIndex].chapters[currentChapterIndex + 1]?.id
    : chapterAggregate[currentVolIndex + 1]?.chapters[0]?.id;

  const nextChapter = chapterAggregate[currentVolIndex].chapters[
    currentChapterIndex - 1
  ]?.id
    ? chapterAggregate[currentVolIndex].chapters[currentChapterIndex - 1]?.id
    : chapterAggregate[currentVolIndex - 1]?.chapters.at(-1)?.id;

  const router = useRouter();
  const goNextChapter = () => {
    if (nextChapter) return router.push(`/chapter/${nextChapter}`);
    return toast.warning("Đây là chương mới nhất rồi nha!");
  };

  const goPrevChapter = () => {
    if (prevChapter) return router.push(`/chapter/${prevChapter}`);
    return toast.warning("Đây là chương đầu tiên mà!");
  };

  useKeyDown("ArrowLeft", goPrevChapter);
  useKeyDown("ArrowRight", goNextChapter);
  return (
    <div className="flex gap-2">
      <Button
        asChild={!!prevChapter}
        disabled={!prevChapter}
        variant="outline"
        size="icon"
        className="shrink-0 disabled:cursor-not-allowed"
      >
        <Link href={prevChapter ? `/chapter/${prevChapter}` : "#"}>
          <ArrowLeft />
        </Link>
      </Button>

      <Select
        defaultValue={chapterData.id}
        onValueChange={(id) => router.push(`/chapter/${id}`)}
      >
        <SelectTrigger className="focus:ring-0" disabled={!chapterData.chapter}>
          <SelectValue placeholder={ChapterTitle(chapterData)} />
        </SelectTrigger>
        <SelectContent>
          {chapterAggregate.map((vol) => (
            <SelectGroup key={vol.vol}>
              <div className="flex items-center pr-2">
                <SelectLabel className="shrink-0">
                  {vol.vol !== "none" ? `Volume ${vol.vol}` : "No Volume"}
                </SelectLabel>
                <hr className="w-full" />
              </div>

              {vol.chapters.map((chapter) => (
                <SelectItem
                  key={chapter.id}
                  value={chapter.id}
                  disabled={chapter.id === chapterData.id}
                >
                  {chapter.chapter ? `Ch. ${chapter.chapter}` : "Oneshot"}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>

      <Button
        asChild={!!nextChapter}
        disabled={!nextChapter}
        variant="outline"
        size="icon"
        className="shrink-0 disabled:cursor-not-allowed"
      >
        <Link href={nextChapter ? `/chapter/${nextChapter}` : "#"}>
          <ArrowRight />
        </Link>
      </Button>

      <Button
        size="icon"
        variant="outline"
        className="shrink-0"
        onClick={() => toast.info("Tính năng đang phát triển!")}
      >
        <Settings />
      </Button>
    </div>
  );
}

function ChapterTitle(chapter: Chapter) {
  if (!chapter.chapter) {
    return "Oneshot";
  }
  return `Ch. ${chapter.chapter}`;
}

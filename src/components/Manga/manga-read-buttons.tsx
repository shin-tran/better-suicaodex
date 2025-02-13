"use client";

import { useConfig } from "@/hooks/use-config";
import { FirstEnChapter, FirstViChapter } from "@/lib/mangadex/manga";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { BookOpen, BookX, Loader2, TriangleAlert } from "lucide-react";
import { Chapter } from "@/types/types";
import Link from "next/link";

interface MangaReadButtonProps {
  id: string;
}

export default function MangaReadButtons({ id }: MangaReadButtonProps) {
  const [config] = useConfig();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [chapter, setChapter] = useState<Chapter>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          JSON.stringify(config.translatedLanguage) === JSON.stringify(["en"])
        ) {
          const res = await FirstEnChapter(id, config.r18);
          setChapter(res);
        } else if (
          JSON.stringify(config.translatedLanguage) === JSON.stringify(["vi"])
        ) {
          const res = await FirstViChapter(id, config.r18);
          setChapter(res);
        } else {
          const vi = await FirstViChapter(id, config.r18);
          const en = await FirstEnChapter(id, config.r18);
          if (!!vi) {
            setChapter(vi);
          } else {
            setChapter(en);
          }
        }
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, config.r18, config.translatedLanguage]);

  if (isLoading) {
    return (
      <Button
        variant="secondary"
        disabled
        className="rounded-sm md:h-10 grow md:grow-0"
      >
        <Loader2 className="animate-spin" />
      </Button>
    );
  }

  if (error) {
    return (
      <Button
        variant="secondary"
        disabled
        className="rounded-sm md:h-10 grow md:grow-0"
      >
        <TriangleAlert />
        Lỗi!!!
      </Button>
    );
  }

  if (!chapter) {
    return (
      <Button
        variant="secondary"
        disabled
        className="rounded-sm md:h-10 grow md:grow-0"
      >
        <BookX />
        Đọc ngay
      </Button>
    );
  }

  return (
    <Button
      variant="secondary"
      className="rounded-sm md:h-10 grow md:grow-0"
      asChild
    >
      <Link href={`/chapter/${chapter.id}`}>
        <BookOpen />
        Đọc ngay
      </Link>
    </Button>
  );
}

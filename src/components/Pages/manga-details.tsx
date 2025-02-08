"use client";

import { Manga } from "@/types/types";
import MangaCover from "../Manga/manga-cover";
import Background from "../Manga/background";
import { useIsMobile } from "@/hooks/use-mobile";
import { MangaStatsComponent } from "../Manga/manga-stats";
import { cn } from "@/lib/utils";
import Tags from "../Manga/Tags";
import { Button } from "../ui/button";
import {
  Archive,
  BookOpen,
  Bug,
  Ellipsis,
  LibraryBig,
  List,
  ListPlus,
  MessageSquare,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import MangaDescription from "../Manga/manga-description";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ChapterList } from "../Chapter/ChapterList";
import { useConfig } from "@/hooks/use-config";

interface MangaDetailsProps {
  manga: Manga;
}

export default function MangaDetails({ manga }: MangaDetailsProps) {
  const isMobile = useIsMobile();
  const [config] = useConfig();

  if (isMobile)
    return (
      <>
        <Background id={manga.id} src={manga.cover} />
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <MangaCover
              id={manga.id}
              cover={manga.cover}
              alt={manga.title}
              placeholder="/xidoco.jpg"
              className="shadow-lg"
              wrapper="max-w-[130px]"
              isExpandable
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

          <div className="flex flex-wrap gap-1">
            <Tags
              tags={manga.tags}
              contentRating={manga.contentRating}
              status={manga.status}
            />
          </div>

          <div className="flex flex-grow gap-2 ">
            <Button size="icon" className="rounded-sm grow-0">
              <ListPlus />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-sm grow-0"
                  variant="secondary"
                  size="icon"
                >
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={`theme-${config.theme}`}>
                <DropdownMenuItem>
                  <Link
                    href={`${siteConfig.mangadexAPI.webURL}/title/${manga.id}`}
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    <Archive size={18} />
                    MangaDex
                  </Link>
                </DropdownMenuItem>
                {!!manga.raw && (
                  <DropdownMenuItem>
                    <Link
                      href={`${siteConfig.mangadexAPI.webURL}/title/${manga.id}`}
                      target="_blank"
                      className="flex items-center gap-2"
                    >
                      <LibraryBig size={18} />
                      Raw
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem>
                  <Link
                    href={`${siteConfig.links.facebook}`}
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    <Bug size={18} />
                    Báo lỗi
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="rounded-sm grow" variant="secondary">
              <BookOpen /> Đọc ngay
            </Button>
            {/* <Button className="rounded-sm grow" variant="secondary">
              <BookOpenCheck /> Đọc tiếp Ch. 999
            </Button> */}
          </div>

          {!!manga.description.content && (
            <MangaDescription
              content={manga.description.content}
              language={manga.description.language}
              height={72}
              maxHeight={72}
            />
          )}

          <Tabs defaultValue="chapter">
            <TabsList className="rounded-sm w-full">
              <TabsTrigger
                value="chapter"
                className="rounded-sm w-full flex gap-1"
              >
                <List size={20} />
                Danh sách chương
              </TabsTrigger>
              <TabsTrigger
                value="comment"
                className="rounded-sm w-full flex gap-1"
              >
                <MessageSquare size={20} />
                Bình luận
              </TabsTrigger>
            </TabsList>
            <TabsContent value="chapter">
              <ChapterList
                language="vi"
                limit={15}
                mangaID={manga.id}
                finalChapter={manga.finalChapter}
              />
            </TabsContent>
            <TabsContent value="comment">mẹ mày</TabsContent>
          </Tabs>
        </div>
      </>
    );

  return (
    <>
      <Background id={manga.id} src={manga.cover} />

      <section className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <MangaCover
            id={manga.id}
            cover={manga.cover}
            alt={manga.title}
            placeholder="/xidoco.jpg"
            className="shadow-lg"
            wrapper="max-w-[200px]"
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

        <Tabs defaultValue="chapter">
          <TabsList className="rounded-sm w-full">
            <TabsTrigger
              value="chapter"
              className="rounded-sm w-full flex gap-1"
            >
              <List size={20} />
              Danh sách chương
            </TabsTrigger>
            <TabsTrigger
              value="comment"
              className="rounded-sm w-full flex gap-1"
            >
              <MessageSquare size={20} />
              Bình luận
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chapter">
            <ChapterList
              language="vi"
              limit={100}
              mangaID={manga.id}
              finalChapter={manga.finalChapter}
            />
          </TabsContent>
          <TabsContent value="comment">mẹ mày</TabsContent>
        </Tabs>
      </section>
    </>
  );
}

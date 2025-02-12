"use client";

import { Manga } from "@/types/types";
import MangaCover from "../Manga/manga-cover";
import Banner from "../Manga/manga-banner";
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
  Share2,
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

  return (
    <>
      <Banner id={manga.id} src={manga.cover} />

      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div className="relative">
            <MangaCover
              id={manga.id}
              cover={manga.cover}
              alt={manga.title}
              placeholder="/images/xidoco.jpg"
              className="shadow-md drop-shadow-md"
              wrapper="w-[130px] md:w-[200px] h-auto"
              isExpandable
            />
          </div>

          {isMobile ? (
            <div className="flex flex-col gap-2 justify-between">
              <div className="flex flex-col gap-1.5">
                <p className="drop-shadow-md font-black text-2xl leading-7">
                  {manga.title}
                </p>
                {!!manga.altTitle && (
                  <h2 className="drop-shadow-md text-lg leading-5 line-clamp-2">
                    {manga.altTitle}
                  </h2>
                )}
                <p className="drop-shadow-md text-sm line-clamp-1 max-w-[80%]">
                  {[
                    ...new Set([
                      ...manga.author.map((a) => a.name),
                      ...manga.artist.map((a) => a.name),
                    ]),
                  ].join(", ")}
                </p>
              </div>
              {!!manga.stats && <MangaStatsComponent stats={manga.stats} />}
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex flex-col justify-between h-[13.5rem] pb-[0.5rem]">
                <div className="flex flex-col">
                  <p
                    className={cn(
                      "drop-shadow-md font-black md:text-white",
                      // "text-3xl md:text-white md:text-5xl"
                      manga.title.length > 20 ? "text-4xl" : "text-6xl"
                    )}
                  >
                    {manga.title}
                  </p>
                  {!!manga.altTitle && (
                    <span
                      className="drop-shadow-md text-lg md:text-white line-clamp-1"
                      title={manga.altTitle}
                    >
                      {manga.altTitle}
                    </span>
                  )}
                </div>

                <p className="text-sm md:text-white line-clamp-1 max-w-[80%]">
                  {[
                    ...new Set([
                      ...manga.author.map((a) => a.name),
                      ...manga.artist.map((a) => a.name),
                    ]),
                  ].join(", ")}
                </p>
              </div>

              <div className="pt-[0.85rem] flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  <Button size="lg" className="rounded-sm">
                    <ListPlus />
                    Thêm vào thư viện
                  </Button>
                  <Button size="lg" className="rounded-sm" variant="secondary">
                    <BookOpen />
                    Đọc ngay
                  </Button>
                  <Button
                    size="icon"
                    className="rounded-sm h-10 w-10"
                    variant="secondary"
                  >
                    <Share2 />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="rounded-sm h-10 w-10"
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
                </div>

                <div className="flex flex-wrap gap-1">
                  <Tags
                    tags={manga.tags}
                    contentRating={manga.contentRating}
                    status={manga.status}
                  />
                </div>

                {!!manga.stats && <MangaStatsComponent stats={manga.stats} />}
              </div>
            </div>
          )}
        </div>

        {isMobile && (
          <>
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

              <Button size="icon" className="rounded-sm grow-0">
                <Share2 />
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
          </>
        )}

        {!!manga.description.content && (
          <MangaDescription
            content={manga.description.content}
            language={manga.description.language}
            maxHeight={isMobile ? 78 : 234}
          />
        )}

        <Tabs defaultValue="chapter">
          <TabsList className="rounded-sm w-full md:w-auto">
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
              language={config.translatedLanguage}
              limit={100}
              mangaID={manga.id}
              finalChapter={manga.finalChapter}
            />
          </TabsContent>
          <TabsContent value="comment">Tính năng đang phát triển!</TabsContent>
        </Tabs>
      </div>
    </>
  );
}

"use client";

import { siteConfig } from "@/config/site";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Artist, Author, Manga } from "@/types/types";
import Link from "next/link";
import MangaCover from "../manga-cover";
import Tags from "../Tags";
// import remarkGfm from "remark-gfm";
// import ReactMarkdown from "react-markdown";

interface MangaSlideProps {
  manga: Manga;
}

export default function MangaSlide({ manga }: MangaSlideProps) {
  const bannerSrc =
    siteConfig.suicaodex.apiURL + "/covers/" + manga.id + "/" + manga.cover;

  return (
    <>
      {/* Banner */}
      <div className="absolute h-[344px] md:h-[440px] z-[-2] w-auto left-0 right-0 top-0 block">
        <div
          className={cn(
            "absolute h-[324px] md:h-[400px] w-full",
            "bg-no-repeat bg-cover bg-center-25"
          )}
          style={{ backgroundImage: `url('${bannerSrc}')` }}
        ></div>

        <div
          className={cn(
            "absolute h-[324px] md:h-[400px] w-auto inset-0 pointer-events-none"
            //"backdrop-blur-[1px]"
          )}
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--background) / .25) 0%, hsl(var(--background)) 100%)",
          }}
        ></div>
      </div>

      {/* Manga */}

      <div
        className={cn(
          "flex gap-4 pt-28 px-4 md:pl-8 lg:pl-12",
          "md:pr-[calc(32px+var(--sidebar-width-icon))] lg:pr-[calc(48px+var(--sidebar-width-icon))]"
        )}
      >
        <Link href={`/manga/${manga.id}`}>
          <MangaCover
            id={manga.id}
            cover={manga.cover}
            alt={manga.title}
            placeholder="/images/xidoco.jpg"
            className="shadow-md drop-shadow-md aspect-[7/10] !object-cover"
            wrapper="w-[130px] md:w-[200px] lg:w-[215px] h-auto"
          />
        </Link>

        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <Link href={`/manga/${manga.id}`}>
              <p className="drop-shadow-md font-black text-xl md:text-4xl md:min-h-11 line-clamp-5 md:line-clamp-6">
                {manga.title}
              </p>
            </Link>

            <div className="hidden md:flex flex-wrap gap-1">
              <Tags
                tags={manga.tags}
                contentRating={manga.contentRating}
                status={manga.status}
              />
            </div>

            {/* <ReactMarkdown
              className="hidden md:flex flex-col select-none text-sm py-1 max-h-[50%] overflow-auto"
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
              components={{
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {children}
                  </a>
                ),
                table: ({ children }) => (
                  <table className="table-auto border-collapse border border-secondary rounded-md w-fit">
                    {children}
                  </table>
                ),
                thead: ({ children }) => (
                  <thead className="border-b border-secondary">
                    {children}
                  </thead>
                ),
                tr: ({ children }) => (
                  <tr className="even:bg-secondary">{children}</tr>
                ),
                th: ({ children }) => (
                  <th className="px-2 py-1 text-left">{children}</th>
                ),
                td: ({ children }) => <td className="px-2 py-1">{children}</td>,
              }}
            >
              {manga.description.content}
            </ReactMarkdown> */}
          </div>

          <p className="text-base md:text-lg italic font-medium line-clamp-1 max-w-[80%]">
            {[
              ...new Set([
                ...manga.author.map((a: Author) => a.name),
                ...manga.artist.map((a: Artist) => a.name),
              ]),
            ].join(", ")}
          </p>
        </div>
      </div>
    </>
  );
}

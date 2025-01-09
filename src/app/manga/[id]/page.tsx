import Banner from "@/components/Manga/background";
import MangaCover from "@/components/Manga/manga-cover";
import { MangaStatsComponent } from "@/components/Manga/manga-stats";
import { RatingChart } from "@/components/Manga/rating-chart";
import { siteConfig } from "@/config/site";
import { fetchMangaDetail } from "@/lib/mangadex/manga";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

interface pageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata(props: pageProps): Promise<Metadata> {
  const params = await props.params;
  const { id } = params;
  try {
    const mangaDetails = await fetchMangaDetail(id);

    return {
      title: `${mangaDetails.title} - SuicaoDex`,
      description: mangaDetails.description
        ? mangaDetails.description
        : `Đọc truyện ${mangaDetails.title} - SuicaoDex`,
      keywords: [
        `Manga`,
        `${mangaDetails.title}`,
        "SuicaoDex",
        `${mangaDetails.altTitle}`,
      ],

      openGraph: {
        title: `${mangaDetails.title} - SuicaoDex`,
        siteName: "SuicaoDex",
        description: mangaDetails.description
          ? mangaDetails.description
          : `Đọc truyện ${mangaDetails.title} - SuicaoDex`,
        images: `${siteConfig.mangadexAPI.ogURL}/manga/${mangaDetails.id}`,
      },
    };
  } catch (error) {
    return {
      title: "404 Not Found",
    };
  }
}

export default async function Page(props: pageProps) {
  const params = await props.params;
  const { id } = params;
  const manga = await fetchMangaDetail(id);

  return (
    <>
      <Banner id={id} src={manga.cover} />

      {/* mobile */}
      <div className="flex flex-row gap-4 px-4 mt-2 md:hidden">
        <MangaCover
          id={manga.id}
          cover={manga.cover}
          alt={manga.title}
          //placeholder="/doro_think.webp"
          loading="lazy"
          className="max-w-[130px]"
          //priority
        />
        <div className="flex flex-col gap-2 justify-between">
          <div className="flex flex-col gap-1.5">
            <p className={cn("drop-shadow-md font-bold", "text-2xl leading-7")}>
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
          {/* {!!manga.stats && <RatingChart stats={manga.stats} />} */}
        </div>
      </div>

      {/* desktop */}
      <div className="hidden md:flex px-4 mt-2 gap-4">
        <MangaCover
          id={manga.id}
          cover={manga.cover}
          alt={manga.title}
          //placeholder="/doro_think.webp"
          loading="lazy"
          className="min-w-[200px]"
          //priority
        />
        <div className="flex flex-col gap-2 justify-start">
          <p
            className={cn(
              "drop-shadow-md font-bold",
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
          {!!manga.stats && <MangaStatsComponent stats={manga.stats} />}
        </div>
      </div>
    </>
  );
}

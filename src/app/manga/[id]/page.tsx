import MangaDetails from "@/components/Pages/manga-details";
import { siteConfig } from "@/config/site";
import { fetchMangaDetail } from "@/lib/mangadex/manga";
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
      description: mangaDetails.description.content
        ? mangaDetails.description.content
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
        description: mangaDetails.description.content
          ? mangaDetails.description.content
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

  return <MangaDetails manga={manga} />;
}

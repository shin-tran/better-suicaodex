import axiosInstance from "../axios";
import { TagsParser } from "./tag";
import { AuthorParser } from "./author";
import { ArtistParser } from "./artist";
import { Chapter, Manga, MangasStats, MangaStats } from "@/types/types";
import { ChaptersParser } from "./chapter";
import { siteConfig } from "@/config/site";

export function MangaParser(data: any): Manga {
  // const titleVi = data.attributes.altTitles.find((item: any) => item.vi)?.vi;
  // let title = titleVi
  //   ? titleVi
  //   : data.attributes.title[Object.keys(data.attributes.title)[0]];

  // if (!title) {
  //   title = data.attributes.altTitles.find((item: any) => item.en)?.en;
  // }

  // const altTitle =
  //   data.attributes.title.en ||
  //   data.attributes.altTitles.find((item: any) => item.en)?.en ||
  //   data.attributes.altTitles.find((item: any) => item.ja)?.ja ||
  //   null;

  const altTitles = data.attributes.altTitles;
  const titles = data.attributes.title;

  const enTitles = [
    ...(titles.en ? [titles.en] : []),
    ...altTitles.filter((t: any) => t.en).map((t: any) => t.en!),
  ];
  const viTitle = altTitles.find((t: any) => t.vi)?.vi || undefined;
  const jaTitle = altTitles.find((t: any) => t.ja)?.ja || undefined;

  const title = viTitle || enTitles[0] || jaTitle;
  let altTitle: string | null = null;
  if (title == viTitle) {
    altTitle = enTitles[0] || jaTitle || null;
  } else if (title == enTitles[0]) {
    altTitle = enTitles[1] || jaTitle || null;
  } else if (title == jaTitle) {
    altTitle = null;
  }

  const language = data.attributes.availableTranslatedLanguages;
  const description: { language: "vi" | "en"; content: string } = data
    .attributes.description.vi
    ? {
        language: "vi",
        content: data.attributes.description.vi,
      }
    : {
        language: "en",
        content: data.attributes.description.en,
      };

  const coverArt = data.relationships.find(
    (item: any) => item.type === "cover_art"
  );
  const author = AuthorParser(data.relationships);
  const artist = ArtistParser(data.relationships);
  const contentRating = data.attributes.contentRating;
  const status = data.attributes.status;
  return {
    id: data.id,
    title: title,
    language: language,
    altTitle: altTitle,
    tags: TagsParser(data.attributes.tags),
    cover: coverArt ? coverArt.attributes.fileName : null,
    author: author,
    artist: artist,
    description: description,
    contentRating: contentRating,
    status: status,
    raw:
      data.attributes.links && data.attributes.links.raw
        ? data.attributes.links.raw
        : null,
    finalChapter: data.attributes.lastChapter
      ? data.attributes.lastChapter
      : null,
  };
}

export function MangaStatsParser(data: any, id: string): MangaStats {
  const distribution = data.statistics[id].rating.distribution;

  // Find the max value in the distribution
  const max = Math.max(...(Object.values(distribution) as number[]));

  return {
    rating: {
      bayesian: data.statistics[id].rating.bayesian,
      distribution: {
        "1": distribution["1"],
        "2": distribution["2"],
        "3": distribution["3"],
        "4": distribution["4"],
        "5": distribution["5"],
        "6": distribution["6"],
        "7": distribution["7"],
        "8": distribution["8"],
        "9": distribution["9"],
        "10": distribution["10"],
      },
      max: max,
    },
    follows: data.statistics[id].follows,
    comments: data.statistics[id].comments
      ? data.statistics[id].comments.repliesCount
      : 0,
  };
}

export async function fetchMangaDetail(id: string): Promise<Manga> {
  const [mangaResponse, stats] = await Promise.all([
    axiosInstance.get(`/manga/${id}?`, {
      params: {
        includes: ["author", "artist", "cover_art"],
      },
    }),
    getMangaStats(id),
  ]);

  const manga = MangaParser(mangaResponse.data.data);
  manga.stats = stats;

  return manga;
}

export async function getMangaStats(id: string): Promise<MangaStats> {
  const { data } = await axiosInstance.get(`/statistics/manga/${id}`);
  return MangaStatsParser(data, id);
}

export async function getMangasStats(ids: string[]): Promise<MangasStats[]> {
  const { data } = await axiosInstance.get(`/statistics/manga?`, {
    params: {
      manga: ids,
    },
  });
  return ids.map((id: any) => MangasStatsParser(data, id));
}

export function MangasStatsParser(data: any, id: string): MangasStats {
  return {
    rating: {
      bayesian: data.statistics[id].rating.bayesian,
    },
    follows: data.statistics[id].follows,
    comments: data.statistics[id].comments
      ? data.statistics[id].comments.repliesCount
      : 0,
  };
}

export async function getFirstChapter(
  id: string,
  r18: boolean
): Promise<{
  en: string;
  vi: string;
}> {
  const params = {
    limit: 1,
    contentRating: r18
      ? ["safe", "suggestive", "erotica", "pornographic"]
      : ["safe", "suggestive", "erotica"],
    order: {
      volume: "asc",
      chapter: "asc",
    },
  };
  const { data: en } = await axiosInstance.get(`/manga/${id}/feed`, {
    params: {
      ...params,
      translatedLanguage: ["en"],
    },
  });
  const { data: vi } = await axiosInstance.get(`/manga/${id}/feed`, {
    params: {
      ...params,
      translatedLanguage: ["vi"],
    },
  });

  return {
    en: en.data[0]?.id,
    vi: vi.data[0]?.id,
  };
}

export async function FirstViChapter(
  id: string,
  r18: boolean
): Promise<Chapter> {
  const { data } = await axiosInstance.get(`/manga/${id}/feed`, {
    params: {
      limit: 1,
      contentRating: r18
        ? ["safe", "suggestive", "erotica", "pornographic"]
        : ["safe", "suggestive", "erotica"],
      order: {
        volume: "asc",
        chapter: "asc",
      },
      translatedLanguage: ["vi"],
      includes: ["scanlation_group", "manga"],
    },
  });
  return ChaptersParser(data.data)[0];
}

export async function FirstEnChapter(
  id: string,
  r18: boolean
): Promise<Chapter> {
  const { data } = await axiosInstance.get(`/manga/${id}/feed`, {
    params: {
      limit: 1,
      contentRating: r18
        ? ["safe", "suggestive", "erotica", "pornographic"]
        : ["safe", "suggestive", "erotica"],
      order: {
        volume: "asc",
        chapter: "asc",
      },
      translatedLanguage: ["en"],
      includes: ["scanlation_group", "manga"],
    },
  });
  return ChaptersParser(data.data)[0];
}

export async function SearchManga(
  query: string,
  r18: boolean
): Promise<Manga[]> {
  const { data } = await axiosInstance.get("/manga?", {
    params: {
      limit: 20,
      title: query,
      contentRating: r18
        ? ["safe", "suggestive", "erotica", "pornographic"]
        : ["safe", "suggestive", "erotica"],
      includes: ["author", "artist", "cover_art"],
      order: {
        relevance: "desc",
      },
    },
  });
  const mangas = data.data.map((item: any) => MangaParser(item));
  if (mangas.length === 0) return [];

  const stats = await getMangasStats(mangas.map((manga: Manga) => manga.id));

  return mangas.map((manga: Manga, index: number) => ({
    ...manga,
    stats: stats[index],
  }));
}

export async function getPopularMangas(
  language: ("vi" | "en")[],
  r18: boolean
): Promise<Manga[]> {
  const { data } = await axiosInstance.get(`/manga?`, {
    params: {
      limit: 10,
      includes: ["cover_art", "author", "artist"],
      contentRating: r18
        ? ["safe", "suggestive", "erotica", "pornographic"]
        : ["safe", "suggestive", "erotica"],
      hasAvailableChapters: "true",
      availableTranslatedLanguage: language,
      order: {
        followedCount: "desc",
      },
      createdAtSince: new Date(new Date().setDate(new Date().getDate() - 30))
        .toISOString()
        .slice(0, 19),
    },
  });

  return data.data.map((item: any) => MangaParser(item));
}

export async function getRecentlyMangas(
  limit: number,
  language: ("vi" | "en")[],
  r18: boolean
): Promise<Manga[]> {
  const { data } = await axiosInstance.get(`/manga?`, {
    params: {
      limit: limit,
      includes: ["cover_art", "author", "artist"],
      availableTranslatedLanguage: language,
      contentRating: r18
        ? ["safe", "suggestive", "erotica", "pornographic"]
        : ["safe", "suggestive", "erotica"],
      order: {
        createdAt: "desc",
      },
    },
  });

  return data.data.map((item: any) => MangaParser(item));
}

export async function getTopFollowedMangas(
  language: ("vi" | "en")[],
  r18: boolean
): Promise<Manga[]> {
  const params: any = {
    limit: 10,
    includes: ["cover_art", "author", "artist"],
    availableTranslatedLanguage: language,
    hasAvailableChapters: "true",
    contentRating: r18
      ? ["safe", "suggestive", "erotica", "pornographic"]
      : ["safe", "suggestive", "erotica"],
    order: {
      followedCount: "desc",
    },
  };

  const { data } = await axiosInstance.get(`/manga?`, { params });

  const mangas = data.data.map((item: any) => MangaParser(item));
  const stats = await getMangasStats(mangas.map((manga: Manga) => manga.id));

  return mangas.map((manga: Manga, index: number) => ({
    ...manga,
    stats: stats[index],
  }));
}

export async function getTopRatedMangas(
  language: ("vi" | "en")[],
  r18: boolean
): Promise<Manga[]> {
  const { data } = await axiosInstance.get(`/manga?`, {
    params: {
      limit: 10,
      includes: ["cover_art", "author", "artist"],
      hasAvailableChapters: "true",
      availableTranslatedLanguage: language,
      contentRating: r18
        ? ["safe", "suggestive", "erotica", "pornographic"]
        : ["safe", "suggestive", "erotica"],
      order: {
        rating: "desc",
      },
    },
  });

  const mangas = data.data.map((item: any) => MangaParser(item));
  const stats = await getMangasStats(mangas.map((manga: Manga) => manga.id));

  return mangas.map((manga: Manga, index: number) => ({
    ...manga,
    stats: stats[index],
  }));
}

export async function getStaffPickMangas(r18: boolean): Promise<Manga[]> {
  const StaffPickID = await axiosInstance
    .get(`/list/${siteConfig.mangadexAPI.staffPickList}`)
    .then((res) =>
      res.data.data.relationships
        .filter((item: any) => item.type === "manga")
        .map((item: any) => item.id)
    );

  const { data } = await axiosInstance.get(`/manga?`, {
    params: {
      limit: 32,
      includes: ["cover_art", "author", "artist"],
      // hasAvailableChapters: "true",
      // availableTranslatedLanguage: ["vi"],
      contentRating: r18
        ? ["safe", "suggestive", "erotica"]
        : ["safe", "suggestive", "erotica", "pornographic"],
      ids: StaffPickID,
      order: {
        rating: "desc",
      },
    },
  });

  return data.data.map((item: any) => MangaParser(item));
}

export async function getCompletedMangas(
  language: ("vi" | "en")[],
  r18: boolean
): Promise<Manga[]> {
  const { data } = await axiosInstance.get(`/manga?`, {
    params: {
      limit: 32,
      includes: ["cover_art", "author", "artist"],
      hasAvailableChapters: "true",
      availableTranslatedLanguage: language,
      contentRating: r18
        ? ["safe", "suggestive", "erotica", "pornographic"]
        : ["safe", "suggestive", "erotica"],
      status: ["completed"],
    },
  });

  return data.data.map((item: any) => MangaParser(item));
}

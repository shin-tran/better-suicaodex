import axiosInstance from "../axios";
import { TagsParser } from "./tag";
import { AuthorParser } from "./author";
import { ArtistParser } from "./artist";
import { Manga, MangaStats } from "@/types/types";

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
    description: data.attributes.description.vi
      ? data.attributes.description.vi
      : data.attributes.description.en,
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
  const [mangaResponse, stats, chapters] = await Promise.all([
    axiosInstance.get(`/manga/${id}?`, {
      params: {
        includes: ["author", "artist", "cover_art"],
      },
    }),
    getMangaStats(id),
    getFirstAndLatestChapter(id),
  ]);

  const manga = MangaParser(mangaResponse.data.data);
  manga.stats = stats;

  const [firstChapter, latestChapter] = chapters;
  if (!!firstChapter && !!latestChapter) {
    manga.firstChapter = firstChapter;
    manga.latestChapter = latestChapter;
  }

  return manga;
}

export async function getMangaStats(id: string): Promise<MangaStats> {
  const { data } = await axiosInstance.get(`/statistics/manga/${id}`);
  return MangaStatsParser(data, id);
}

export async function getFirstAndLatestChapter(id: string): Promise<string[]> {
  const params = {
    limit: 1,
    translatedLanguage: ["vi"],
    contentRating: ["safe", "suggestive", "erotica", "pornographic"],
  };
  const { data } = await axiosInstance.get(`/manga/${id}/feed`, {
    params: {
      ...params,
      order: {
        volume: "asc",
        chapter: "asc",
      },
    },
  });

  if (data.data.length === 0) return [];

  const firstChapter = data.data[0].id;

  const { data: data2 } = await axiosInstance.get(`/manga/${id}/feed`, {
    params: {
      ...params,
      order: {
        volume: "desc",
        chapter: "desc",
      },
    },
  });

  const latestChapter = data2.data[0].id;
  return [firstChapter, latestChapter];
}

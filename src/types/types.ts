export type Tag = {
  id: string;
  name: string;
};

export type Author = {
  id: string;
  name: string;
};

export type Artist = {
  id: string;
  name: string;
};

export type ContentRating = "safe" | "suggestive" | "erotica" | "pornographic";
export type Status = "ongoing" | "completed" | "cancelled" | "hiatus";

export type Manga = {
  id: string;
  title: string;
  altTitle: string;
  tags: Tag[];
  cover: string;
  author: Author[];
  artist: Artist[];
  language: string[];
  description: string;
  contentRating: ContentRating;
  status: Status;
  raw?: string;
  firstChapter?: string;
  finalChapter?: string;
  latestChapter?: string;
  stats?: MangaStats;
};

export type MangaStats = {
  rating: {
    bayesian: number;
    distribution: {
      "1": number;
      "2": number;
      "3": number;
      "4": number;
      "5": number;
      "6": number;
      "7": number;
      "8": number;
      "9": number;
      "10": number;
    };
    max: number;
  };
  follows: number;
  comments?: number;
};

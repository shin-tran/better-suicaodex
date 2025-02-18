import { Manga } from "@/types/types";
import axiosInstance from "../axios";
import { MangaParser } from "./manga";

export async function getRandomManga(r18: boolean): Promise<Manga> {
  const { data } = await axiosInstance.get(`/manga/random?`, {
    params: {
      includes: ["cover_art", "author", "artist"],
      contentRating: r18
        ? ["safe", "suggestive", "erotica", "pornographic"]
        : ["safe", "suggestive", "erotica"],
    },
  });

  return MangaParser(data.data);
}

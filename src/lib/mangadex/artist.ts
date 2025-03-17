import { Artist } from "@/types/types";
import axiosInstance from "../axios";
/* eslint-disable  @typescript-eslint/no-explicit-any */

export function ArtistParser(data: any): Artist[] {
  const artists = data.filter((item: any) => item.type === "artist");
  if (!artists) return [];
  return artists.map((item: any) => {
    return {
      id: item.id,
      name: item.attributes.name,
    };
  });
}

export async function SearchArtist(artist: string): Promise<Artist[]> {
  if (artist.length === 0) return [];
  const { data } = await axiosInstance.get(`/author?name=${artist}`);

  return data.data.map((item: any) => {
    return {
      id: item.id,
      name: item.attributes.name,
    };
  });
}

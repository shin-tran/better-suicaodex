import { Author, AuthorDetail } from "@/types/types";
import axiosInstance from "../axios";

export function AuthorParser(data: any[]): Author[] {
  const authors = data.filter((item: any) => item.type === "author");
  if (!authors) return [];
  return authors.map((item: any) => {
    return {
      id: item.id,
      name: item.attributes?.name || 'Unknown Author'
    };
  });
}

export async function SearchAuthor(author: string): Promise<Author[]> {
  if (author.length === 0) return [];
  const { data } = await axiosInstance.get(`/author?name=${author}`);

  return data.data.map((item: any) => {
    return {
      id: item.id,
      name: item.attributes?.name || 'Unknown Author',
    };
  });
}

export async function SearchAuthorByIds(ids: string[]): Promise<Author[]> {
  if (ids.length === 0) return [];
  try {
    const { data } = await axiosInstance.get(`/author?`, {
      params: {
        limit: ids.length,
        ids: ids,
      },
    });

    return data.data.map((item: any) => {
      return {
        id: item.id,
        name: item.attributes?.name || 'Unknown Author',
      };
    });
  } catch (error) {
    return [];
  }
}

export async function GetAuthor(id: string): Promise<AuthorDetail> {
  const { data } = await axiosInstance.get(`/author/${id}`);
  const attributes = data.data.attributes;
  return {
    id: data.data.id,
    name: attributes.name || 'Unknown Author',
    imageUrl: attributes.imageUrl || null,
    bio: attributes.biography.vi ? attributes.biography.vi : attributes.biography.en || null,
    social: {
      twitter: attributes.twitter || null,
      pixiv: attributes.pixiv || null,
      melonBook: attributes.melonBook || null,
      fanBox: attributes.fanBox || null,
      booth: attributes.booth || null,
      namicomi: attributes.namicomi || null,
      nicoVideo: attributes.nicoVideo || null,
      skeb: attributes.skeb || null,
      fantia: attributes.fantia || null,
      tumblr: attributes.tumblr || null,
      youtube: attributes.youtube || null,
      weibo: attributes.weibo || null,
      naver: attributes.naver || null,
      website: attributes.website || null,
    },
    mangas: data.data.relationships
    .filter((rel: any) => rel.type === "manga")
    .map((rel: any) => rel.id),
  };
}

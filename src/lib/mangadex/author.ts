import { Author } from "@/types/types";
import axiosInstance from "../axios";
/* eslint-disable  @typescript-eslint/no-explicit-any */

export function AuthorParser(data: any[]): Author[] {
  const authors = data.filter((item: any) => item.type === "author");
  if (!authors) return [];
  return authors.map((item: any) => {
    return {
      id: item.id,
      name: item.attributes.name,
    };
  });
}

export async function SearchAuthor(author: string): Promise<Author[]> {
  if (author.length === 0) return [];
  const { data } = await axiosInstance.get(`/author?name=${author}`);

  return data.data.map((item: any) => {
    return {
      id: item.id,
      name: item.attributes.name,
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
        name: item.attributes.name,
      };
    });
  } catch (error) {
    return [];
  }
}

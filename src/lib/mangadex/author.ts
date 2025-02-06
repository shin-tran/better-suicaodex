import { Author } from "@/types/types";
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

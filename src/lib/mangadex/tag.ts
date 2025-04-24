import { Tag } from "@/types/types";
import { axiosWithProxyFallback } from "../axios";

export function TagsParser(data: any[]): Tag[] {
  return data.map((item) => {
    return {
      id: item.id,
      name: item.attributes.name.en,
    };
  });
}

export async function getTags(): Promise<Tag[]> {
  const data = await axiosWithProxyFallback({
    url: "/manga/tag",
    method: "get",
  });
  return TagsParser(data.data);
}
import { Tag } from "@/types/types";
import axiosInstance from "../axios";

export function TagsParser(data: any[]): Tag[] {
  return data.map((item) => {
    return {
      id: item.id,
      name: item.attributes.name.en,
    };
  });
}

export async function getTags(): Promise<Tag[]> {
  const { data } = await axiosInstance.get("/manga/tag");
  return TagsParser(data.data);
}
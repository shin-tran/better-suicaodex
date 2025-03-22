import { Cover } from "@/types/types";
import axiosInstance from "../axios";

export function CoverParser(data: any): Cover {
  return {
    id: data.id,
    description: data.attributes.description,
    volume: data.attributes.volume,
    fileName: data.attributes.fileName,
    locale: data.attributes.locale,
  };
}

export async function getCovers(m_ids: string[]): Promise<Cover[]> {
  if (m_ids.length === 0) return [];

  const LIMIT = 100;
  let offset = 0;
  let totalResults: Cover[] = [];
  let hasMore = true;

  while (hasMore) {
    const data = await axiosInstance.get(`/cover?`, {
      params: {
        limit: LIMIT,
        offset: offset,
        manga: m_ids,
        order: {
          volume: "asc",
        },
      },
    });
    
    const total = data.data.total;
    const currentResults = data.data.data.map((item: any) => CoverParser(item));
    totalResults = [...totalResults, ...currentResults];
    
    offset += LIMIT;
    // Kiểm tra xem đã lấy đủ dữ liệu chưa
    hasMore = offset < total;
  }

  return totalResults;
}

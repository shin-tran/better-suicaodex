"use client";

import { useConfig } from "@/hooks/use-config";
import { getMangasByTag } from "@/lib/mangadex/tag";
import useSWR from "swr";
import ResultTabs from "@/components/Search/Result/result-tabs";

interface TagPageProps {
  id: string;
  page: number;
}

export default function TagPage({ id, page }: TagPageProps) {
  const offset = (page - 1) * 32;
  const [config] = useConfig();
  const { data, error, isLoading } = useSWR(
    ["tag", id, 32, offset, config.translatedLanguage, config.r18],
    ([, id, limit, offset, language, r18]) =>
      getMangasByTag(id, limit, offset, language, r18)
  );

  return (
    <ResultTabs mangas={data?.mangas} isError={error} isLoading={isLoading} />
  );
}

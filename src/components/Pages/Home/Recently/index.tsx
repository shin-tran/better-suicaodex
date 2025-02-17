"use client";

import { Button } from "@/components/ui/button";
import { useConfig } from "@/hooks/use-config";
import { getRecentlyMangas } from "@/lib/mangadex/manga";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import RecentlyCard from "./recently-card";

export default function RecentlyAdded() {
  const [config] = useConfig();
  const { data, error, isLoading } = useSWR(
    ["recently", 18, config.translatedLanguage, config.r18],
    ([, limit, language, r18]) => getRecentlyMangas(limit, language, r18),
    {
      refreshInterval: 1000 * 60 * 10,
    }
  );

  if (isLoading)
    return (
      <div className="flex flex-col">
        <hr className="w-9 h-1 bg-primary border-none" />
        <h1 className="text-2xl font-black uppercase">Truyện mới đăng</h1>

        {/* <div className="grid grid-cols-1 gap-3 mt-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <LatestSkeleton key={index} />
            ))}
          </div> */}

        <p>Loading...</p>
      </div>
    );

  if (error || !data) return null;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div>
          <hr className="w-9 h-1 bg-primary border-none" />
          <h1 className="text-2xl font-black uppercase">Truyện mới đăng</h1>
        </div>

        <Button asChild size="icon" variant="ghost" className="[&_svg]:size-6">
          <Link href={`/recent`}>
            <ArrowRight />
          </Link>
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
        {data.map((manga) => (
          <Link key={manga.id} href={`/manga/${manga.id}`}>
            <RecentlyCard manga={manga} />
          </Link>
        ))}
      </div>
    </div>
  );
}

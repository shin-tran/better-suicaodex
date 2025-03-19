"use client";

import { Manga } from "@/types/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, List, Loader2, StretchHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import RecentlyCard from "@/components/Pages/Home/Recently/recently-card";
import Link from "next/link";

interface ResultTabProps {
  isError: any;
  isLoading: any;
  mangas?: Manga[];
}

export default function ResultTabs({
  mangas,
  isError,
  isLoading,
}: ResultTabProps) {
  if (isLoading || !mangas) {
    return (
      <DefaultTabs>
        <div className="mt-20">
          <Loader2 className="animate-spin" size={40} />
        </div>
      </DefaultTabs>
    );
  }

  if (isError) {
    return (
      <DefaultTabs>
        <Card className="rounded-sm justify-center items-center flex h-16 w-full">
          Lỗi mất rồi 😭
        </Card>
      </DefaultTabs>
    );
  }

  if (mangas.length === 0) {
    return (
      <DefaultTabs>
        <Card className="rounded-sm justify-center items-center flex h-16 w-full">
          <p className="italic">Không có kết quả!</p>
        </Card>
      </DefaultTabs>
    );
  }

  const detailView = (
    <div>bố mày</div>
  );

  const semiView = (
    <div>mẹ mày</div>
  );

  const coverView = (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
    {mangas.map((manga) => (
      <Link key={manga.id} href={`/manga/${manga.id}`}>
        <RecentlyCard manga={manga} />
      </Link>
    ))}
  </div>
  );

  return (
    <DefaultTabs
      detailView={detailView}
      semiView={semiView}
      coverView={coverView}
    />
  );
}

interface DefaultTabsProps {
  children?: React.ReactNode;
  detailView?: React.ReactNode;
  semiView?: React.ReactNode;
  coverView?: React.ReactNode;
}

function DefaultTabs({ children, detailView, semiView, coverView }: DefaultTabsProps) {
  const tabValues = [
    { value: "detail", icon: <List /> },
    { value: "semi", icon: <LayoutGrid /> },
    { value: "cover", icon: <StretchHorizontal /> },
  ];

  return (
    <Tabs defaultValue="detail" className="w-full justify-items-end">
      <TabsList className="rounded-sm gap-1.5 h-10">
        {tabValues.map((tab) => (
          <TabsTrigger key={tab.value} className="rounded-sm" value={tab.value}>
            {tab.icon}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent
        className="w-full justify-items-center"
        value="detail"
      >
        {detailView || children}
      </TabsContent>
      <TabsContent
        className="w-full justify-items-center"
        value="semi"
      >
        {semiView || children}
      </TabsContent>
      <TabsContent
        className="w-full justify-items-center"
        value="cover"
      >
        {coverView || children}
      </TabsContent>
    </Tabs>
  );
}

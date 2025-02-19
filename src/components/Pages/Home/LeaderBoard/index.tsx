"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopFollowed from "./TopFollowed";
import TopRated from "./TopRated";
import { Bookmark, ChevronsDown, ChevronsUp, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function LeaderBoard() {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <div className="flex flex-col">
      <hr className="w-9 h-1 bg-primary border-none" />
      <h1 className="text-2xl font-black uppercase">Bảng xếp hạng</h1>

      <Tabs
        defaultValue="follow"
        className={cn(
          "mt-4",
          "overflow-hidden transition-all duration-500 ease-in-out"
        )}
        style={{
          maxHeight: expanded ? "2000px" : "700px",
          opacity: expanded ? 1 : 0.95,
          //   maskImage: expanded
          //     ? "none"
          //     : "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          WebkitMaskImage: expanded
            ? "none"
            : "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
        }}
      >
        <TabsList className="rounded-sm w-full ">
          <TabsTrigger value="follow" className="rounded-sm w-full flex gap-1">
            <Bookmark size={20} />
            Lượt theo dõi
          </TabsTrigger>
          <TabsTrigger value="rating" className="rounded-sm w-full flex gap-1">
            <Star size={20} />
            Điểm đánh giá
          </TabsTrigger>
        </TabsList>
        <TabsContent value="follow">
          <TopFollowed />
        </TabsContent>
        <TabsContent value="rating">
          <TopRated />
        </TabsContent>
      </Tabs>

      <div
        className={cn(
          "flex justify-center w-full h-full transition-[border-color]",
          expanded ? "border-transparent" : "border-primary"
        )}
      >
        <Button
          size="sm"
          className="h-4 px-1 rounded-sm hover:animate-bounce"
          onClick={toggleExpanded}
          variant={expanded ? "secondary" : "default"}
        >
          {expanded ? (
            <>
              <ChevronsUp />
              thu gọn
              <ChevronsUp />
            </>
          ) : (
            <>
              <ChevronsDown />
              xem thêm
              <ChevronsDown />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

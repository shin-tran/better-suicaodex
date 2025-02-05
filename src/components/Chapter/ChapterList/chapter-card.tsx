import { ChapterGroup } from "@/types/types";
import { Card, CardContent } from "../../ui/card";
import { MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChapterCardProps {
  chapters: ChapterGroup;
  finalChapter?: string;
}

export const ChapterCard = ({ chapters, finalChapter }: ChapterCardProps) => {
  if (chapters.group.length > 1) return <p> 2 con mẹ mày</p>;

  return (
    <Card className="rounded-none px-2 py-1.5 justify-evenly shadow-sm">
      <div className="flex justify-between">
        <p className="font-semibold text-sm md:text-base line-clamp-1">
          {chapters.chapter
            ? `Ch. ${chapters.chapter}
          ${chapters.group[0].title ? ` - ${chapters.group[0].title}` : ""}`
            : "Oneshot"}
        </p>
        <Button
          size="sm"
          variant="ghost"
          className="rounded-sm gap-0.5 h-6 px-1"
        >
          <MessageSquare />
        </Button>
      </div>
      <div className="flex justify-between">
        <Users size={18} />
        <p className="text-sm line-clamp-1">
          {chapters.group[0].group.map((group) => group.name).join(", ")}
        </p>
      </div>
    </Card>
  );
};

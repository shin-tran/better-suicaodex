"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronsUpDown, Eraser, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { SearchAuthor } from "@/lib/mangadex/author";
import { AsyncMultiSelect } from "@/components/ui/async-multi-select";
import { SearchArtist } from "@/lib/mangadex/artist";
import { Checkbox } from "@/components/ui/checkbox";
import { getTags } from "@/lib/mangadex/tag";

interface AdvancedSearchProps {
  page: number;
  limit: number;
  q: string;
  author: string;
  content: string;
  status: string;
  demos: string;
  include: string;
  exclude: string;
}

export default function AdvancedSearch({
  page,
  limit,
  q,
  author,
  content,
  status,
  demos,
  include,
  exclude,
}: AdvancedSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedDemos, setSelectedDemos] = useState<string[]>([]);
  const [selectedContent, setSelectedContent] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagOptions, setTagOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [hasAvailableChapter, setHasAvailableChapter] = useState(false);

  const statusList = [
    { value: "completed", label: "Đã hoàn thành" },
    { value: "ongoing", label: "Đang tiến hành" },
    { value: "hiatus", label: "Tạm ngừng" },
    { value: "cancelled", label: "Đã hủy" },
  ];

  const demosList = [
    { value: "shounen", label: "Shounen" },
    { value: "shoujo", label: "Shoujo" },
    { value: "seinen", label: "Seinen" },
    { value: "jousei", label: "Jousei" },
    { value: "none", label: "None" },
  ];

  const contentList = [
    { value: "safe", label: "Lành mạnh" },
    { value: "suggestive", label: "Hơi hơi" },
    { value: "erotica", label: "Cũng tạm" },
    { value: "pornographic", label: "Segggg!" },
  ];

  const languageList = [
    { value: "vi", label: "Tiếng Việt" },
    { value: "en", label: "Tiếng Anh" },
  ];

  const tagsList = async () => {
    const data = await getTags();
    return data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  };
  useEffect(() => {
    tagsList().then((data) => setTagOptions(data));
  }, []);

  const authorOptions = async (name: string) => {
    const data = await SearchAuthor(name);
    return data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  };

  const artistOptions = async (name: string) => {
    const data = await SearchArtist(name);
    return data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  };

  return (
    <>
      <div>
        <hr className="w-9 h-1 bg-primary border-none" />
        <h1 className="text-2xl font-black uppercase">Tìm kiếm nâng cao</h1>
      </div>

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="mt-4 w-full"
      >
        <div className="grid gap-2 md:grid-cols-[1fr_12rem]">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2" />
            <Input
              className="bg-secondary pl-7"
              placeholder="Nhập từ khóa..."
              autoComplete="off"
            />
          </div>
          <CollapsibleTrigger asChild>
            <Button
              variant={isOpen ? "secondary" : "default"}
              className="[&[data-state=open]>svg]:rotate-180 [&_svg]:transition-transform transition-all"
            >
              <ChevronDown />
              {isOpen ? "Ẩn bộ lọc" : "Mở bộ lọc"}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent
          className={cn(
            "mt-4 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
            "grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4"
          )}
        >
          {/* //TODO: làm lại tags */}
          <div className="flex flex-col gap-2">
            <Label>
              Thể loại
              {selectedTags.length > 0 && (
                <span className="font-light text-primary">
                  {" "}
                  +{selectedTags.length}
                </span>
              )}
            </Label>
            <MultiSelect
              className="shadow-none"
              placeholder="Mặc định"
              isCompact
              disableSearch
              disableFooter
              variant="secondary"
              options={tagOptions}
              onValueChange={setSelectedTags}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>
              Tác giả
              {selectedAuthor.length > 0 && (
                <span className="font-light text-primary">
                  {" "}
                  +{selectedAuthor.length}
                </span>
              )}
            </Label>
            <AsyncMultiSelect
              loadOptions={authorOptions}
              onValueChange={setSelectedAuthor}
              className="shadow-none"
              disableFooter
              isCompact
              showSelectedValue
              placeholder="Ai cũng được"
              noResultsMessage="Không có kết quả"
              loadingMessage="Đang tìm..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>
              Họa sĩ
              {selectedArtist.length > 0 && (
                <span className="font-light text-primary">
                  {" "}
                  +{selectedArtist.length}
                </span>
              )}
            </Label>
            <AsyncMultiSelect
              loadOptions={artistOptions}
              onValueChange={setSelectedArtist}
              className="shadow-none"
              disableFooter
              isCompact
              showSelectedValue
              placeholder="Ai cũng được"
              noResultsMessage="Không có kết quả"
              loadingMessage="Đang tìm..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>
              Tình trạng
              {selectedStatus.length > 0 && (
                <span className="font-light text-primary">
                  {" "}
                  +{selectedStatus.length}
                </span>
              )}
            </Label>
            <MultiSelect
              isCompact
              className="shadow-none"
              disableSearch
              disableFooter
              placeholder="Mặc định"
              variant="secondary"
              options={statusList}
              onValueChange={setSelectedStatus}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>
              Dành cho
              {selectedDemos.length > 0 && (
                <span className="font-light text-primary">
                  {" "}
                  +{selectedDemos.length}
                </span>
              )}
            </Label>
            <MultiSelect
              className="shadow-none"
              placeholder="Mặc định"
              isCompact
              disableSearch
              disableFooter
              variant="secondary"
              options={demosList}
              onValueChange={setSelectedDemos}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>
              Giới hạn nội dung
              {selectedContent.length > 0 && (
                <span className="font-light text-primary">
                  {" "}
                  +{selectedContent.length}
                </span>
              )}
            </Label>
            <MultiSelect
              className="shadow-none"
              placeholder="Mặc định"
              isCompact
              disableSearch
              disableFooter
              variant="secondary"
              options={contentList}
              onValueChange={setSelectedContent}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasAvailableChapter"
                onCheckedChange={() =>
                  setHasAvailableChapter(!hasAvailableChapter)
                }
              />
              <Label htmlFor="hasAvailableChapter">
                Có bản dịch?
                {selectedLanguage.length > 0 && (
                  <span className="font-light text-primary">
                    {" "}
                    +{selectedLanguage.length}
                  </span>
                )}
              </Label>
            </div>

            <MultiSelect
              disabled={!hasAvailableChapter}
              className="shadow-none"
              placeholder="Mặc định"
              isCompact
              disableSearch
              disableFooter
              variant="secondary"
              options={languageList}
              onValueChange={setSelectedLanguage}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex flex-row justify-end gap-2">
        <Button variant="secondary">
          <Eraser />
          Đặt lại
        </Button>
        <Button>
          <Search />
          Tìm kiếm
        </Button>
      </div>
    </>
  );
}

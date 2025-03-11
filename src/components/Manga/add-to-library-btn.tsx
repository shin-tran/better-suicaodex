"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";
import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";
import { Manga } from "@/types/types";
import { Bell, ListPlus } from "lucide-react";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddToLibraryBtnProps {
  isMobile: boolean;
  manga: Manga;
}

export default function AddToLibraryBtn({
  isMobile,
  manga,
}: AddToLibraryBtnProps) {
  const [config, setConfig] = useConfig();
  const [loaded, setLoaded] = useState(false);
  const src = `${siteConfig.suicaodex.apiURL}/covers/${manga.id}/${manga.cover}.512.jpg`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={isMobile ? "icon" : "lg"}
          className={cn("rounded-sm", isMobile && "grow-0")}
        >
          <ListPlus />
          {!isMobile && "Thêm vào thư viện"}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "max-w-[800px] max-h-[calc(100vh-3rem)]",
          `theme-${config.theme}`
        )}
      >
        <DialogHeader>
          <DialogTitle>Thêm vào thư viện</DialogTitle>
          <DialogDescription className="hidden">mẹ mày béo</DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-4">
          <LazyLoadImage
            wrapperClassName={cn(
              "!block rounded-sm object-cover max-w-[250px] w-full h-auto",
              !loaded && "aspect-[5/7]"
            )}
            placeholderSrc="/images/xidoco.webp"
            className={cn(
              "h-auto w-full rounded-sm block object-cover shadow-md aspect-[5/7]"
            )}
            src={src}
            alt={`Ảnh bìa ${manga.title}`}
            onLoad={() => setLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = "/images/xidoco.webp";
            }}
          />

          <div className="flex flex-col gap-4">
            <p className="font-bold text-2xl line-clamp-2">{manga.title}</p>
            <div className="flex flex-row gap-2 w-full">
              <Select>
                <SelectTrigger className={`theme-${config.theme}`} autoFocus={false}>
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Không</SelectItem>
                  <SelectItem value="following">Theo dõi</SelectItem>
                  <SelectItem value="reading">Đang đọc</SelectItem>
                  <SelectItem value="plan">Để dành đọc sau</SelectItem>
                  <SelectItem value="completed">Đã đọc xong</SelectItem>
                </SelectContent>
              </Select>

              <Button size="icon" variant="outline" className="shrink-0">
                <Bell />
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="justify-end flex flex-row gap-2s">
          <Button variant="outline">Hủy</Button>
          <Button>Cập nhật</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

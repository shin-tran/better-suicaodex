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
import {
  Bell,
  BellMinus,
  BellOff,
  BellRing,
  CircleHelp,
  ListPlus,
} from "lucide-react";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface AddToLibraryBtnProps {
  isMobile: boolean;
  manga: Manga;
}

export default function AddToLibraryBtn({
  isMobile,
  manga,
}: AddToLibraryBtnProps) {
  const [config] = useConfig();
  const [loaded, setLoaded] = useState(false);

  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [value, setValue] = useState("following");

  const src = `${siteConfig.suicaodex.apiURL}/covers/${manga.id}/${manga.cover}.512.jpg`;

  const options = [
    { value: "none", label: "Không" },
    { value: "following", label: "Theo dõi" },
    { value: "reading", label: "Đang đọc" },
    { value: "plan", label: "Để dành đọc sau" },
    { value: "completed", label: "Đã đọc xong" },
  ];
  //TODO: mobile ui
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
          "sm:max-w-[800px] sm:max-h-[calc(100vh-3rem)] overflow-auto",
          `theme-${config.theme}`
        )}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Thêm vào thư viện</DialogTitle>
          <DialogDescription className="hidden">mẹ mày béo</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-row gap-4">
            <LazyLoadImage
              wrapperClassName={cn(
                "!block rounded-sm object-cover max-w-[250px] w-full h-auto",
                !loaded && "aspect-[5/7]"
              )}
              placeholderSrc="/images/xidoco.webp"
              className={cn(
                "h-auto w-full rounded-sm block object-cover shadow-md drop-shadow-md aspect-[5/7]"
              )}
              src={src}
              alt={`Ảnh bìa ${manga.title}`}
              onLoad={() => setLoaded(true)}
              onError={(e) => {
                e.currentTarget.src = "/images/xidoco.webp";
              }}
            />

            <div className="flex flex-col gap-4 w-full">
              <p className="font-bold text-2xl line-clamp-4 sm:line-clamp-2">{manga.title}</p>

              <div className="hidden sm:flex flex-row gap-2 w-full">
                <Select defaultValue={value} onValueChange={(v) => setValue(v)}>
                  <SelectTrigger className="h-10 font-semibold">
                    <SelectValue placeholder="mẹ mày" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="hover:bg-secondary"
                        disabled={option.value === value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  size="icon"
                  variant={isNotificationEnabled ? "default" : "outline"}
                  className="shrink-0 size-10 [&_svg]:size-5"
                  onClick={() => setIsNotificationEnabled((prev) => !prev)}
                >
                  {isNotificationEnabled ? (
                    <BellRing className="animate-bell-shake" />
                  ) : (
                    <BellOff />
                  )}
                </Button>
              </div>
              <Label className="hidden sm:block" htmlFor="note">Hướng dẫn:</Label>
              <div className="hidden sm:block -mt-2 text-base text-muted-foreground">
                <p>- Chọn 1 trong các danh mục trên để thêm truyện.</p>
                <p>
                  - Chọn{" "}
                  <span className="font-semibold">&quot;Không&quot;</span> để
                  xoá truyện khỏi thư viện.
                </p>
                <p>- Nhấn chuông để nhận thông báo khi có chap mới.</p>
              </div>
            </div>
          </div>

          <div className="sm:hidden flex flex-col gap-4 w-full">
            <div className="flex flex-row gap-2 w-full">
              <Select defaultValue={value} onValueChange={(v) => setValue(v)}>
                <SelectTrigger className="h-10 font-semibold">
                  <SelectValue placeholder="mẹ mày" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="hover:bg-secondary"
                      disabled={option.value === value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                size="icon"
                variant={isNotificationEnabled ? "default" : "outline"}
                className="shrink-0 size-10 [&_svg]:size-5"
                onClick={() => setIsNotificationEnabled((prev) => !prev)}
              >
                {isNotificationEnabled ? (
                  <BellRing className="animate-bell-shake" />
                ) : (
                  <BellOff />
                )}
              </Button>
            </div>
            <Label htmlFor="note">Hướng dẫn:</Label>
            <div className="-mt-2 text-base text-muted-foreground">
              <p>- Chọn 1 trong các danh mục trên để thêm truyện.</p>
              <p>
                - Chọn <span className="font-semibold">&quot;Không&quot;</span>{" "}
                để xoá truyện khỏi thư viện.
              </p>
              <p>- Nhấn chuông để nhận thông báo khi có chap mới.</p>
            </div>
          </div>
        </div>

        <DialogFooter className="justify-end flex flex-col-reverse sm:flex-row gap-2 !space-x-0">
          <DialogClose asChild>
            <Button variant="secondary" className="w-full sm:w-52">
              Hủy
            </Button>
          </DialogClose>

          <Button
            className="w-full sm:w-52"
            onClick={() => toast.info("Chức năng đang phát triển!")}
          >
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

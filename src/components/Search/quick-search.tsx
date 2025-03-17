"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowRight, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { SearchManga } from "@/lib/mangadex/manga";
import { useConfig } from "@/hooks/use-config";
import { Manga } from "@/types/types";
import CompactCard from "./Result/compact-card";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import useKeyDown from "@/hooks/use-keydown";
import { Badge } from "../ui/badge";

const formSchema = z.object({
  query: z.string().min(1),
});

// Hàm debounce để giảm số lượng call API
function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number
): (...args: Parameters<F>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: Parameters<F>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default function QuickSearch() {
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mangas, setMangas] = useState<Manga[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const [config] = useConfig();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const searchQuery = form.watch("query");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { query } = values;
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      setError(false);

      const res = await SearchManga(query, config.r18);
      setMangas(res);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  // Sử dụng useEffect và debounce để tránh gọi API liên tục khi người dùng đang gõ
  useEffect(() => {
    if (!searchQuery || searchQuery.length === 0) return;

    const debouncedSearch = debounce((query: string) => {
      form.handleSubmit(onSubmit)();
    }, 500);

    debouncedSearch(searchQuery);
  }, [searchQuery]);

  // Add effect to control body scrolling when search is expanded
  useEffect(() => {
    if (expanded) {
      // Disable scrolling on body when expanded
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when collapsed
      document.body.style.overflow = '';
    }
    
    // Cleanup function to ensure scroll is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [expanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useKeyDown({ key: "k", ctrlKey: true }, () =>{
    setExpanded(true);
    if (inputRef.current) inputRef.current.focus();
  });

  useKeyDown("Escape", () => {
    setExpanded(false);
  });

  return (
    <>
      <div
        className={cn("hidden md:flex relative grow justify-end z-10")}
        ref={containerRef}
      >
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)();
            }}
            className="w-full"
          >
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem className="flex items-center w-full justify-end space-y-0">
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="Tìm kiếm..."
                      className={cn(
                        "bg-muted/50 hover:bg-accent focus:bg-background border-none h-8 shadow-sm",
                        "transition-all sm:pr-12 md:w-40 lg:w-56 xl:w-64",
                        "placeholder:text-current",
                        expanded &&
                          "!shadow-md bg-background md:!w-full lg:!w-2/3"
                      )}
                      onFocus={() => setExpanded(true)}
                      {...field}
                      ref={(e) => {
                        // Kết hợp với ref từ react-hook-form
                        field.ref(e);
                        inputRef.current = e;
                      }}
                    />
                  </FormControl>
                  {searchQuery.length === 0 ? (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2 items-center">
                      <div className={cn("hidden xl:flex flex-row gap-1",
                        expanded && "!hidden"
                      )}>
                        <Badge variant="default" className="px-1 py-0 bg-primary/10 text-secondary-foreground rounded-sm">Ctrl</Badge>
                        <Badge variant="default" className="px-1 py-0 bg-primary/10 text-secondary-foreground rounded-sm">K</Badge>
                      </div>
                      <Search className="h-4 w-4" />
                    </div>
                    
                  ) : (
                    <Button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 bg-primary rounded-sm"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault();
                        form.setValue("query", "");
                        // Sử dụng ref để focus trực tiếp vào input
                        if (inputRef.current) inputRef.current.focus();
                      }}
                    >
                      <X />
                    </Button>
                  )}
                </FormItem>
              )}
            />
          </form>
        </Form>

        {expanded && (
          <div
            className={cn(
              "absolute top-full mt-1 md:w-full lg:w-2/3 bg-background p-2 rounded-lg shadow-md z-50",
              "transition-all animate-in fade-in slide-in-from-top-2"
            )}
          >
            {searchQuery.length === 0 ? (
              <div className="text-gray-500">
                Nhập từ khoá đi mới tìm được chứ...
              </div>
            ) : isLoading ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="w-[69px] h-5 rounded-sm bg-gray-500 mb-2" />
                <Skeleton className="w-full h-24 rounded-sm bg-gray-500" />
                <Skeleton className="w-full h-24 rounded-sm bg-gray-500" />
                <Skeleton className="w-full h-24 rounded-sm bg-gray-500" />
              </div>
            ) : error ? (
              <div className="text-gray-500">Lỗi mất rồi 😭</div>
            ) : mangas.length > 0 ? (
              <>
                <div className="mb-2 flex justify-between items-center">
                  <p className="font-black text-xl">Manga</p>
                  <Button
                    asChild
                    size="icon"
                    variant="ghost"
                    className="[&_svg]:size-6"
                  >
                    <Link href={`/advanced-search`}>
                      <ArrowRight />
                    </Link>
                  </Button>
                </div>
                <div className="grid gap-2 max-h-[80vh] overflow-y-auto">
                  {mangas.map((manga) => (
                    <Link
                      key={manga.id}
                      href={`/manga/${manga.id}`}
                      onClick={() => setExpanded(false)}
                    >
                      <CompactCard manga={manga} />
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-gray-500">Không có kết quả</div>
            )}
          </div>
        )}
      </div>

      {/* overlay */}
      {expanded && (
        <div className="fixed inset-0 bg-black/30 dark:bg-white/30 h-lvh z-[5]" />
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 bg-muted/50 px-0 inline-flex shadow-sm md:hidden"
          >
            <Search />
            <span className="sr-only">Tìm kiếm</span>
          </Button>
        </DialogTrigger>
        <DialogContent
          className={cn(
            "w-full max-w-full border-none top-0 translate-y-0 px-4 py-2",
            `theme-${config.theme}`,
            "[&>button]:hidden"
          )}
        >
          <DialogHeader>
            <DialogTitle className="hidden">Tìm kiếm nhanh</DialogTitle>
            <DialogDescription className="hidden">Tìm kiếm</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(onSubmit)();
              }}
              className="w-full"
            >
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem className="flex items-center w-full justify-end gap-1.5 space-y-0">
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="Tìm kiếm..."
                        className={cn(
                          "bg-secondary border-none h-8 shadow-sm"
                          // "placeholder:text-current"
                        )}
                        {...field}
                        ref={(e) => {
                          field.ref(e);
                          mobileInputRef.current = e;
                        }}
                      />
                    </FormControl>
                    {searchQuery.length === 0 ? (
                      <Search className="absolute right-16 transform h-4 w-4" />
                    ) : (
                      <Button
                        className="absolute right-16 transform h-4 w-4 bg-primary rounded-sm"
                        size="icon"
                        onClick={(e) => {
                          e.preventDefault();
                          form.setValue("query", "");
                          // Sử dụng ref để focus trực tiếp vào input
                          if (mobileInputRef.current)
                            mobileInputRef.current.focus();
                        }}
                      >
                        <X />
                      </Button>
                    )}

                    <DialogClose asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <X />
                      </Button>
                    </DialogClose>
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <DialogFooter>
            <div>
              {searchQuery.length === 0 ? (
                <div className="text-gray-500">
                  Nhập từ khoá đi mới tìm được chứ...
                </div>
              ) : isLoading ? (
                <div className="flex flex-col gap-2 pb-2">
                  <Skeleton className="w-[69px] h-5 rounded-sm bg-gray-500 mb-2" />
                  <Skeleton className="w-full h-24 rounded-sm bg-gray-500" />
                  <Skeleton className="w-full h-24 rounded-sm bg-gray-500" />
                  <Skeleton className="w-full h-24 rounded-sm bg-gray-500" />
                </div>
              ) : error ? (
                <div className="text-gray-500">Lỗi mất rồi 😭</div>
              ) : mangas.length > 0 ? (
                <>
                  <div className="mb-2 flex justify-between items-center">
                    <p className="font-black text-xl">Manga</p>
                    <Button
                      asChild
                      size="icon"
                      variant="ghost"
                      className="[&_svg]:size-6"
                    >
                      <Link href={`/advanced-search`}>
                        <ArrowRight />
                      </Link>
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2 max-h-lvh overflow-y-scroll pb-2">
                    {mangas.map((manga) => (
                      <Link key={manga.id} href={`/manga/${manga.id}`}>
                        <DialogClose className="w-full text-start">
                          <CompactCard manga={manga} />
                        </DialogClose>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-gray-500">Không có kết quả</div>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

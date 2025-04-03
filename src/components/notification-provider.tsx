"use client";

import { toast } from "sonner";
import useSWR from "swr";
import { useEffect } from "react";
import { useLocalNotification } from "@/hooks/use-local-notification";
import { useRouter } from "next/navigation";
import { fetchLatestChapters } from "@/lib/mangadex/latest";
import { ChapterTitle } from "./Chapter/ChapterReader/chapter-info";
import { useConfig } from "@/hooks/use-config";
import { GB, VN } from "country-flag-icons/react/3x2";

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [config] = useConfig();
  const { localNotification, markAsShown, isShown, markAsRead, markAsUnread } =
    useLocalNotification();

  // Fetch latest chapters every 5 minutes
  const { data } = useSWR(
    ["feed", 100, 0, config.translatedLanguage, config.r18],
    ([, limit, offset, language, r18]) =>
      fetchLatestChapters(limit, offset, language, r18),
    {
      refreshInterval: 1000 * 60 * 5, // 5 minutes
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (retryCount >= 3) return; // Stop retrying after 3 attempts
        setTimeout(() => revalidate({ retryCount }), 1000); // Retry after 1 second
      },
    }
  );

  // Check for new chapters and show notifications
  useEffect(() => {
    if (!data || !Array.isArray(data) || localNotification.ids.length === 0) {
      return;
    }

    // For each manga ID in the notification list
    localNotification.ids.forEach((mangaId) => {
      // Find all chapters for this manga
      const chaptersForManga = data.filter((item) => item.manga.id === mangaId);
      // Check each chapter
      chaptersForManga.forEach((chapter) => {
        // If this chapter hasn't been shown yet
        if (!isShown(chapter.id)) {
          // Create a toast notification
          markAsUnread(chapter.id);
          toast.message(
            <div className="flex items-center gap-1">
              {chapter.language === "vi" ? (
                <VN className="size-4" />
              ) : (
                <GB className="size-4" />
              )}
              Có chương mới nè!
            </div>,
            {
              closeButton: false,
              description: chapter.manga.title + " " + ChapterTitle(chapter),
              action: {
                label: "Đọc ngay",
                onClick: () => {
                  markAsRead(chapter.id);
                  router.push(`/chapter/${chapter.id}`);
                  toast.dismiss();
                },
              },
            }
          );

          // Mark as shown after showing the toast
          markAsShown(chapter.id);
        }
      });
    });
  }, [data, localNotification.ids, markAsShown, isShown, router]);

  return <>{children}</>;
}

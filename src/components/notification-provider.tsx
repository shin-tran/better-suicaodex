"use client";

import { toast } from "sonner";
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
import { useLocalNotification } from "@/hooks/use-local-notification";
import { useRouter } from "next/navigation";
import { fetchLatestChapters } from "@/lib/mangadex/latest";
import { ChapterTitle } from "./Chapter/ChapterReader/chapter-info";
import { useConfig } from "@/hooks/use-config";

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [config] = useConfig();
  // Add a ref to track initialization
  const initialized = useRef(false);
  // Store a map of manga IDs to their latest chapter IDs
  const latestChaptersRef = useRef<Map<string, Set<string>>>(new Map());
  // Track the previous notification ids to detect new additions
  const prevNotificationIdsRef = useRef<string[]>([]);

  // Use the updated hook with the shown property
  const { localNotification, markAsShown, isShown } = useLocalNotification();

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

  // Set initialized to true after first render
  useEffect(() => {
    initialized.current = true;
  }, []);

  // Initial population of latestChaptersRef when data is first loaded
  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    // For each manga in the data, store its latest chapters
    data.forEach(item => {
      if (!latestChaptersRef.current.has(item.manga.id)) {
        latestChaptersRef.current.set(item.manga.id, new Set([item.id]));
      } else {
        // Add this chapter ID to the set
        latestChaptersRef.current.get(item.manga.id)?.add(item.id);
      }
    });
  }, [data]);

  // Handle newly added manga IDs to notification list - mark existing chapters as known
  useEffect(() => {
    if (!data || !Array.isArray(data) || !initialized.current) return;
    
    // Find newly added manga IDs
    const currentIds = localNotification.ids;
    const newlyAddedIds = currentIds.filter(
      id => !prevNotificationIdsRef.current.includes(id)
    );
    
    // Mark all existing chapters for newly added manga as "shown"
    if (newlyAddedIds.length > 0) {
      // console.log("New manga added to notifications:", newlyAddedIds);
      
      // For each newly added manga
      newlyAddedIds.forEach(mangaId => {
        // Find all chapters for this manga in current data
        const chaptersForNewManga = data.filter(item => item.manga.id === mangaId);
        
        // Mark all existing chapters as shown to prevent immediate notifications
        chaptersForNewManga.forEach(chapter => {
          markAsShown(chapter.id);
          
          // Make sure we add it to our reference map
          if (!latestChaptersRef.current.has(mangaId)) {
            latestChaptersRef.current.set(mangaId, new Set([chapter.id]));
          } else {
            latestChaptersRef.current.get(mangaId)?.add(chapter.id);
          }
        });
      });
    }
    
    // Update the previous ids reference
    prevNotificationIdsRef.current = [...currentIds];
  }, [localNotification.ids, data, markAsShown]);

  // Check for new chapters and show notifications
  useEffect(() => {
    // Only proceed if the component is initialized and we have data
    if (
      !initialized.current ||
      !data ||
      !Array.isArray(data) ||
      localNotification.ids.length === 0
    ) {
      return;
    }

    console.log("Checking for notifications...");

    // For each id in the localNotification.ids array
    localNotification.ids.forEach((mangaId) => {
      // Find all chapters for this manga ID in the current data
      const chaptersForManga = data.filter(item => item.manga.id === mangaId);
      
      if (chaptersForManga.length === 0) return;
      
      // Get previously known chapter IDs for this manga
      const knownChapterIds = latestChaptersRef.current.get(mangaId) || new Set();
      
      // Check each chapter
      chaptersForManga.forEach(chapter => {
        // If this is a new chapter (not in knownChapterIds) and hasn't been shown yet
        if (!knownChapterIds.has(chapter.id) && !isShown(chapter.id)) {
          console.log("New notification found:", mangaId, chapter.manga.title);
          
          // Mark as shown
          markAsShown(chapter.id);
          
          // Create a toast for the new chapter
          toast.message("Có chương mới nè!", {
            closeButton: false,
            description:
              chapter.manga.title + " " + ChapterTitle(chapter),
            action: {
              label: "Đọc ngay",
              onClick: () => {
                router.push(`/chapter/${chapter.id}`);
                toast.dismiss();
              },
            },
          });
        }
        
        // Always add this chapter ID to the known set
        knownChapterIds.add(chapter.id);
      });
      
      // Update the reference map with any new chapters
      latestChaptersRef.current.set(mangaId, knownChapterIds);
    });
  }, [data, localNotification.ids, router, markAsShown, isShown]);

  return <>{children}</>;
}

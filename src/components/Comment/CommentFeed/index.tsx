"use client";

import useSWR from "swr";
import CommentFeedItem from "./comment-feed-item";
import { useIsMobile } from "@/hooks/use-mobile";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CommentFeed() {
  const isMobile = useIsMobile();
  const {
    data: comments,
    isLoading,
    error,
  } = useSWR("/api/comments/latest", fetcher);

  if (isLoading)
    return (
      <Alert className="rounded-sm border-none">
        <AlertDescription className="flex justify-center">
          <Loader2 className="animate-spin" />
        </AlertDescription>
      </Alert>
    );
  if (error || !comments) return null;

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <hr className="w-9 h-1 bg-primary border-none" />
        <h1 className="text-2xl font-black uppercase">Bình luận gần đây</h1>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        {displayedComments.map((comment: any) => (
          <CommentFeedItem
            key={comment.id}
            comment={comment}
            type={comment.type}
          />
        ))}
      </div> */}
      <div className="overflow-hidden">
        <Swiper
          slidesPerView={isMobile ? 1 : 3}
          autoplay={true}
          loop={true}
          modules={[Autoplay]}
          spaceBetween={8}
        >
          {comments.map((comment: any, index: any) => (
            <SwiperSlide key={index} className="pb-1 px-0.5">
              <CommentFeedItem
                key={comment.id}
                comment={comment}
                type={comment.type}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

"use client";

import useSWR from "swr";
import CommentCard from "./comment-card";
import { forwardRef, useImperativeHandle } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { Loader2 } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface CommentListProps {
  mangaId: string;
}

// Use forwardRef to allow parent components to access the mutate function
const CommentList = forwardRef(({ mangaId }: CommentListProps, ref) => {
  const {
    data: comments,
    mutate,
    isLoading,
    error,
  } = useSWR(`/api/comments/manga/${mangaId}`, fetcher);

  // Expose the mutate function to the parent component
  useImperativeHandle(ref, () => ({
    mutate,
  }));

  if (isLoading || !comments)
    return (
      <Alert className="rounded-sm border-none">
        <AlertDescription className="flex justify-center">
          <Loader2 className="animate-spin" />
        </AlertDescription>
      </Alert>
    );
  if (comments.length === 0)
    return (
      <Alert className="rounded-sm bg-secondary">
        <AlertDescription className="flex justify-center">
          Chưa có bình luận nào! Hãy bóc tem em nó ngay thôi! 😍
        </AlertDescription>
      </Alert>
    );

  if (error)
    return (
      <Alert className="rounded-sm bg-secondary">
        <AlertDescription className="flex justify-center">
          Lỗi mất rồi 😭
        </AlertDescription>
      </Alert>
    );

  return (
    <div className="space-y-4 mt-4">
      {comments.map((comment: any) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
});

// Add a display name for the component
CommentList.displayName = "CommentList";

export default CommentList;

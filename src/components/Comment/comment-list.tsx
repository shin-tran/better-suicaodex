"use client";

import useSWR from "swr";
import CommentCard from "./comment-card";
import { forwardRef, useImperativeHandle } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface CommentListProps {
  mangaId: string;
}

// Use forwardRef to allow parent components to access the mutate function
const CommentList = forwardRef(({ mangaId }: CommentListProps, ref) => {
  const { data: comments, mutate } = useSWR(`/api/comments/manga/${mangaId}`, fetcher);

  // Expose the mutate function to the parent component
  useImperativeHandle(ref, () => ({
    mutate,
  }));

  if (!comments) return <p>Đang tải bình luận...</p>;
  if (comments.length === 0) return <p>Chưa có bình luận nào.</p>;

  return (
    <div className="space-y-4 mt-4">
      {comments.map((comment: any) => (
        <CommentCard
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  );
});

// Add a display name for the component
CommentList.displayName = "CommentList";

export default CommentList;

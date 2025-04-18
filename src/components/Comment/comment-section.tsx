"use client";

import CommentList from "./comment-list";
import CommentForm from "./comment-form";
import { useRef } from "react";

interface CommentSectionProps {
  id: string;
  type: "manga" | "chapter";
}

export default function CommentSection({ id, type }: CommentSectionProps) {
  // Create a reference to the CommentList component's mutate function
  const commentListRef = useRef<{ mutate: () => void } | null>(null);

  // Function to refresh comments when a new comment is posted
  const handleCommentPosted = () => {
    // Call the mutate function from the CommentList component to refresh data
    if (commentListRef.current) {
      commentListRef.current.mutate();
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-4">
      <CommentForm 
        id={id} 
        type={type}
        onCommentPosted={handleCommentPosted} 
      />
      <CommentList 
        id={id} 
        type={type}
        ref={commentListRef} 
      />
    </div>
  );
}

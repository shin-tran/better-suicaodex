import { User, MangaComment } from "@prisma/client";

export function serializeUser(user: User) {
  return {
    // id: user.id,
    name: user.name,
    image: user.image,
    createdAt: user.createdAt,
  };
}

export type CommentWithUser = MangaComment & { user: User };

export function serializeComment(comment: CommentWithUser) {
  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    isEdited: comment.updatedAt.getTime() !== comment.createdAt.getTime(),
    reactions: comment.reactions || 0, 
    mangaId: comment.mangaId,
    user: serializeUser(comment.user),
  };
}

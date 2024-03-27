export type CreateCommentPayload = {
  content: string;
  userEmail: string;
  postId: number;
  parentId?: number;
};

export type DeleteCommentPayload = {
  commentId: number;
  userEmail: string;
};

export type CreateCommentPayload = {
  content: string;
  userEmail: string;
  postId: number;
};

export type DeleteCommentPayload = {
  commentId: number;
  userEmail: string;
};

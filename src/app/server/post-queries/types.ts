import { Like, User } from "@prisma/client";

export type CreatePostPayload = {
  title: string;
  content: string | null;
  email: string;
};
export type SharePostPayload = {
  id: number;
  isShared: boolean;
};

export type FullComment = Comment & {
  user: User;
  replies?: Array<FullComment>;
};

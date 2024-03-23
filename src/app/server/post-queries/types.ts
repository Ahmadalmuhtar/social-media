import { Like } from "@prisma/client";

export type CreatePostPayload = {
  title: string;
  content: string | null;
};
export type SharePostPayload = {
  id: number;
  isShared: boolean;
};

"use client";

import { Post, User } from "@prisma/client";
import Button from "./Button";
import { useSession } from "next-auth/react";
import { CreateLikePayload } from "../server/like-queries/types";
import {
  checkIfUserLiked,
  createLike,
  dislikePostPerId,
  getLikesCountPerPost,
} from "../server/like-queries/queries";
import { useEffect, useState } from "react";

export function SharedPost({ post }: { post: Post & { author: User } }) {
  const [likes, setLikes] = useState<number>();
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState<boolean>();
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    const getLikes = async () => {
      const numberOfLikes = await getLikesCountPerPost(post.id);
      setLikes(numberOfLikes);
    };
    getLikes().catch((error) => console.log(error));

    setButtonText(isLiked ? "Dislike" : "Like");
  }, [isLiked, likes]);

  const handleLike = async (payload: CreateLikePayload) => {
    setIsLiked(await checkIfUserLiked(payload));
    if (!isLiked) {
      await createLike(payload);
    } else {
      await dislikePostPerId(payload);
    }
    console.log(isLiked);
  };
  return (
    <>
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center space-y-3 border">
        <div>{post.title}</div>
        <div className="flex items-center space-x-4">
          <img className="size-12 rounded-full" src={post.author.picture} />
          {post.author.firstname}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: post.content as TrustedHTML }}
        />
        <div>
          <Button
            text={buttonText}
            className="px-4 py-3"
            onClick={() =>
              handleLike({
                postId: post.id,
                userEmail: session?.user?.email as string,
              })
            }
          />
          {likes}
        </div>
      </div>
    </>
  );
}

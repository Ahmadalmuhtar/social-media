"use client";

import Button from "@/app/components/Button";
import { deletePostById, getPostById } from "@/app/server/queries";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function postDetails({
  params,
}: {
  params: { postId: string };
}) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postId = parseInt(params.postId, 10);
        const newPost = await getPostById(postId);
        setPost(newPost);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [params.postId]);

  const handleDeletePost = async (id: number) => {
    await deletePostById(id);
    router.push("/posts");
  };

  return (
    <>
      <div className="text-center py-24">
        <p>{post?.title}</p>
        <p>{post?.content}</p>
        {post?.id && (
          <div className="py-6">
            <Button
              variant="danger"
              onClick={() => handleDeletePost(post?.id)}
              text="Delete Post"
            />
          </div>
        )}
      </div>
    </>
  );
}

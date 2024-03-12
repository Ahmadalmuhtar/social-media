'use client'

import Button from "@/app/components/Button";
import { CreatePostPayload, deletePostById, getPostById } from "@/app/server/queries"
import { useEffect, useState } from "react"

export default function postDetails({ params }: {params:{ postId: string }}){

  const [post, setPost] = useState<CreatePostPayload | null>(null)

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
  }

  return(
    <div className="text-center py-24">
  <p>{post?.title}</p>
  <p>{post?.content}</p>
  <div className="py-6">
  <Button href="/posts" text="Delete Post" onClick={() => handleDeletePost(parseInt(params.postId))}/>
  </div>
    </div>
    )
}
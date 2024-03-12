'use client'

import { CreatePostPayload, getPostById } from "@/app/server/queries"
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

  return(
    <>
  <p>{post?.title}</p>
  <p>{post?.content}</p>
  
  </>
    )
}
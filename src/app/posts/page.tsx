"use client";

import { Post } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { getPosts } from "../server/queries";
import { useRouter } from "next/router";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>();
  const router = useRouter();

  useEffect(() => {
    const getAllPosts = async () => {
      const allPosts = await getPosts();
      setPosts(allPosts);
    };
    getAllPosts();
  }, []);
  return (
    <>
      <ul className="text-center py-14">
        {posts?.map((post) => (
          <li
            key={post.id}
            onClick={() => router.push(`/posts`)}
            className="cursor-pointer"
          >
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Posts;

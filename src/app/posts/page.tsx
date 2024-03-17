import React from "react";
import { getPosts } from "../server/queries";

const Posts = async () => {
  const posts = await getPosts();

  return (
    <div className="flex justify-center space-x-2">
      {posts.map((post) => (
        <div
          key={post.id}
          className="size-96 border ring-indigo-600 ring-2 grid grid-cols-1"
        >
          <div className="flex justify-center text-2xl">{post.title}</div>
          <hr className="max-w-full" />
          <div className="text-left">{post.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Posts;

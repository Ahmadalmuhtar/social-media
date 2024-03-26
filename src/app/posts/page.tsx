import React from "react";
import Link from "next/link";
import Button from "../components/Button";
import { PostCard } from "../components/PostCard";
import { getPosts } from "../server/post-queries/queries";

const Posts = async () => {
  const posts = await getPosts();

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 gap-10">
        {posts.length > 0 ? (
          posts.map((post) => (
            <>
              <PostCard key={post.id} post={post} />
            </>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center space-y-11 py-10">
            <p>Currently you have no Posts to show!</p>
            <Link href={"/create-post"}>
              <Button text="Create Post" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;

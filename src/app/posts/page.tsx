import React from "react";
import { getPosts } from "../server/queries";
import Link from "next/link";
import Button from "../components/Button";
import { PostCard } from "../components/PostCard";

const Posts = async () => {
  const posts = await getPosts();

  return (
    <div className="flex justify-center">
      <div className="grid h-[100vh] overflow-scroll grid-cols-1 gap-20">
        {posts.length > 0 ? (
          posts.map((post) => (
            <>
              <PostCard key={post.id} post={post} />
            </>
          ))
        ) : (
          <div className="py-10 flex flex-col space-y-11 justify-center items-center">
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

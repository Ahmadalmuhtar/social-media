import React from "react";
import { getPosts } from "../server/queries";
import Link from "next/link";
import Button from "../components/Button";

const Posts = async () => {
  const posts = await getPosts();

  return (
    <div className="flex justify-center space-x-6">
      {posts.length > 0 ? (
        posts.map((post) => (
          <>
            <div
              key={post.id}
              className="rounded-md size-96 border ring-indigo-600 ring-2 flex flex-col justify-around space-y-5"
            >
              <div className="flex justify-center text-2xl">{post.title}</div>
              <hr className="max-w-full" />
              <div dangerouslySetInnerHTML={{ __html: post.content! }} />
              <div className="mx-auto">
                <Link href={`/posts/${post.id}`} passHref>
                  <Button text="show post" />
                </Link>
              </div>
            </div>
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
  );
};

export default Posts;

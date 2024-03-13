import React from "react";
import { getPosts } from "../server/queries";
import Link from "next/link";
import Button from "../components/Button";

const Posts = async () => {
  const posts = await getPosts();

  return (
    <>
      <ul className="text-center py-14">
        {posts?.map((post) => (
          <Link href={`/posts/${post.id}`} passHref>
            <li key={post.id} className="cursor-pointer">
              {post.title}
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Posts;

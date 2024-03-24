import React from "react";
import { SharedPost, SharedPostProps } from "../components/SharedPosts";
import { getSharedPosts } from "../server/post-queries/queries";

export default async function Feeds() {
  const posts = await getSharedPosts();
  return (
    <div>
      {!!posts.length ? (
        <div className="grid grid-cols-1 gap-y-3">
          {posts.map((post) => (
            <SharedPost key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">No Posts to show</div>
      )}
    </div>
  );
}

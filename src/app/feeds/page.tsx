import React from "react";
import { getSharedPosts } from "../server/queries";
import { SharedPost } from "../components/SharedPosts";

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
        <div className="text-center py-8">No Posts to show</div>
      )}
    </div>
  );
}

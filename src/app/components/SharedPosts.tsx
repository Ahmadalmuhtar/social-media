import { Post, User } from "@prisma/client";

export function SharedPost({ post }: { post: Post & { author: User } }) {
  return (
    <>
      <div className="flex space-y-3 flex-col items-center border max-w-2xl mx-auto w-full">
        <div>{post.title}</div>
        <div className="flex items-center space-x-4">
          <img className="size-12 rounded-full" src={post.author.picture} />
          {post.author.firstname}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: post.content as TrustedHTML }}
        />
      </div>
    </>
  );
}

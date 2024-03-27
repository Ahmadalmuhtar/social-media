import React, { useState } from "react";
import { deleteCommentById } from "../server/comment-queries/queries";
import { useSession } from "next-auth/react";
import { Comment, Post, User } from "@prisma/client";

type FullComment = Comment & { user: User; replies: Comment[] };

type ReplySectionProps = {
  comment: FullComment & { user: User; replies: FullComment[] };
  postId: number;
};

const ReplySection = ({ comment, postId }: ReplySectionProps) => {
  const [showReplySection, SetShowReplySection] = useState(false);

  const { data: session } = useSession();
  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteCommentById({
        commentId: commentId,
        userEmail: session?.user?.email!,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!!comment.replies?.length &&
        comment.replies?.map((reply) => (
          <div
            className="flex flex-col rounded-md bg-gray-600 px-8 text-red-400"
            key={reply.id}
          >
            <p className="  text-red-400">{reply?.content}</p>
            <div className="space-x-3 text-right">
              <button onClick={() => SetShowReplySection((prev) => !prev)}>
                <p className="text-right text-xs text-gray-400">Reply</p>
              </button>
              <button>
                <p
                  onClick={() => handleDeleteComment(reply.id)}
                  className="text-right text-xs text-gray-400"
                >
                  Delete
                </p>
              </button>
            </div>
            {!!reply.replies?.length && (
              <ReplySection postId={postId} comment={reply} />
            )}
          </div>
        ))}
    </>
  );
};

export default ReplySection;

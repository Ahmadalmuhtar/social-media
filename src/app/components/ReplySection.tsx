"use client";

import { Comment, User } from "@prisma/client";
import React, { useState } from "react";
import {
  createComment,
  deleteCommentById,
} from "../server/comment-queries/queries";
import { useSession } from "next-auth/react";
import Button from "./Button";

type FullComment = Comment & { user: User; replies: Comment[] };

type ReplySectionProps = {
  comment: FullComment & { user: User; replies: FullComment[] };
  postId: number;
};

const ReplySection = ({ comment, postId }: ReplySectionProps) => {
  const [showReplySection, setShowReplySection] = useState(false);
  const [reply, setReply] = useState("");

  const { data: session } = useSession();

  const canDelete = comment.userEmail === session?.user?.email;

  const handleReply = async (e: React.FormEvent, parnetId: number) => {
    e.preventDefault();
    try {
      await createComment({
        content: reply,
        postId: postId,
        userEmail: session?.user?.email!,
        parentId: parnetId,
      });
      setReply("");
    } catch (error) {
      console.log(error);
    }
  };

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
    <div key={comment.id} className="flex items-center space-x-2">
      <img className="size-8 rounded-full" src={comment.user.picture} />
      <div className="flex h-fit max-w-96 flex-col rounded-lg bg-gray-200 p-2">
        <p className="text-sm font-semibold">{comment.user?.firstname}</p>
        <p className="max-w-fit break-words" key={comment?.id!}>
          {comment?.content}
        </p>
        {/* {comment.replies?.map((reply) => {
          return (
            <div key={reply.id}>
              <p className="text-red-400">{reply?.content}</p>
              {!!reply.replies?.length && (
                <ReplySection postId={postId} comment={reply} />
              )}
            </div>
          );
        })} */}
        <div className="flex justify-end space-x-2">
          <button onClick={() => setShowReplySection((prev) => !prev)}>
            <p className="text-xs text-gray-400">Reply</p>
          </button>
          {canDelete && (
            <button>
              <p
                onClick={() => handleDeleteComment(comment.id)}
                className="text-right text-xs text-gray-400"
              >
                Delete
              </p>
            </button>
          )}
        </div>
        {showReplySection && (
          <form onSubmit={(e) => handleReply(e, comment.id)}>
            <input
              value={reply}
              type="text"
              onChange={(e) => setReply(e.target.value)}
            />
            <Button text="Reply" type="submit" />
          </form>
        )}
      </div>
    </div>
  );
};

export default ReplySection;

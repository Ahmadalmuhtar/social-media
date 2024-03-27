"use client";

import { Comment, User } from "@prisma/client";
import React, { useState } from "react";
import {
  createComment,
  deleteCommentById,
} from "../server/comment-queries/queries";
import { useSession } from "next-auth/react";
import Button from "./Button";
import ReplySection from "./ReplySection";

type FullComment = Comment & { user: User; replies: Comment[] };

type CommentSectionProps = {
  comment: FullComment & { user: User; replies: FullComment[] };
  postId: number;
};

const CommentsSection = ({ comment, postId }: CommentSectionProps) => {
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
    setShowReplySection(false);
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
  console.log(comment);
  return (
    <div key={comment.id} className="items-center space-x-2 pl-4">
      <img className="size-8 rounded-full" src={comment.user.picture} />
      <div className="flex h-fit max-w-96 flex-col rounded-lg bg-gray-200 p-2">
        <p className="text-sm font-semibold">{comment.user?.firstname}</p>
        <p className="max-w-fit break-words" key={comment?.id!}>
          {comment?.content}
        </p>
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
      {!!comment.replies?.length &&
        comment.replies.map((reply) => (
          <CommentsSection comment={reply} key={reply.id} postId={postId} />
        ))}
    </div>
  );
};

export default CommentsSection;

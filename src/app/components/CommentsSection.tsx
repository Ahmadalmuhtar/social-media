import { Comment, User } from "@prisma/client";
import {
  createComment,
  deleteCommentById,
} from "../server/comment-queries/queries";
import { useSession } from "next-auth/react";
import { useState } from "react";

type FullComment = Comment & { user: User; replies?: Array<FullComment> };

type CommentSectionProps = {
  comment: FullComment;
};

const CommentsSection = ({ comment }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const [showReplySection, setShowReplySection] = useState(false);

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

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    await createComment({
      content: newComment,
      postId: comment.postId,
      parentId: comment.id,
      userEmail: session?.user?.email!,
    });
    setNewComment("");
  };

  return (
    <div className="flex flex-col space-y-4">
      <div key={comment.id} className="flex flex-col space-x-2">
        <img
          className="m-2 size-8 h-fit max-w-fit rounded-full"
          src={comment.user.picture}
        />
        <div className="flex flex-col rounded-lg bg-gray-200 p-2">
          <p className="text-sm font-semibold">{comment.user?.firstname}</p>
          <p className="max-w-fit break-words" key={comment?.id!}>
            {comment.content}
          </p>
          <div className="space-x-2 text-right text-sm">
            <button>
              <p
                onClick={() => setShowReplySection((prev) => !prev)}
                className="text-right text-xs text-gray-400"
              >
                Reply
              </p>
            </button>
            <button>
              <p
                onClick={() => handleDeleteComment(comment.id)}
                className="text-right text-xs text-gray-400"
              >
                Delete
              </p>
            </button>
          </div>

          {showReplySection && (
            <form
              className="flex max-w-fit space-x-2"
              onSubmit={handleAddComment}
            >
              <input
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Type your reply..."
                type="text"
                value={newComment}
              />
              <button className="text-sm text-gray-400" type="submit">
                Reply
              </button>
            </form>
          )}
        </div>
        <div className="pl-3">
          {!!comment.replies?.length &&
            comment.replies?.map((reply) => (
              <div className="border-b py-3">
                <CommentsSection comment={reply} key={reply.id} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;

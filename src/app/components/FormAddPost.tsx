import { useState } from "react";
import { CreatePostPayload, createPost } from "../server/queries";
import Button from "./Button";
import { Session } from "inspector";
import { useSession } from "next-auth/react";

export default function AddPostForm() {
  const { data: session, status } = useSession();

  const [postData, setPostData] = useState<CreatePostPayload>({
    title: "",
    content: "",
  });

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    createPost(postData, session?.user?.email!);
    setPostData({ title: "", content: "" });
  };
  return (
    <>
      <form onSubmit={handleAddPost} className="flex flex-col space-y-6">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            onChange={(e) =>
              setPostData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            id="title"
            type="text"
            placeholder="Add Title"
            className="rounded-full text-center col-span-2 ring-1 m-1 ring-black"
          />
        </div>
        <div>
          <label htmlFor="content">Post:</label>
          <input
            onChange={(e) =>
              setPostData((prev) => ({
                ...prev,
                content: e.target.value,
              }))
            }
            id="content"
            placeholder="Add Content"
            className="rounded-full text-center col-span-2 ring-1 m-1 ring-black"
          />
        </div>
        <Button type="submit" text="Submit" />
      </form>
    </>
  );
}

import { useState } from "react";
import Button from "./Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import { CreatePostPayload } from "../server/post-queries/types";
import { createPost } from "../server/post-queries/queries";

export default function AddPostForm() {
  const { data: session } = useSession();

  const [postData, setPostData] = useState<CreatePostPayload>({
    title: "",
    content: "",
  });
  const router = useRouter();

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    createPost(postData, session?.user?.email!);
    setPostData({ title: "", content: "" });
    router.push("/posts");
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
            className="col-span-2 m-1 text-center text-black ring-1 ring-black"
          />
        </div>
        <div>
          <label htmlFor="content">Post:</label>
          <Editor
            onEditorChange={(content) =>
              setPostData((prev) => ({ ...prev, content }))
            }
            apiKey="vtgfzj4ahw38c91ptuhwzgvenb4i2u268n06qxd02fyi09kz"
            id="content"
          />
        </div>
        <Button type="submit" text="Submit" />
      </form>
    </>
  );
}

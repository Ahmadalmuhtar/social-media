import { useState } from "react";
import { CreatePostPayload, createPost } from "../server/queries";
import Button from "./Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";

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
    console.log(postData);
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
            className="text-center col-span-2 ring-1 m-1 ring-black"
          />
        </div>
        <div>
          <label htmlFor="content">Post:</label>
          <Editor
            apiKey="vtgfzj4ahw38c91ptuhwzgvenb4i2u268n06qxd02fyi09kz"
            onChange={(e) =>
              setPostData((prev) => ({
                ...prev,
                content: e.target.value,
              }))
            }
            id="content"
          />
        </div>
        <Button type="submit" text="Submit" />
      </form>
    </>
  );
}

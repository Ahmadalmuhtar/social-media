import { useState } from "react";
import { CreatePostPayload, createPost } from "../server/queries";
import Button from "./Button";

type AddPostFormProps = {
  setOpenFormPost: (b: boolean) => void;
};

export default function AddPostForm({ setOpenFormPost }: AddPostFormProps) {
  const [postData, setPostData] = useState<CreatePostPayload>({
    title: "",
    content: "",
    published: false,
  });

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost(postData);
    setPostData({ title: "", content: "", published: false });
    setOpenFormPost(false);
  };
  return (
    <>
      <form onSubmit={handleAddPost} className="grid grid-cols-2 space-x-10">
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
          className="text-center col-span-2 border-black"
        />
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
          className="text-center col-span-2 border-black"
        />
        <Button type="submit" text="Submit" />
      </form>
    </>
  );
}

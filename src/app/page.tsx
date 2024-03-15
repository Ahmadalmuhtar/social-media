"use client";

import { useSession } from "next-auth/react";
import Button from "./components/Button";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") return "Loading...";
  return (
    <>
      <div className="bg-red-200 grid grid-cols-4 gap-y-3 gap-x-9 text-4xl">
        <div className="size-36 bg-green-500">1</div>
        <div className="size-36 bg-green-500">2</div>
        <div className="size-36 bg-green-500">3</div>
        <div className="size-36 bg-green-500">4</div>
        <div className="size-36 bg-green-500">5</div>
        <div className="size-36 bg-green-500">6</div>
        <div className="size-36 bg-green-500">7</div>
        <div className="size-36 bg-green-500">8</div>
        <div className="size-36 bg-green-500">9</div>
        <div className="size-36 bg-green-500">10</div>
        <div className="size-36 bg-green-500">11</div>
        <div className="size-36 bg-green-500">12</div>
      </div>
    </>
  );
}

// <div className="space-y-12">
//   <div className="flex flex-row-reverse space-x-reverse space-x-4 justify-center items-center">
//     <div className="size-16 bg-yellow-400"></div>
//     <div className="size-32 bg-red-400"></div>
//     <div className="size-40 bg-blue-400"></div>
//     <div className="size-44 bg-green-400"></div>
//   </div>
//   <div className="flex space-x-4 justify-center items-center ">
//     <div className="flex size-44 bg-indigo-700 justify-center items-center">
//       <div>Ahmad</div>
//     </div>
//     <div className="size-32 bg-yellow-200"></div>
//   </div>
//   <div className="flex space-x-4 justify-center items-center">
//     <div className="size-16 bg-yellow-400"></div>
//     <div className="size-32 bg-red-400"></div>
//     <div className="size-40 bg-blue-400"></div>
//     <div className="size-44 bg-green-400"></div>
//   </div>
//   <div className="flex space-x-4 justify-center items-center ">
//     <div className="size-44 bg-indigo-700"></div>
//     <div className="size-32 bg-yellow-200"></div>
//   </div>
// </div>

{
  /* <div className="flex justify-center py-8">
{session && (
  <div className="flex flex-col max-w-5xl mx-auto space-y-4">
    <Link href={"/create-post"} passHref>
      <Button text="Create Post" />
    </Link>
    <Button
      text="Posts"
      onClick={() => {
        router.push("/posts");
      }}
    />
    <Button
      text="Users"
      variant="default"
      onClick={() => router.push("/users")}
    /> */
}

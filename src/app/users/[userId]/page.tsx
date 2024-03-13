import Button from "@/app/components/Button";
import { getUserById } from "@/app/server/queries";
import Link from "next/link";

export default async function userDetails({
  params,
}: {
  params: { userId: string };
}) {
  const user = await getUserById(parseInt(params.userId));
  return (
    <>
      <Link href="/" passHref>
        <Button text="Home" />
      </Link>
      <div className="text-center py-24">
        <p key={user?.id}>{user?.name}</p>
      </div>
    </>
  );
}

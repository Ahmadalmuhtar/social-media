"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto flex max-w-5xl justify-between py-2"
    >
      {!session ? (
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
          <Link href={"/api/auth/signin"} passHref>
            <Button text="Login" />
          </Link>
        </motion.div>
      ) : (
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
          <Link href={"/api/auth/signout"} passHref>
            <Button text="Logout" />
          </Link>
        </motion.div>
      )}
      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
        <Button onClick={() => router.back()} text="Go Back" />
      </motion.div>
    </motion.div>
  );
};

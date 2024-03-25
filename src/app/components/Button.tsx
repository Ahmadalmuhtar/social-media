"use client";

import React from "react";
import { cn } from "../utils";
import { motion } from "framer-motion";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "danger" | "ghost";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  type,
  className,
  variant = "default",
}) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
      <button
        type={type}
        className={cn(
          "text-md w-full rounded-md border px-3 py-2 text-center capitalize",
          variant === "default"
            ? "col-span-2 bg-blue-600 text-white"
            : variant === "danger"
              ? "col-span-2 bg-red-700 text-white"
              : variant === "ghost"
                ? "bg-transparent text-blue-600 ring-2 ring-blue-600"
                : className ?? "",
        )}
        onClick={onClick}
      >
        {text}
      </button>
    </motion.div>
  );
};

export default Button;

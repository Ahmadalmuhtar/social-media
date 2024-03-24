"use client";

import React from "react";
import { cn } from "../utils";
import { motion } from "framer-motion";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "danger";
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
    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
      <button
        type={type}
        className={cn(
          "w-full rounded-full border px-3 py-2 text-center",
          variant === "default"
            ? "col-span-2 bg-orange-700 text-white"
            : variant === "danger"
              ? "col-span-2 bg-red-700 text-white"
              : "",
          className ?? "",
        )}
        onClick={onClick}
      >
        {text}
      </button>
    </motion.div>
  );
};

export default Button;

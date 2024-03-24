"use client";

import React from "react";
import { cn } from "../utils";

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
    <button
      type={type}
      className={cn(
        "rounded-full border px-3 py-2 text-center",
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
  );
};

export default Button;

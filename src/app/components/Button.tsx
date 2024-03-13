import React from "react";
import { cn } from "../utils";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  type,
  variant = "default",
}) => {
  return (
    <button
      type={type}
      className={cn(
        "border px-3 py-2 rounded-md text-center",
        variant === "default"
          ? "bg-black text-white col-span-2"
          : variant === "danger"
          ? "bg-red-700 text-white col-span-2"
          : ""
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

import React from "react";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ onClick, text, type }) => {
  return (
    <button
      type={type}
      className="border px-3 py-2 bg-black text-white rounded-md text-center"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

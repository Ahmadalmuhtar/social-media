import React from "react";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  type?: 'button' | 'submit' | 'reset'
  href?: string
}

const Button: React.FC<ButtonProps> = ({ onClick, text, type, href }) => {
  return (
    <a href={href}>
    <button
    
    type={type}
    className="border px-3 py-2 bg-black text-white rounded-md text-center"
      onClick={onClick}
    >
      {text}
    </button>
    </a>
  );
};

export default Button;

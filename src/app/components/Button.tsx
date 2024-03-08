const Button = (onclick: React.MouseEventHandler, text: string) => {
  return (
    <button onClick={onclick} className="border border-spacing-3">
      {text}
    </button>
  );
};

export default Button;

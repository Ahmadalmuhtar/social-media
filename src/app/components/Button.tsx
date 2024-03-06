const Button = (onclick: React.MouseEventHandler, children: string) => {
  return (
    <button onClick={onclick} className="border border-spacing-3">
      {children}
    </button>
  );
};

export default Button;

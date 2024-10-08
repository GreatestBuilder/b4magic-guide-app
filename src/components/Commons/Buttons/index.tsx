"use client";

import React from "react";

// Interface
interface IButtonProps {
  text: string | JSX.Element;
  onClick: () => void;
  style?: React.CSSProperties;
}

const Button = (props: IButtonProps) => {
  const { text, onClick } = props;
  return (
    <button onClick={onClick} className="btn">
      {text}
    </button>
  );
};

export { Button };

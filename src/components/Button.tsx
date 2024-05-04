import React from "react";

type Props = {
  variant?: "primary" | "secondary";
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  children: React.ReactNode;
};

function Button({ variant = "primary", onClick, children }: Props) {
  return (
    <button
      className={`${
        variant === "primary"
          ? "bg-purple500 text-white"
          : "bg-transparent text-black"
      } flex justify-center items-center h-fit font-normal text-sm py-2 lg:px-4 px-4 rounded-lg`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

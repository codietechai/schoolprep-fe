import React from 'react';

const Button = ({
  text,
  className,
  onClick,
}: {
  text: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} min-w-[159px] rounded-lg border border-[#4B70F5] px-5 py-2 text-base leading-normal text-[#4B70F5] hover:bg-[#4B70F5]/90 lg:px-6 lg:py-3 lg:text-[20px]`}>
      {text}
    </button>
  );
};

export default Button;

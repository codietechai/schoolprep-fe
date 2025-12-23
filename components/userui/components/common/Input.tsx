'use client';
import React from 'react';

const Input = ({
  type = 'text',
  className,
}: {
  type?: string;
  className?: string;
}) => {
  return (
    <input
      type={type}
      className={`w-full rounded-[8px] border border-border bg-white outline-none focus:border focus:border-blue-500 ${className} px-4 py-[13.5px]`}
    />
  );
};

export default Input;

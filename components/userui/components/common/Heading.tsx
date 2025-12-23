import React from 'react';

const Heading = ({ text, className }: { text: string; className?: string }) => {
  return (
    <button
      className={`${className} min-w-[15ppx] rounded-lg border border-[#4B70F5] px-4 py-3 text-[20px]`}>
      {text}
    </button>
  );
};

export default Heading;

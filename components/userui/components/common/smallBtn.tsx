import React from 'react';

const SmallBtn = ({
  text,
  className,
  onClick,
  type = 'primary',
  style,
}: {
  text: string;
  className?: string;
  onClick?: () => void;
  type: 'primary' | 'secondary';
  style?: React.CSSProperties;
}) => {
  return (
    <button
      className={`${className} rounded-lg border ${
        type === 'primary'
          ? 'bg-[#4B70F5] text-white hover:bg-[#4B70F5]/90'
          : 'border-[#4B70F5] bg-white text-[#4B70F5] hover:bg-[#4B70F5] hover:text-white'
      }  px-6 py-3 text-[16px] leading-[23px]`}
      style={style}
      onClick={onClick}>
      {text}
    </button>
  );
};

export default SmallBtn;

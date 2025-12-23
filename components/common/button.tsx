import React from 'react';

const Button = ({
  onClick,
  type = 'primary',
  text,
  icon,
  className,
  disabled = false,
  buttonType = 'button',
}: {
  onClick?: (() => void) | undefined;
  type?: 'primary' | 'secondary' | 'tertiary';
  text: string;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  buttonType?: 'button' | 'submit' | 'reset' | undefined;
}) => {
  return (
    <button
      type={buttonType}
      className={`flex items-center justify-center gap-1 rounded-lg px-6 py-2 disabled:bg-background md:py-2 ${
        type === 'primary'
          ? 'border border-primary bg-white text-primary'
          : type === 'secondary'
          ? 'bg-primary px-6 text-white'
          : 'text-primary underline hover:no-underline disabled:bg-white/90'
      } ${className}`}
      onClick={onClick}
      disabled={disabled}>
      {icon}
      {text}
    </button>
  );
};

export default Button;

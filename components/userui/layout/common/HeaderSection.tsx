import React from 'react';

const HeaderSection = ({
  head,
  text,
  footer,
}: {
  head: React.ReactNode;
  text: string;
  footer: React.ReactNode;
}) => {
  return (
    <div className="max-w-[701px] space-y-8 text-center md:text-left">
      <h2 className="main-head">{head}</h2>
      <p className="text-base text-black opacity-80 sm:text-xl lg:text-2xl lg:leading-9">
        {text}
      </p>
      {footer}
    </div>
  );
};

export default HeaderSection;

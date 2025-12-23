import React from 'react';

const Tool = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex w-[350px] items-center gap-4 rounded-xl border border-[#e5e6e6] p-3 sm:w-[500px] md:gap-6 md:p-4 xl:w-[515px] xl:p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#DCE2F5] lg:h-[62px] lg:w-[62px] 2xl:text-red-400 ">
        {icon}
      </div>
      <div className="space-y-[2px] lg:space-y-[5px]">
        <p className="secondary-text font-semibold">{title}</p>
        <p className="font-[300] -tracking-[1px] text-[#818286]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Tool;

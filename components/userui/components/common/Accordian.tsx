import React from 'react';

const Accordian = ({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
}) => {
  return (
    <>
      <div className="collapse-arrow collapse-container collapse border-b border-b-[#e6e6e6] bg-transparent pb-2">
        <input type="checkbox" className="" name="my-accordion-2" />
        <div className="accordian collapse-title text-[17px] font-[600] text-[#253650] lg:text-xl">
          {question}
        </div>
        <div className="accordian collapse-content">{answer}</div>
      </div>
    </>
  );
};

export default Accordian;

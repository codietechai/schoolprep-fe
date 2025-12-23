import React from 'react';
import Button from '../../components/common/Button';

const AccessPrivateQuestions = () => {
  return (
    <div className="res-padding bg-[#111A38] px-4">
      <div className="space-y-8">
        <div className="space-y-4 text-center text-white">
          <p className="heading font-[600]">
            Access to Practice  Questions for  Mastery
          </p>
          <p className="sub-head font-[300]">
            Get unlimited access to a wide range of practice
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
          <Button
            text="Try free sample questions"
            className="w-[300px] bg-[#4B70F5] text-white"
          />
          <Button
            text="Learn more"
            className="w-[300px] border-white text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default AccessPrivateQuestions;

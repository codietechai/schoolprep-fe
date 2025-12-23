import React from 'react';
import Button from '../../components/common/Button';
import Image from 'next/image';
import img from '@/components/userui/components/images/home/graph.webp';

const Impact = () => {
  return (
    <div className="bg-white">
      <div className="res-padding m-auto flex max-w-[1280px] flex-col gap-10 rounded-2xl bg-background px-4 lg:flex-row lg:px-16">
        <div className="space-y-4 lg:w-[600px]">
          <h2 className="heading text-center text-black lg:text-left">
            Impact we create
          </h2>
          <p className="sub-head text-center text-black lg:w-[600px] lg:text-left">
            Experienced professionals, including educators, nurses, unite to
            incorporate proven learning methods into your daily studies. Their
            collaborative approach ensures a well-rounded and practical learning
            experience. Gain the skills and confidence needed to excel in your
            nursing career.
          </p>
        </div>
        <div className="flex w-full flex-col items-center">
          <Button
            text="Correct Answers"
            className="border-none bg-white px-[21px] py-[5px] text-[22px] text-[#767676] shadow hover:bg-white lg:ml-48"
          />
          <Image src={img} alt="img" className="mb-[29px] mt-6" />
          <div className="flex gap-4">
            <span className="text-[32px] font-bold leading-[43.58px]">82%</span>
            <div className="">
              <p className="text-[#767676]">Your performance is 30%</p>
              <p className="text-[#767676]">better compare to last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impact;

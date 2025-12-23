import React from 'react';
import PharmacyIcon1 from '../../components/images/pharmacy/main/pharmacy1.webp';
import PharmacyIcon2 from '../../components/images/pharmacy/main/pharmacy2.webp';
import Button from '../../components/common/Button';
import Image from 'next/image';

const Preparation = () => {
  const data = [
    'Over 15,000 quiz questions',
    'Personalized review plans',
    'Timely reminders for effective practice',
    'Better retention of critical knowledge',
    'Adaptive technology for focused learning',
    'Increased study efficiency',
  ];

  return (
    <div className="">
      <div className="m-auto mb-[40px] mt-10 max-w-[1600px] space-y-4 px-4 text-center md:px-10 lg:mb-[70px] ">
        <h2 className="heading">
          Prepare with confidence for class, clinicals, and exam day
        </h2>
        <p className="sub-head">Tailored specifically for students</p>
      </div>
      <div className="responsive mt-10 grid max-w-[1280px] grid-cols-1 pb-[60px] text-center md:text-left lg:grid-cols-2 lg:pb-[120px]">
        <div className="m-auto mb-10 max-w-[644px] md:m-0">
          <h2 className="mb-2 text-center text-xl font-bold text-black md:text-left md:text-[28px] md:leading-[50px] ">
            Smart Recall Quizzes
          </h2>
          <p className="tertiary-text mb-6 font-[600]">
            Boost your retention of essential concepts with quizzes powered by
            an intelligent algorithm that guides you on what to review and when
            to review it.
          </p>
          <ul className="mb-6 list-disc pl-8">
            {data.map((item, i) => (
              <li
                className="text-left text-[16px] leading-7 md:text-[24px] md:leading-[52px]"
                key={i}>
                {item}
              </li>
            ))}
          </ul>
          <Button
            text="Start Now"
            className="mb-10 bg-[#4B70F5] text-white md:mb-0"
          />
        </div>
        <Image src={PharmacyIcon1} alt="icon" className="m-auto" />
      </div>
      <div className="responsive res-padding mt-10 grid max-w-[1280px] grid-cols-1 gap-8 text-center md:text-left lg:grid-cols-2">
        <div className="w-auto">
          <Image src={PharmacyIcon2} alt="icon" className="m-auto" />
        </div>
        <div className="m-auto max-w-[788px]">
          <h2 className="mb-2 text-center text-xl font-bold text-black md:text-left md:text-[28px] md:leading-[50px] ">
            Smart Recall Quizzes
          </h2>
          <p className="tertiary-text mb-6 font-[600]">
            Boost your retention of essential concepts with quizzes powered by
            an intelligent algorithm that guides you on what to review and when
            to review it.
          </p>
          <ul className="mb-6 list-disc pl-8">
            {data.map((item, i) => (
              <li
                className="text-left text-[16px] leading-7 lg:text-[24px] lg:leading-[52px]"
                key={i}>
                {item}
              </li>
            ))}
          </ul>
          <Button text="Start Now" className="bg-[#4B70F5] text-white" />
        </div>
      </div>
    </div>
  );
};

export default Preparation;

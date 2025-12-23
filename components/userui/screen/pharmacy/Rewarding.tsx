'use client';
import React from 'react';
import {
  DetailedIcon,
  DiagnosticIcon,
  PerformanceIcon,
  PreparatoryIcon,
  ProgressIcon,
} from '../../components/icons/icon';

const Rewarding = () => {
  const screenWidth = window.innerWidth;
  let width = 24;
  if (screenWidth > 768) {
    width = 35;
  }
  const chooseData = [
    {
      icon: <ProgressIcon width={width} />,
      title: 'Progress Tracking',
      description: 'Detailed overview of each student’s performance',
    },
    {
      icon: <PreparatoryIcon width={width} />,
      title: 'Preparatory Tests',
      description: 'Focused on reinforcing knowledge',
    },
    {
      icon: <DiagnosticIcon width={width} />,
      title: 'Diagnostic Tests',
      description: "Assess a student's baseline knowledge",
    },
    {
      icon: <PerformanceIcon width={width} />,
      title: 'Performance Dashboard',
      description: 'Detailed performance analytics',
    },
    {
      icon: <DetailedIcon width={width} />,
      title: 'Detailed Explanations',
      description: 'Comprehensive explanations for test questions',
    },
  ];
  return (
    <div className="res-padding bg-background">
      <div className="responsive flex max-w-[1280px] flex-col items-center gap-12 lg:flex-row">
        <div className="w-full space-y-[23px] text-center lg:text-left">
          <h2 className="text-[17px] font-bold leading-[24px] text-black sm:text-xl md:text-[28px] md:leading-[38px]">
            Unlock Your Path to a Rewarding Pharmacy Career
          </h2>
          <p className="tertiary-text font-[600]">
            Comprehensive pharmacy courses designed to build a strong foundation
            in pharmacology, clinical practice, and patient care.
          </p>
          <p className="tertiary-text">
            Dive into the world of pharmacy with expertly crafted programs that
            combine theoretical knowledge with practical application. Our
            courses cover essential topics like drug interactions, patient
            counseling, and healthcare management, ensuring you are
            well-prepared for a successful career in pharmacy. Guided by
            seasoned professionals, these programs provide the skills and
            confidence you need to make a meaningful impact in the healthcare
            industry.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-4">
          {chooseData &&
            chooseData.map((item, i) => (
              <Tool
                key={i}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

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
    <div className="flex w-[387px] items-center gap-4 p-3 md:gap-6 md:p-4">
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
export default Rewarding;

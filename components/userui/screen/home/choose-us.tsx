'use client';
import React from 'react';
import Tool from '../../components/screen/home/choose-us/Tool';
// import img from '@/components/userui/components/images/home/choose-us/image.webp';
import img from '@/components/userui/components/images/pharmacy/svg.webp';

import Image from 'next/image';
import {
  DetailedIcon,
  DiagnosticIcon,
  PerformanceIcon,
  PreparatoryIcon,
  ProgressIcon,
} from '../../components/icons/icon';
import SmallBtn from '../../components/common/smallBtn';
import Button from '../../components/common/Button';

const ChooseUs = () => {
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
    <section
      id="featured-courses"
      className="res-padding flex min-h-screen items-center justify-center space-y-[70px] overflow-hidden bg-white">
      <div className="">
        <div className="m-auto mb-[70px] max-w-[1600px] space-y-4 px-10 text-center">
          <h2 className="heading">Why choose us</h2>
          <p className="sub-head">
            Get all the essential tools for your test prep
          </p>
        </div>
        <div className="m-auto flex max-w-[1280px] flex-col gap-[34px]  xl:flex-row">
          <div className="m-auto space-y-6 xl:mx-0">
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
          <Image src={img} alt="img" height={614} className="mx-4" />
        </div>
        <div className="mt-8 flex w-full justify-center">
          <SmallBtn text="Try free sample questions" type="primary" />
        </div>
      </div>
    </section>
  );
};
export default ChooseUs;

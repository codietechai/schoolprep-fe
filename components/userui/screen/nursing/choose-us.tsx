'use client';
import React from 'react';
import Tool from '../../components/screen/home/choose-us/Tool';
import Image from 'next/image';
import img2 from '@/components/userui/components/images/pharmacy/svg2.webp';
import {
  DetailedIcon,
  DiagnosticIcon,
  PerformanceIcon,
  PreparatoryIcon,
  ProgressIcon,
} from '@/components/userui/components/icons/icon';

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
    <section id="choose-us" className="responsive res-padding max-w-[1280px]">
      <div className="mb-[40px] space-y-4 text-center lg:mb-[70px]">
        <h2 className="heading">Why choose us</h2>
        <p className="sub-head">
          Get all the essential tools for your test prep
        </p>
      </div>
      <div className="flex flex-col-reverse items-center gap-5 lg:justify-between lg:gap-0 xl:flex-row">
        <div className="flex items-center justify-center">
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
        </div>

        <Image src={img2} alt="img" className="mb-10 xl:mb-0" />
      </div>
    </section>
  );
};

export default ChooseUs;

'use client';
import React from 'react';
import {
  GrowthIcon,
  InnovativeIcon,
  ResultIcon,
  SimplifiedIcon,
  StudentIcon,
  TeamWorkIcon,
} from '../../components/icons/about-icons';

const CoreValues = () => {
  const screenWidth = window.innerWidth;
  let width = 64;
  if (screenWidth < 800) {
    width = 40;
  }
  const data = [
    {
      icon: <StudentIcon />,
      title: 'Student-centered approach',
      description:
        'We prioritize student success by delivering top-quality products and services that directly enhance learning and academic achievement.',
    },
    {
      icon: <InnovativeIcon />,
      title: 'Innovative spirit',
      description:
        'Driven by curiosity and a willingness to take risks, we constantly innovate to meet student needs, fuel growth, and lead in our markets.',
    },
    {
      icon: <SimplifiedIcon />,
      title: 'Simplified learning',
      description:
        'We make complex concepts easy to grasp with clear questions, detailed explanations, engaging videos, and effective performance tracking.',
    },
    {
      icon: <TeamWorkIcon />,
      title: 'Teamwork and unity',
      description:
        'By working together with mutual respect, inclusivity, and celebration of diversity, we achieve shared goals that benefit both students and our company.',
    },
    {
      icon: <GrowthIcon />,
      title: 'Honesty in intellectual growth',
      description:
        'We embrace feedback, learn from our experiences, and strive for continuous improvement to achieve exceptional results for students, educators.',
    },
    {
      icon: <ResultIcon />,
      title: 'Results-oriented',
      description:
        'Focused on prioritizing what matters most, we efficiently deliver high-quality products and services that create the greatest impact in the markets we serve.',
    },
  ];
  return (
    <div className="min-h-screen bg-background">
      <div className="res-padding">
        <div className="m-auto mb-[40px] max-w-[1600px] space-y-4 px-4 text-center md:px-10 lg:mb-[70px]">
          <h2 className="heading">Fueling Excellence with Our Core Values</h2>
          <p className="sub-head">
            We elevate your craft with precise skill development, helping you
            stay ahead in your career.
          </p>
        </div>
        <div className="mx-4 grid max-w-[1280px] grid-cols-1 gap-10 sm:grid-cols-2 md:mx-8 lg:grid-cols-3 xl:mx-auto">
          {data.map((item, i) => (
            <Item
              icon={item.icon}
              key={i}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreValues;

export const Item = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
}) => (
  <div className="m-auto flex max-w-[400px] flex-col items-center gap-4 rounded-2xl bg-white px-6 py-12">
    {icon}
    <h3 className="secondary-text text-center font-semibold -tracking-[1px]">
      {title}
    </h3>
    {description && (
      <p className="text-center text-base font-[300] -tracking-[1px] text-[#818286]">
        {description}
      </p>
    )}
  </div>
);

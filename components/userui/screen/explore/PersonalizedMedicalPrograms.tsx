import React from 'react';
import {
  DetailedIcon,
  DiagnosticIcon,
  PerformanceIcon,
  PreparatoryIcon,
  ProgressIcon,
} from '../../components/icons/icon';
import { Item } from '../about-us/core-values';

const data = [
  {
    name: 'Progress Tracking',
    icon: <ProgressIcon />,
  },
  {
    name: 'Preparatory Tests',
    icon: <PreparatoryIcon />,
  },
  {
    name: 'Diagnostic Tests',
    icon: <DiagnosticIcon />,
  },
  {
    name: 'Performance Dashboard',
    icon: <PerformanceIcon />,
  },
  {
    name: 'Detailed Explanations',
    icon: <DetailedIcon />,
  },
];

const PersonalizedMedicalPrograms = () => {
  return (
    <div className="res-padding bg-background ">
      <div className="flex justify-center">
        <div className="m-auto mx-4 mb-[40px] max-w-[1600px] space-y-4 text-center md:px-8 lg:mb-[70px] xl:mx-0">
          <h2 className="heading text-center">
            Build Confidence with Personalized Medical Programs
          </h2>
          <p className="sub-head">
            We cover all essential topics for Medical students.
          </p>
        </div>
      </div>
      <div className="mx-4 flex max-w-[1280px] flex-wrap justify-center gap-6 md:mx-auto">
        {data.map((item, i) => (
          <div className="m-0 w-[410px] p-0" key={i}>
            <Item title={item.name} icon={item.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedMedicalPrograms;

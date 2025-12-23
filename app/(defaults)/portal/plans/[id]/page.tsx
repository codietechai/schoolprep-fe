import { PlanCourseForm } from '@/components/plans';
import { Metadata } from 'next';
import React from 'react';
import CourseCrumb from '@/components/coursecrumbs';

export const metadata: Metadata = {
  title: 'Plans ',
};


const Plans = () => {
  return (
    <div className='app-panel'>
      <CourseCrumb />
      <PlanCourseForm />
    </div>
  );
};

export default Plans;

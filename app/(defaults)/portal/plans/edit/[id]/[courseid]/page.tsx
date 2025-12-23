import EditPlan from '@/components/plans/edit';
import { Metadata } from 'next';
import React from 'react';
import CourseCrumb from '@/components/coursecrumbs';

export const metadata: Metadata = {
  title: 'EditPlan',
};

const EditPlans = () => {
  return (
    <div className='app-panel'>
      <CourseCrumb />
      <EditPlan />
    </div>
  );
};

export default EditPlans;

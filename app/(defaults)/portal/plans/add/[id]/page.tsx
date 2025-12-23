import { Metadata } from 'next';
import React from 'react';
import AddPlan from '@/components/plans/add';
import CourseCrumb from '@/components/coursecrumbs';

export const metadata: Metadata = {
  title: 'Add new',
};

const AddNewPlan = () => {
  return (
    <div className='app-panel'>
      <CourseCrumb />
      <AddPlan />
    </div>
  );
};

export default AddNewPlan;

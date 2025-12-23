import { Metadata } from 'next';
import React from 'react';
import {  ProtectedCreateCourseForm } from '@/components/courses';
import LocationBoard from '@/components/locationboard';


export const metadata: Metadata = {
  title: 'Add new',
};

const AddCourseCategory = () => {
  return (
    <div className='app-panel'>
      <LocationBoard/>
      <ProtectedCreateCourseForm />
    </div>
  );
};

export default AddCourseCategory;

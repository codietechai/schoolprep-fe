import { Metadata } from 'next';
import React from 'react';
import {  ProtectedEditCourseForm } from '@/components/courses';
import LocationBoard from '@/components/locationboard';

export const metadata: Metadata = {
  title: 'Edit Course',
};

const EditCourse = () => {
  return (
    <div className='app-panel'>
      <LocationBoard />
      <ProtectedEditCourseForm />
    </div>
  );
};

export default EditCourse;

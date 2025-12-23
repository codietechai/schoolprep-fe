import { Metadata } from 'next';
import React from 'react';
import { ProtectedCreateCourseCategoryForm } from '@/components/course-category';
import LocationBoard from '@/components/locationboard';


export const metadata: Metadata = {
  title: 'Add new',
};

const AddCourseCategory = () => {
  return (
    <div className='app-panel'>
      <LocationBoard/>
      <ProtectedCreateCourseCategoryForm />
    </div>
  );
};

export default AddCourseCategory;

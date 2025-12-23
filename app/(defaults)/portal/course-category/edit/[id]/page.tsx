import { Metadata } from 'next';
import React from 'react';
import {  ProtectedUpdateCourseCategoryForm } from '@/components/course-category';
import LocationBoard from '@/components/locationboard';

export const metadata: Metadata = {
  title: 'Edit Category',
};

const EditCategory = () => {
  return (
    <div className='app-panel'>
      <LocationBoard />
      <ProtectedUpdateCourseCategoryForm />
    </div>
  );
};

export default EditCategory;

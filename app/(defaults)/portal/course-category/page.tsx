import {  ProtectedListCourseCategoryForm } from '@/components/course-category';
import { Metadata } from 'next';
import React from 'react';
import LocationBoard from '@/components/locationboard';

export const metadata: Metadata = {
  title: 'Course Category',
};

const CourseCategory = () => {
  return (
    <div className="app-panel">
      <LocationBoard />
      <ProtectedListCourseCategoryForm />
    </div>
  );
};

export default CourseCategory;

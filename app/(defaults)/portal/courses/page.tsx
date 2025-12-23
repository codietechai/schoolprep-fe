import { CourseList, ProtectedCourses } from '@/components/courses';
import { Metadata } from 'next';
import React from 'react';
import LocationBoard from '@/components/locationboard';

export const metadata: Metadata = {
  title: 'Course ',
};

const Course = () => {
  return (
    <div className='app-panel'>
      <LocationBoard />
      <ProtectedCourses />
    </div>
  );
};

export default Course;

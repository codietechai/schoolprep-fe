import { ProtectedQuestionsList } from '@/components/questions';
import { Metadata } from 'next';
import React from 'react';
import LocationBoard from '@/components/locationboard';

export const metadata: Metadata = {
  title: 'Course ',
};

const Course = () => {
  return (
    <div className="app-panel">
      <LocationBoard />
      <ProtectedQuestionsList />
    </div>
  );
};

export default Course;

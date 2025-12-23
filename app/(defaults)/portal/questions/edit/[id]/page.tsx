import { Metadata } from 'next';
import React from 'react';
import {  ProtectedEditQuestionsForm } from '@/components/questions';
import LocationBoard from '@/components/locationboard';

export const metadata: Metadata = {
  title: 'Edit Course',
};

const EditCourse = () => {
  return (
    <div className='app-panel'>
      <LocationBoard />
      <ProtectedEditQuestionsForm />
    </div>
  );
};

export default EditCourse;

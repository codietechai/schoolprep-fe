import { Metadata } from 'next';
import React from 'react';
import { ProtectedCreateQuestionForm } from '@/components/questions';
import LocationBoard from '@/components/locationboard';


export const metadata: Metadata = {
  title: 'Add new',
};

const AddCourseCategory = () => {
  return (
    <div className='app-panel'>
      <LocationBoard/>
      <ProtectedCreateQuestionForm />
    </div>
  );
};

export default AddCourseCategory;

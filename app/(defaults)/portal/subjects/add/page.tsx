import { Metadata } from 'next';
import React from 'react';
import {  ProtectedAddSubjectForm } from '@/components/subjects';
import LocationBoard from '@/components/locationboard';


export const metadata: Metadata = {
  title: 'Add new',
};

const AddSubjectCategory = () => {
  return (
    <div className='app-panel'>
      <LocationBoard />
      <ProtectedAddSubjectForm />
    </div>
  );
};

export default AddSubjectCategory;

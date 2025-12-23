import { Metadata } from 'next';
import React from 'react';
import { EditSubjectForm, ProtectedEditSubjectForm } from '@/components/subjects';
import LocationBoard from '@/components/locationboard';

export const metadata: Metadata = {
  title: 'Edit Subject',
};

const EditSubect = () => {
  return (
    <div className='app-panel'>
      <LocationBoard />
      <ProtectedEditSubjectForm />
    </div>
  );
};

export default EditSubect;

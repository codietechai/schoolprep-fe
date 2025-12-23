import { ProtectedSubjectList } from '@/components/subjects';
import { Metadata } from 'next';
import React from 'react';
import LocationBoard from '@/components/locationboard';

export const metadata: Metadata = {
  title: 'Subjects ',
};

const Subjects = () => {
  return (
    <div className='app-panel'>
      <LocationBoard />
      <ProtectedSubjectList />
    </div>
  );
};

export default Subjects;

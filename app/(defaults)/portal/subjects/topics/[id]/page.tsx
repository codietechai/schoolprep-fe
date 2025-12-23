import { Metadata } from 'next';
import React from 'react';
import LocationBoard from '@/components/locationboard';
import { ProtectedTopicForm } from '@/components/subjects/topics/topics';

export const metadata: Metadata = {
  title: 'Edit Subject',
};

const EditSubect = () => {
  return (
    <div className="app-panel">
      <LocationBoard />
      <ProtectedTopicForm />
    </div>
  );
};

export default EditSubect;

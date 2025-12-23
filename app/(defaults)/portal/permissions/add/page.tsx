import { Metadata } from 'next';
import React from 'react';
import { AddPermissionForm } from '@/components/permissions';

export const metadata: Metadata = {
  title: 'Add new',
};

const AddAdmin = () => {
  return (
    <div className='app-panel'>
      <AddPermissionForm />
    </div>
  );
};

export default AddAdmin;

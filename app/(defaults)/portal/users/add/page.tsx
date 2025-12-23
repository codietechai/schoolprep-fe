import { Metadata } from 'next';
import React from 'react';
import {  ProtectedAddUserForm } from '@/components/users';
import LocationBoard from '@/components/locationboard';

export const metadata: Metadata = {
  title: 'Add new',
};

const AddAdmin = () => {
  return (
    <div className='app-panel'>
      <LocationBoard />
      <ProtectedAddUserForm />
    </div>
  );
};

export default AddAdmin;

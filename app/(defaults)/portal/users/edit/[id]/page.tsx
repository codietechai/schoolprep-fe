import { Metadata } from 'next';
import React from 'react';
import {  ProtectedEditUserForm } from '@/components/users';
import LocationBoard from '@/components/locationboard';

export const metadata: Metadata = {
  title: 'Edit Admin',
};

const EditAdmin = () => {
  return (
    <div className='app-panel'>
      <LocationBoard />
      <ProtectedEditUserForm />
    </div>
  );
};

export default EditAdmin;

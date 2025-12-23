import { Metadata } from 'next';
import React from 'react';
import {  ProtectedEditRoleForm } from '@/components/roles';
import LocationBoard from '@/components/locationboard';

export const metadata: Metadata = {
  title: 'Edit Admin',
};

const EditAdmin = () => {
  return (
    <div className='app-panel'>
      <LocationBoard />
      <ProtectedEditRoleForm />
    </div>
  );
};

export default EditAdmin;

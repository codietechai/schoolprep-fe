import { Metadata } from 'next';
import React from 'react';
import {  ProtectedAddRoleForm } from '@/components/roles';
import LocationBoard from '@/components/locationboard';


export const metadata: Metadata = {
  title: 'Add new',
};

const AddAdmin = () => {
  return (
    <div className='app-panel'>
      <LocationBoard/>
      <ProtectedAddRoleForm />
    </div>
  );
};

export default AddAdmin;

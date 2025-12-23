import { Metadata } from 'next';
import React from 'react';
import { EditPermissionForm } from '@/components/permissions';
// import LocationBoard from '@/app/(defaults)/categories/add/location-board';

export const metadata: Metadata = {
  title: 'Edit Admin',
};

const EditAdmin = () => {
  return (
    <div className='app-panel'>
      {/* <LocationBoard /> */}
      <EditPermissionForm />
    </div>
  );
};

export default EditAdmin;

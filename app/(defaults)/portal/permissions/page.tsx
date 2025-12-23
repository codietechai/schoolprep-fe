import { PermissionList } from '@/components/permissions';
import { Metadata } from 'next';
import React from 'react';
// import LocationBoard from '../categories/add/location-board';

export const metadata: Metadata = {
  title: 'Permissions',
};

const Permissions = () => {
  return (
    <div className='app-panel'>
      {/* <LocationBoard /> */}
      <PermissionList />
    </div>
  );
};

export default Permissions;

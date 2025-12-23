import { UserTrashList } from '@/components/users';
import { Metadata } from 'next';
import React from 'react';
// import LocationBoard from '../../categories/add/location-board';

export const metadata: Metadata = {
  title: 'Users',
};

const Users = () => {
  return (
    <div className='app-panel'>
      {/* <LocationBoard /> */}
      <UserTrashList />
    </div>
  );
};

export default Users;

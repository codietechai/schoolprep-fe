import { List } from '@/components/admins';
import { Metadata } from 'next';
import React from 'react';
// import LocationBoard from '../categories/add/location-board';

export const metadata: Metadata = {
  title: 'Admins',
};

const Admins = () => {
  return (
    <div className='app-panel'>
      <List />
    </div>
  );
};

export default Admins;

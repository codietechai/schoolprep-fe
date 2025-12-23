import { Metadata } from 'next';
import React from 'react';

import { ViewContactData } from '@/components/contacts';
import LocationBoard from '@/components/locationboard';

export const metadata: Metadata = {
  title: 'View Contact',
};

const ViewContact = () => {
  return (
    <div className='app-panel'>
      <LocationBoard />
      <ViewContactData />
    </div>
  );
};

export default ViewContact;

import {  ProtectedContactList } from '@/components/contacts';
import { Metadata } from 'next';
import React from 'react';
import LocationBoard from '@/components/locationboard';

export const metadata: Metadata = {
  title: 'Contacts Category',
};

const ContactsCategory = () => {
  return (
    <div className='app-panel'>
      <LocationBoard />
      <ProtectedContactList />
    </div>
  );
};

export default ContactsCategory;

'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { fetchContactSingle } from '@/client/endpoints/contacts';

export const ViewContactData = () => {
  const { id } = useParams();
  const contactId = id;

  const {
    data: contactData,
    isLoading,
    isError,
  } = useQuery(
    ['GET_CONTACTS_KEY', contactId],
    () => fetchContactSingle(contactId as string),
    { enabled: !!contactId, refetchOnWindowFocus: false },
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data. Please try again later.</p>;
  }

  return (
    <div className="pt-5">
      <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
        <h6 className="mb-5 text-lg font-bold">View Contact Data</h6>
        <div>
          <p>
            <strong>Name:</strong> {contactData?.name || 'N/A'}
          </p>
          <p>
            <strong>Email:</strong> {contactData?.email || 'N/A'}
          </p>
          <p>
            <strong>Phone Number:</strong> {contactData?.phone || 'N/A'}
          </p>
          <p>
            <strong>Description:</strong> {contactData?.description || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewContactData;

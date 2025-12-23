'use client';
import React, { useEffect } from 'react';
import { useSession } from '@/hooks';
import { logoutRequest } from '@/client/endpoints';
import { useMutation } from 'react-query';
const page = () => {
  const { logout } = useSession();

  useEffect(() => {
    logout();
  }, []);

  return <div></div>;
};
export default page;

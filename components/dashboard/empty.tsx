'use client';
import React, { useEffect } from 'react';
import { useSession } from '@/hooks';
import { useRouter } from 'next/navigation';

export const Empty = () => {
  const router = useRouter();
  const { logout } = useSession();

  useEffect(() => {
    router.push('/portal/dashboard');
    // logout(false);
  }, []);

  return <></>;
};

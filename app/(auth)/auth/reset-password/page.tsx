import React from 'react';
import { Metadata } from 'next';

import ResetPassForm from '@/components/auth/reset-pass-form';

export const metadata: Metadata = {
  title: 'Reset-Password',
};

const ResetPassword = () => {
  return (
    <div>
      <div className="relative flex min-h-screen items-center justify-center bg-background px-6 py-10 dark:bg-[#060818] sm:px-16">
        <div className="relative w-full max-w-[560px] rounded-2xl p-2">
          <div className="p-10/60 relative flex flex-col justify-center rounded-2xl bg-white px-6 py-0 backdrop-blur-lg dark:bg-black/50 lg:min-h-[458px]">
            <div className="mx-auto w-full max-w-[432px]">
              <ResetPassForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

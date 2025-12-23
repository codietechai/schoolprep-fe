import React from 'react';
import { Metadata } from 'next';
import LoginForm from '@/components/auth/login-form';
import PaymentTesting from '@/components/PaymentTesting';

export const metadata: Metadata = {
  title: 'Login',
};

const BoxedSignIn = () => {
  return (
    <div>
      {/* <PaymentTesting /> */}
      <div className="relative flex min-h-screen items-center justify-center bg-background px-6 py-10 dark:bg-[#060818] sm:px-16">
        <div className="relative w-full max-w-[560px] rounded-2xl p-2">
          <div className="p-10/60 relative flex flex-col justify-center rounded-2xl bg-white px-6 py-0 backdrop-blur-lg dark:bg-black/50 lg:min-h-[558px]">
            <div className="mx-auto w-full max-w-[432px]">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxedSignIn;

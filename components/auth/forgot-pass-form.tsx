'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import IconLockDots from '@/components/icon/icon-lock-dots';
import IconMail from '@/components/icon/icon-mail';
import { forgetSchema, loginSchema } from '@/validations';
import { ErrorMessage } from '@/components/error-message';
import { ForgotRequest, TForgotPass, TLogin } from '@/client/endpoints';
import IconEye from '@/components/icon/icon-eye';
import Loginotp from '@/components/auth/login-otp';
import { showMessage } from '@/utils';
import Link from 'next/link';
import { LINKS } from '@/constants';
import { useRouter } from 'next/navigation';

const ForgetPassForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPass>({
    resolver: yupResolver(forgetSchema),
  });
  const router = useRouter();

  const [fieldType, setFieldType] = useState('password');
  const [showOtp, setShowOtp] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  // const { mutate } = useLogin();
  const { mutate } = useMutation(ForgotRequest, {
    onSuccess: res => {
      showMessage(res.data.message);
    },
    onError: err => {},
  });

  const onSubmit = (data: TForgotPass) => {
    mutate(data);
  };

  return (
    <>
      <div className="mb-10">
        <h1
          className="cursor-pointer text-center text-3xl font-extrabold uppercase !leading-snug text-[#000000] md:text-4xl"
          onClick={() => router.push('/')}>
          LOGO
        </h1>
      </div>
      <form
        className="space-y-5 dark:text-white"
        onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="Email">
            Email <small className="text-danger">*</small>
          </label>
          <div className="relative text-white-dark">
            <input
              id="Email"
              type="email"
              placeholder="Enter Email"
              className="form-input ps-5 placeholder:text-white-dark"
              {...register('email')}
            />
          </div>
          {errors.email?.message && (
            <ErrorMessage message={errors.email?.message} />
          )}
        </div>
        <button
          type="submit"
          className="btn btn-gradient !mt-6 w-full border-0 text-[20px] shadow-[0_10px_20px_-10px_#4B70F5]">
          Submit
        </button>
        <p className="mb-6 mt-4 text-center text-sm">
          Back to{' '}
          <Link
            href={LINKS.login.route}
            className="text-blue-500 underline hover:no-underline">
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default ForgetPassForm;

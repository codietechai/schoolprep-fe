'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import IconLockDots from '@/components/icon/icon-lock-dots';
import IconMail from '@/components/icon/icon-mail';
import { loginSchema } from '@/validations';
import { ErrorMessage } from '@/components/error-message';
import { TLogin } from '@/client/endpoints';
import IconEye from '@/components/icon/icon-eye';
import Loginotp from '@/components/auth/login-otp';
import { loginRequest } from '@/client/endpoints';
import Link from 'next/link';
import { LINKS } from '@/constants';
import { useRouter } from 'next/navigation';
import { showMessage } from '@/utils';

const LoginForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: yupResolver(loginSchema),
  });
  const router = useRouter();
  const [fieldType, setFieldType] = useState('password');
  const [showOtp, setShowOtp] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  // const { mutate } = useLogin();
  const { mutate } = useMutation(loginRequest, {
    onSuccess: res => {
      setUserDetails(res?.data?.data?.user);
      setShowOtp(true);
      showMessage(
        `A verification code has been sent to your email: ${watch('email')}`,
      );
    },
    onError: err => {
      setShowOtp(false);
      setUserDetails(null);
    },
  });

  const onSubmit = (data: TLogin) => {
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
      {showOtp ? (
        <Loginotp setShowOtp={setShowOtp} userDetails={userDetails} />
      ) : (
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
          <div>
            <label htmlFor="Password">
              Password <small className="text-danger">*</small>
            </label>
            <div className="relative text-white-dark">
              <input
                id="Password"
                type={fieldType}
                placeholder="Enter Password"
                className="form-input ps-5 placeholder:text-white-dark"
                {...register('password')}
              />
              <span
                className="absolute right-3 top-4 cursor-pointer"
                onClick={() => {
                  setFieldType(fieldType === 'text' ? 'password' : 'text');
                }}>
                <IconEye />
                {fieldType === 'text' && (
                  <span
                    style={{
                      position: 'absolute',
                      height: '20px',
                      borderLeft: 'solid 2px',
                      top: 0,
                      transform: 'rotate(45deg)',
                      left: '9px',
                    }}></span>
                )}
              </span>
            </div>
            {errors.password?.message && (
              <ErrorMessage message={errors.password?.message} />
            )}
          </div>
          <button
            type="submit"
            className="btn btn-gradient !mt-6 w-full border-0 text-[20px] shadow-[0_10px_20px_-10px_#4B70F5]">
            Login
          </button>
          <p className="mb-6 mt-4 text-center text-sm">
            {' '}
            <Link
              href={LINKS.forgotPassword.route}
              className="text-blue-500 underline hover:no-underline">
              Forgot Password?
            </Link>
          </p>

          <p className="mb-6 mt-4 text-center text-sm">
            Do not have an account?{' '}
            <Link
              href={LINKS.register.route}
              className="text-blue-500 underline hover:no-underline">
              Sign Up
            </Link>
          </p>
        </form>
      )}
    </>
  );
};

export default LoginForm;

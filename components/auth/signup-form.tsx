'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import IconLockDots from '@/components/icon/icon-lock-dots';
import IconMail from '@/components/icon/icon-mail';
import { loginSchema, resetSchema } from '@/validations';
import { ErrorMessage } from '@/components/error-message';
import {
  ResetpassRequest,
  SignupRequest,
  TLogin,
  TReset,
} from '@/client/endpoints';
import IconEye from '@/components/icon/icon-eye';
import Loginotp from '@/components/auth/login-otp';
import { SignupSchema } from '@/validations/signup';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { LINKS } from '@/constants/links';
import { showMessage } from '@/utils';

export type TSignup = {
  fullname: string;
  email: string;
  password: string;
  repassword: string;
  is_agreed: boolean;
};
const SignupForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignup>({
    resolver: yupResolver(SignupSchema),
  });
  const [fieldType, setFieldType] = useState('password');
  const [refieldType, setReFieldType] = useState('password');

  // const { mutate } = useLogin();
  const { mutate } = useMutation(SignupRequest, {
    onSuccess: res => {
      showMessage(res.data.message);
      router.push(LINKS.login.route);
    },
  });

  const onSubmit = (data: TSignup) => {
    const payload = {
      ...data,
    };
    mutate({
      fullname: payload.fullname,
      email: payload.email,
      password: payload.password,
      is_agreed: payload.is_agreed,
    });
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
        {/* Other form fields */}
        <div>
          <label htmlFor="Name">
            Full Name <small className="text-danger">*</small>
          </label>
          <div className="relative text-white-dark">
            <input
              id="Name"
              type="text"
              placeholder="Enter Full Name"
              className="form-input ps-5 placeholder:text-white-dark"
              {...register('fullname')}
              required
            />
          </div>
          {errors.fullname?.message && (
            <ErrorMessage message={errors.fullname?.message} />
          )}
        </div>
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
        <div>
          <label htmlFor="repassword">
            Confirm Password <small className="text-danger">*</small>
          </label>
          <div className="relative text-white-dark">
            <input
              id="repassword"
              type={refieldType}
              placeholder="Enter Confirm Password"
              className="form-input ps-5 placeholder:text-white-dark"
              {...register('repassword')}
            />
            <span
              className="absolute right-3 top-4 cursor-pointer"
              onClick={() => {
                setReFieldType(refieldType === 'text' ? 'password' : 'text');
              }}>
              <IconEye />
              {refieldType === 'text' && (
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
          {errors.repassword?.message && (
            <ErrorMessage message={errors.repassword?.message} />
          )}
        </div>

        {/* Checkbox and Text Line */}
        <div className="flex items-center space-x-2">
          <div>
            <input
              type="checkbox"
              id="terms"
              {...register('is_agreed')}
              className="form-checkbox"
            />
          </div>
          <label htmlFor="terms" className="cursor-pointer text-sm">
            I accept Company's{' '}
            <a href="#" className="text-blue-500 underline hover:no-underline">
              Terms & Conditions
            </a>{' '}
            as well as the{' '}
            <a href="#" className="text-blue-500 underline hover:no-underline">
              Data Privacy Statement
            </a>
            .
          </label>
        </div>
        {errors.is_agreed && (
          <ErrorMessage message={errors.is_agreed.message || ''} />
        )}

        <button
          type="submit"
          className="btn btn-gradient !mt-6 w-full border-0 text-[20px] shadow-[0_10px_20px_-10px_#4B70F5]">
          Sign Up
        </button>

        <p className="mb-6 mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link
            href="/auth/signin"
            className="text-blue-500 underline hover:no-underline">
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignupForm;

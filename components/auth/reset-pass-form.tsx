'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import IconLockDots from '@/components/icon/icon-lock-dots';
import IconMail from '@/components/icon/icon-mail';
import { loginSchema, resetSchema } from '@/validations';
import { ErrorMessage } from '@/components/error-message';
import { ResetpassRequest, TLogin } from '@/client/endpoints';
import IconEye from '@/components/icon/icon-eye';
import Loginotp from '@/components/auth/login-otp';
import { useParams, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { LINKS } from '@/constants/links';
import { showMessage } from '@/utils';
import Link from 'next/link';

export type TReset = {
  token: string;
  password: string;
  repassword: string;
};

const ResetPassForm = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TReset>({
    // @ts-ignore
    resolver: yupResolver(resetSchema),
  });
  const [fieldType, setFieldType] = useState('password');
  const [refieldType, setReFieldType] = useState('password');

  // const { mutate } = useLogin();
  const { mutate } = useMutation(ResetpassRequest, {
    onSuccess: res => {
      showMessage(res.data.message);
      router.push(LINKS.login.route);
    },
    onError: err => {},
  });

  const onSubmit = (data: TReset) => {
    // Add the token to the payload
    const payload = {
      ...data,
      token,
    };
    mutate({ token: token?.toString() as string, password: payload.password });
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
          <label htmlFor="password">Password</label>
          <div className="relative text-white-dark">
            <input
              id="password"
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
          <label htmlFor="repassword">Re-Enter Password</label>
          <div className="relative text-white-dark">
            <input
              id="repassword"
              type={refieldType}
              placeholder="Re-Enter Password"
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

export default ResetPassForm;

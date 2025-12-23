'use client';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useMutation } from 'react-query';
import { useLogin } from '@/hooks';
import { resendCodeRequest } from '@/client/endpoints';
import { showMessage } from '@/utils';

export default function Loginotp({
  setShowOtp,
  userDetails,
}: {
  setShowOtp: (p: boolean) => void;
  userDetails: any;
}) {
  const [otp, setOtp] = useState('');
  const { mutate } = useLogin();

  const { mutate: resendCode } = useMutation(resendCodeRequest, {
    onSuccess: res => {
      showMessage('Verification code resent. Please check your mailbox');
    },
    onError: err => {},
  });

  const onSubmit = () => {
    mutate({
      user_id: userDetails?.id,
      code: otp,
    });
  };

  const handleResendCode = () => {
    resendCode(userDetails?.id);
  };

  return (
    <div className="otp-container">
      {/* <label>Enter code</label> */}
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderSeparator={null}
        renderInput={props => (
          <input {...props} className={`otp-input ${props.className || ''}`} />
        )}
      />
      <p className="mt-3 flex">
        Didn't receive code?&nbsp;
        <span
          className="cursor-pointer font-bold text-primary"
          onClick={handleResendCode}>
          Resend
        </span>
      </p>
      <button
        type="button"
        className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_#4B70F5]"
        disabled={otp && otp?.length == 4 ? false : true}
        onClick={onSubmit}>
        Verify
      </button>
      <p className="mt-3 text-center">
        <span
          className="cursor-pointer font-bold text-primary"
          onClick={() => {
            setOtp('');
            setShowOtp(false);
          }}>
          Back to login
        </span>
      </p>
    </div>
  );
}

import React from 'react';

export type InputFieldProps = {
  label: string;
  type: string;
  defaultValue?: string;
  placeholder: string;
  starting?: string;
  register?: any;
  error?: string | any;
};

export default function InputField({
  label,
  type,
  defaultValue,
  placeholder,
  starting,
  register,
  error,
}: Partial<InputFieldProps>) {
  return (
    <div>
      <label>{label}</label>
      <div className="flex">
        {starting && (
          <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
            {starting}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={`form-input rounded ${starting && 'rounded-l-none'}`}
          {...register}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

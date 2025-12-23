import { Select as any } from '@mantine/core';
import React from 'react';

export default function ToggleInput({
  label,
  isVerticle,
  register,
  error,
}: {
  label: string;
  isVerticle?: boolean;

  register?: any;
  error?: string | any;
}) {
  return (
    <div>
      <div
        className={`${
          isVerticle ? 'flex flex-col' : 'flex items-start justify-between'
        } gap-2`}>
        <div className="font-medium">{label}</div>
        <div className="">
          <label className="w-12 h-6 relative">
            <input
              type="checkbox"
              className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
              id="custom_switch_checkbox1"
              {...register}
            />
            <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

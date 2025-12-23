'use client';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, ErrorMessage, Label, Textarea } from '@/components/common';

const PlanDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<any>({
    mode: 'onBlur',
  });

  const onSubmit = (data: any) => {
    let payload: any = {
      id: id,
      name: data.name,
      fee: data.fee,
    };

    // updateplan(payload);
  };
  return (
    <div className="pt-5">
      <div className="mb-5 rounded-md border bg-white p-6 dark:border-[#191e3a] dark:bg-black">
        <h6 className="mb-5 text-lg font-bold">Edit </h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Course Name */}
            <div>
              <Input
                label="Name"
                {...register('name')}
                placeholder="Enter Course Name"
                errorText={errors.name?.message}
                inverted
              />
            </div>

            <div>
              <Input
                label="Fee"
                {...register('fee')}
                placeholder="Enter Course Fee"
                type="number"
                errorText={errors.fee?.message}
                inverted
              />
            </div>

            <div className="mt-3 gap-3 sm:col-span-2 md:flex">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button
                onClick={() => router.back()}
                type="button"
                className="btn btn-neutral shadow-sm sm:col-span-2">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanDetails;

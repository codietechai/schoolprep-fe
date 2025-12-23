'use client';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/common';
import SelectInput from '../plan-pricing/inputSelect';
import {
  addPlanRequest,
  fetchCourseSingle,
  TAddPlan,
} from '@/client/endpoints';
import { LINKS } from '@/constants';
import { useMutation, useQuery } from 'react-query';
import { showMessage } from '@/utils';
import { addPlanSchema } from '@/validations/plans';

const AddPlan = () => {
  const { id } = useParams();
  const router = useRouter();
  const course = id;

  const { data: courseData, isLoading } = useQuery(
    ['course', course],
    () => fetchCourseSingle(course as string),
    { enabled: !!course, retry: 0, refetchOnWindowFocus: false },
  );

  // Form setup using react-hook-form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(addPlanSchema), // Add your course validation schema
  });

  const { mutate: addNewPlan } = useMutation(addPlanRequest, {
    onSuccess: (res: any) => {
      router.push(LINKS.plans.route(course as string)); // Navigate to the courses list after successful creation
      showMessage(res.message || 'plans created successfully');
    },
    onError: (error: any) => {
      showMessage(error.message || 'Something went wrong!', 'error');
    },
  });

  const onSubmit = (data: TAddPlan) => {
    let payload = {
      ...data,
      active: data.active,
      duration: data.duration,
      course: course.toString(),
    };
    addNewPlan(payload);
  };

  return (
    <div className="pt-5">
      <div className="mb-5 rounded-md border bg-white p-6 dark:border-[#191e3a] dark:bg-black">
        <h6 className="mb-5 text-lg font-bold">Add </h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Input
                label="Name"
                isMandatory
                {...register('name')}
                placeholder="Enter Plan Name"
                errorText={errors.name?.message}
                inverted
              />
            </div>
            <div>
              <Input
                label="Description "
                {...register('description')}
                placeholder="Enter Description "
                errorText={errors.description?.message}
                inverted
              />
            </div>
            <div>
              <Input
                label="Price"
                isMandatory
                {...register('price')}
                placeholder="Enter Plan Price"
                type="number"
                errorText={errors.fee?.message}
                inverted
              />
            </div>
            <div>
              <SelectInput
                label="Select Duration"
                isMandatory
                control={control}
                name="duration"
                options={[
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                  { value: '3', label: '3' },
                  { value: '4', label: '4' },
                  { value: '5', label: '5' },
                  { value: '6', label: '6' },
                  { value: '7', label: '7' },
                  { value: '8', label: '8' },
                  { value: '9', label: '9' },
                  { value: '10', label: '10' },
                  { value: '11', label: '11' },
                  { value: '12', label: '12' },
                ]}
                errorText={errors.active?.message as string}
              />
            </div>

            <div>
              <SelectInput
                label="Status"
                isMandatory
                control={control}
                name="active" // use "active" for the field name
                options={[
                  { value: 'true', label: 'Active' }, // Convert boolean to string
                  { value: 'false', label: 'Inactive' }, // Convert boolean to string
                ]}
                errorText={errors.active?.message as string}
              />
            </div>

            <div className="mt-3 gap-3 sm:col-span-2 md:flex">
              <button type="submit" className="btn btn-primary sm:col-span-2">
                Add
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

export default AddPlan;

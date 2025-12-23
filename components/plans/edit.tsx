'use client';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, ErrorMessage, Label, Textarea } from '@/components/common';
import SelectInput from '../plan-pricing/inputSelect';
import {
  editPlanRequest,
  FETCH_COURSES_KEY,
  fetchCourses,
  fetchPlanSingle,
  TEditPlan,
} from '@/client/endpoints';
import { useMutation, useQuery } from 'react-query';
import { addPlanSchema } from '@/validations/plans';
import { showMessage } from '@/utils';
import { LINKS } from '@/constants';
import { duration } from 'moment';
import Button from '../common/loader-button';

const durationOptions = Array.from({ length: 12 }, (_, index) => ({
  value: `${index + 1}`,
  label: `${index + 1}`,
}));

const EditPlan = () => {
  const { id } = useParams();
  const router = useRouter();
  const planId = id;

  const { data: planData, isLoading } = useQuery(
    ['plan', planId],
    () => fetchPlanSingle(planId as string),
    { enabled: !!planId, retry: 0, refetchOnWindowFocus: false },
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(addPlanSchema), // Add your course validation schema
  });

  useEffect(() => {
    if (planData) {
      reset({
        name: planData?.name || '',
        description: planData?.description || '',
        course: planData?.course || '',
        duration: String(planData?.duration),
        price: planData?.price || '',
        active: planData?.active ? 'true' : 'false',
      });
    }
  }, [planData, reset]);
  const { mutate: updatePlan, isLoading: updatingPlan } = useMutation(
    editPlanRequest,
    {
      onSuccess: (res: any) => {
        // router.push(LINKS.plans.route(planData.course as string));
        showMessage(res.message || 'Plan updated successfully');
      },
      onError: (error: any) => {
        showMessage(error.message || 'Something went wrong!', 'error');
      },
    },
  );

  const onSubmit = (data: TEditPlan) => {
    let payload: any = {
      ...data,
      active: data.active,
      duration: data.duration,
      id: planId,
    };

    updatePlan({
      id: planData?._id,
      ...payload,
    } as any);
  };

  return (
    <div className="pt-5">
      <div className="mb-5 rounded-md border bg-white p-6 dark:border-[#191e3a] dark:bg-black">
        <h6 className="mb-5 text-lg font-bold">Edit </h6>
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
                label="Description"
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
              <Button text="Update" loader={updatingPlan} />
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

export default EditPlan;

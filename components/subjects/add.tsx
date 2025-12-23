'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, ErrorMessage, Label, Textarea } from '@/components/common';
import { showMessage } from '@/utils';
import { TQueryData } from '@/types';
import { LINKS, DEFAULT_QUERY } from '@/constants';
import {
  addSubjectRequest,
  fetchCourses,
  FETCH_COURSES_KEY,
} from '@/client/endpoints';
import SelectInput from '../plan-pricing/inputSelect';
import { addSubjectSchema } from '@/validations';
import withPermissionGuard from '@/hooks/permissions/withRoleGuard';
const defaultQuery = DEFAULT_QUERY;

export type TAddSubject = {
  name: string;
  description?: string;
  active: string;
};

export const AddSubjectForm = () => {
  const router = useRouter();
  const [queryData, setQueryData] = useState<TQueryData>(defaultQuery);

  // Fetch the courses from the API

  const { data: courses, refetch } = useQuery(
    [FETCH_COURSES_KEY, queryData],
    () => fetchCourses(queryData),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  );
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(addSubjectSchema), // Assume addSubjectSchema is validated properly
  });

  // Mutation for adding a subject
  const { mutate: addNewSubject } = useMutation(addSubjectRequest, {
    onSuccess: (res: any) => {
      router.push(LINKS.subjects.edit(res.data.data._id)); // Redirect to subjects list page
      showMessage(res.data.message); // Show success message
    },
  });

  // Form submit handler
  const onSubmit = (data: TAddSubject) => {
    let payload = {
      ...data,
      active: data.active === 'true', // Convert active field to boolean
    };

    addNewSubject(payload); // Call mutation to add the subject
  };

  return (
    <div className="pt-5">
      <div>
        <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
          <h6 className="mb-5 text-lg font-bold">Add New </h6>
          <div className="flex flex-col sm:flex-row">
            <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Subject Name Input */}
              <div>
                <Input
                  inverted
                  label="Subject Name"
                  isMandatory
                  {...register('name')}
                  type="text"
                  placeholder="Enter Subject Name"
                  errorText={errors.name?.message as string}
                />
              </div>

              {/* Description Input */}
              <div>
                <Textarea
                  label="Description"
                  {...register('description')}
                  placeholder="Enter Subject Description"
                  errorText={errors.description?.message as string}
                />
              </div>

              {/* Status Dropdown (Boolean) */}
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
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit(onSubmit)}>
                  Save
                </button>
                <button
                  onClick={() => router.back()}
                  type="button"
                  className="btn btn-neutral shadow-sm sm:col-span-2">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProtectedAddSubjectForm = withPermissionGuard(
  AddSubjectForm,
  { subject: { create: true } },
  '/portal/dashboard',
);

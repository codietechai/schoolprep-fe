'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, ErrorMessage, Label, Textarea } from '@/components/common';
import { addCourseSchema } from '@/validations'; // Assuming you have a schema for validating the course form
import { showMessage } from '@/utils';
import { useMutation, useQuery } from 'react-query';
import { LINKS } from '@/constants';
import {
  addCourseRequest,
  fetchCategories,
  FETCH_CATEGORIES_KEY,
  FETCH_SUBJECTS_KEY,
  fetchSubjects,
} from '@/client/endpoints';
import ImageSelect, { ImageProps } from '../plan-pricing/image-select';
import SelectInput from '../plan-pricing/inputSelect';
import withPermissionGuard from '@/hooks/permissions/withRoleGuard';

// Types for payloads
type TAddCourse = {
  name: string;
  description?: string;
  category: string; // Category ID
  active: boolean;
  level: string;
  image?: string;
  image_data?: string;
  subjects: string[];
};

 const AddCourseForm = () => {
  const router = useRouter();

  // State to hold fetched categories
  const [categories, setCategories] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [images, setImages] = useState<ImageProps[]>([]);

  // Fetch available course categories
  const { data: fetchedCategories } = useQuery(
    [FETCH_CATEGORIES_KEY],
    () =>
      fetchCategories({ size: 1000, skip: 0, search: '', sorting: 'name ASC' }),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  );

  useEffect(() => {
    if (fetchedCategories) {
      setCategories(fetchedCategories?.data || []); // Assuming "data" holds the categories array
    }
  }, [fetchedCategories]);

  const { data: fetchedSubjects } = useQuery(
    [FETCH_SUBJECTS_KEY],
    () =>
      fetchSubjects({ size: 1000, skip: 0, search: '', sorting: 'name ASC' }),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  );

  useEffect(() => {
    if (fetchedSubjects) {
      setSubjects(fetchedSubjects?.data || []); // Assuming "data" holds the categories array
    }
  }, [fetchedSubjects]);

  // Form setup using react-hook-form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(addCourseSchema), // Add your course validation schema
  });

  const { mutate: addNewCourse } = useMutation(addCourseRequest, {
    onSuccess: (res: any) => {
      router.push(LINKS.courses.route);
      showMessage(res.message || 'Course created successfully');
    },
    onError: (error: any) => {
      showMessage(error.response.data.message || 'Something went wrong!', 'error');
    },
  });

  const onSubmit = (data: TAddCourse) => {
    const dataURL = images?.[0]?.dataURL ? images?.[0]?.dataURL : null;
    let payload = {
      ...data,
      active: data.active, 
    };
    if (dataURL) {
      payload = {
        ...payload,
        image_data: dataURL,
      };
    }

    addNewCourse(payload);
  };

  return (
    <div className="pt-5">
      <div className="mb-5 rounded-md border bg-white p-6 dark:border-[#191e3a] dark:bg-black">
        <h6 className="mb-5 text-lg font-bold">Add New </h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Input
                label="Course Name"
                {...register('name')}
                placeholder="Enter Course Name"
                errorText={errors.name?.message}
                inverted
                isMandatory
              />
            </div>
            <div>
              <Textarea
                label="Description"
                {...register('description')}
                placeholder="Enter Course Description"
                errorText={errors.description?.message?.toString()}
              />
            </div>

            <div>
              <SelectInput
                label="Category"
                control={control}
                name="category"
                options={categories.map(category => ({
                  value: category._id,
                  label: category.name,
                }))}
                errorText={errors.category?.message as string}
                isMandatory
              />
            </div>

            <div>
              <SelectInput
                label="Subjects"
                control={control}
                name="subjects"
                isMulti
                options={subjects.map(subjects => ({
                  value: subjects._id,
                  label: subjects.name,
                }))}
                errorText={errors.subjects?.message as string}
                isMandatory
              />
            </div>

            <div>
              <SelectInput
                label="Status"
                control={control}
                name="active" // use "active" for the field name
                options={[
                  { value: 'true', label: 'Active' }, // Convert boolean to string
                  { value: 'false', label: 'Inactive' }, // Convert boolean to string
                ]}
                errorText={errors.active?.message as string}
                isMandatory
              />
            </div>
            <div>
              <SelectInput
                label="Level"
                isMandatory
                control={control}
                name="level"
                options={[
                  { value: 'BEGINNER', label: 'Beginner' },
                  { value: 'INTERMEDIATE', label: 'Intermediate' },
                  { value: 'ADVANCED', label: 'Advanced' },
                ]}
                errorText={errors.level?.message as string}
              />
            </div>

            <ImageSelect images={images} setImages={setImages} />
            <div className="mt-3 gap-3 sm:col-span-2 md:flex">
              <button type="submit" className="btn btn-primary sm:col-span-2">
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
        </form>
      </div>
    </div>
  );
};

export  const ProtectedCreateCourseForm = withPermissionGuard(AddCourseForm, { course: { create: true } }, '/portal/dashboard');


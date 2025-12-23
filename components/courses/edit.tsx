'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Textarea } from '@/components/common';
import { addCourseSchema } from '@/validations';
import { showDeleteConfirmation, showMessage } from '@/utils';
import { useMutation, useQuery } from 'react-query';
import {
  editCourseRequest,
  fetchCategories,
  fetchCourseSingle,
  FETCH_CATEGORIES_KEY,
  FETCH_SUBJECTS_KEY,
  fetchSubjects,
} from '@/client/endpoints';
import ImageSelect, { ImageProps } from '../plan-pricing/image-select';
import SelectInput from '../plan-pricing/inputSelect';
import Button from '../common/loader-button';
import withPermissionGuard from '@/hooks/permissions/withRoleGuard';

export type TEditCourse = {
  name: string;
  description?: string;
  category: string;
  active: boolean;
  level: string;
  image?: string;
  image_data?: string;
  subjects: string[];
};

export const EditCourseForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const courseId = id; // Get the category ID from query params
  const [categories, setCategories] = useState<any[]>([]);
  const [images, setImages] = useState<ImageProps[]>([]);
  const [defaultImage, setdefaultImage] = useState<ImageProps[]>();
  const [subjects, setSubjects] = useState<any[]>([]);
  // const [topics, setTopics] = useState<any[]>([]);
  // Fetch categories for dropdown
  const { data: fetchedCategories } = useQuery(
    [FETCH_CATEGORIES_KEY],
    () =>
      fetchCategories({ size: 1000, skip: 0, search: '', sorting: 'name ASC' }),
    { retry: 0, refetchOnWindowFocus: false },
  );

  useEffect(() => {
    if (fetchedCategories) {
      setCategories(fetchedCategories?.data || []);
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

  // Fetch existing course data for editing
  const { data: courseData, isLoading } = useQuery(
    ['course', courseId],
    () => fetchCourseSingle(courseId as string),
    { enabled: !!courseId, retry: 0, refetchOnWindowFocus: false },
  );

  // Form setup
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(addCourseSchema),
  });

  // Populate form fields when course data is fetched
  useEffect(() => {
    if (courseData) {
      reset({
        name: courseData?.name || '',
        description: courseData?.description || '',
        category: courseData?.category || '',
        level: courseData?.level || '',
        subjects: courseData?.subjects || '',
        active: courseData?.active ? 'true' : 'false',
      });
      courseData?.image && setdefaultImage(courseData?.image);
    }
    if (courseData?.image) {
      setImages([{ dataURL: courseData?.image as string }]);
    }
  }, [courseData, reset]);

  // Mutation to update course
  const { mutate: updateCourse, isLoading: updatingCourse } = useMutation(
    editCourseRequest,
    {
      onSuccess: (res: any) => {
        // router.push(LINKS.courses.route);
        showMessage(res.message || 'Course updated successfully');
      },
      onError: (error: any) => {
        showMessage(error.message || 'Something went wrong!', 'error');
      },
    },
  );

  const onSubmit = (data: TEditCourse) => {
    const dataURL = images?.[0]?.dataURL ? images?.[0]?.dataURL : null;

    let payload: any = {
      ...data,
      active: data.active,
      // level:data.level,
      image: defaultImage ? defaultImage : '',
      id: courseId,
    };
    if (dataURL) {
      payload = {
        ...payload,
        image_data: dataURL.includes('data:') ? dataURL : '',
      };
    }
    updateCourse({
      id: courseData?._id,
      ...payload,
    } as any);
  };
  const deleteConfirmation = async () => {
    if (images.length === 0 && defaultImage === undefined) return;
    // if (defaultImage === undefined) return;
    const data = await showDeleteConfirmation(
      'Are you sure want to delete course image?',
    );
    if (data?.isConfirmed) {
      setdefaultImage(undefined);
      setImages([]);
    }
  };

  if (isLoading) return <div>Loading...</div>; // Show loader while fetching data

  return (
    <div className="pt-5">
      <div className="mb-5 rounded-md border bg-white p-6 dark:border-[#191e3a] dark:bg-black">
        <h6 className="mb-5 text-lg font-bold">Edit </h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Course Name */}
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
                isMandatory
                control={control}
                name="category"
                options={categories.map(category => ({
                  value: category._id,
                  label: category.name,
                }))}
                errorText={errors.category?.message as string}
              />
            </div>

            <div>
              <SelectInput
                label="Subjects"
                isMandatory
                control={control}
                name="subjects"
                isMulti
                options={subjects.map(subjects => ({
                  value: subjects._id,
                  label: subjects.name,
                }))}
                errorText={errors.category?.message as string}
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

            <div>
              <ImageSelect
                images={images}
                onRemove={deleteConfirmation}
                setImages={setImages}
                defaultImage={defaultImage}
              />
            </div>

            <div className="mt-3 gap-3 sm:col-span-2 md:flex">
              <Button text="Update" loader={updatingCourse} />
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

export const ProtectedEditCourseForm = withPermissionGuard(
  EditCourseForm,
  { course: { update: true } },
  '/portal/dashboard',
);

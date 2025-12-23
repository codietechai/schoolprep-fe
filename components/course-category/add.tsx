'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Textarea, ErrorMessage } from '@/components/common';
import { addCategorySchema } from '@/validations';
import { showMessage } from '@/utils';
import {
  addCategoryRequest,
  fetchCategories,
  FETCH_CATEGORIES_KEY,
} from '@/client/endpoints';
import { LINKS, DEFAULT_QUERY } from '@/constants';
const defaultQuery = DEFAULT_QUERY;
import { TQueryData } from '@/types';
import ImageSelect, { ImageProps } from '../plan-pricing/image-select';
import SelectInput from '../plan-pricing/inputSelect';
import withPermissionGuard from '@/hooks/permissions/withRoleGuard';

type TAddCategory = {
  name: string;
  description?: string;
  active: string;
  image?: string;
  image_data?: string;
};

export const AddCategoryForm = () => {
  const router = useRouter();
  const [queryData, setQueryData] = useState<TQueryData>(defaultQuery);
  const [images, setImages] = useState<ImageProps[]>([]);

  // Fetch categories for Parent Category dropdown
  const { data: categories, refetch } = useQuery(
    [FETCH_CATEGORIES_KEY, queryData],
    () => fetchCategories(queryData),
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
    resolver: yupResolver(addCategorySchema),
  });

  // React Query Mutation
  const { mutate: addCategory } = useMutation(addCategoryRequest, {
    onSuccess: (res: any) => {
      router.push(LINKS.courseCategory.route); // Redirect to course categories list
      showMessage(res.message || 'Category created successfully');
    },
    onError: (error: any) => {
      showMessage(`${error.response.data.message}`, 'error');
    },
  });

  // Submit Handler
  const onSubmit = (data: TAddCategory) => {
    const dataURL = images?.[0]?.dataURL ? images?.[0]?.dataURL : null;

    let payload = {
      ...data,
      active: data.active === 'true', // Convert active field to boolean
    };
    if (dataURL) {
      payload = {
        ...payload,
        image_data: dataURL,
      };
    }

  const response=  addCategory(payload);
  };

  return (
    <div className="pt-5">
      <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
        <h6 className="mb-5 text-lg font-bold">Add New</h6>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Category Name */}
            <div>
              <Input
                label="Category Name"
                placeholder="Enter Category Name"
                isMandatory
                {...register('name')}
                errorText={errors.name?.message}
                inverted
              />
            </div>

            {/* Description */}
            <div>
              <Textarea
                label="Description"
                placeholder="Enter category description"
                {...register('description')}
                errorText={errors.description?.message as string | undefined}
              />
            </div>

            <ImageSelect images={images} setImages={setImages} />

            {/* Active Status Dropdown */}
            <div>
              <SelectInput
                label="Status"
                isMandatory
                control={control}
                name="active"
                options={[
                  { value: 'true', label: 'Active' },
                  { value: 'false', label: 'Inactive' },
                ]}
                errorText={errors.active?.message as string}
              />
            </div>
          </div>

          {/* Submit Button */}
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
        </form>
      </div>
    </div>
  );
};


export  const ProtectedCreateCourseCategoryForm = withPermissionGuard(AddCategoryForm, { course_category: { create: true } }, '/portal/dashboard');

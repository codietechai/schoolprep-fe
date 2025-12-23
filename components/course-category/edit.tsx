'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Textarea, ErrorMessage } from '@/components/common';
import { addCategorySchema } from '@/validations';
import { showDeleteConfirmation, showMessage } from '@/utils';
import {
  fetchCategorySingle,
  editCategoryRequest,
  fetchCategories,
  FETCH_CATEGORIES_KEY,
} from '@/client/endpoints';
import { LINKS, DEFAULT_QUERY } from '@/constants';
import ImageSelect, { ImageProps } from '../plan-pricing/image-select';
import SelectInput from '../plan-pricing/inputSelect';
import withPermissionGuard from '@/hooks/permissions/withRoleGuard';
import Button from '../common/loader-button';

type TEditCategory = {
  name: string;
  description?: string;
  active: string;
  image?: string;
  image_data?: string;
};

export const EditCategoryForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const categoryId = id; // Get the category ID from query params
  const [images, setImages] = useState<ImageProps[]>([]);
  const [defaultImage, setdefaultImage] = useState<ImageProps[]>();

  const { data: categories } = useQuery(
    [FETCH_CATEGORIES_KEY, DEFAULT_QUERY],
    () => fetchCategories(DEFAULT_QUERY),
    { keepPreviousData: true },
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(addCategorySchema),
  });

  // Fetch single category data for editing
  const { data: categoryData, isLoading } = useQuery(
    ['category', categoryId],
    () => fetchCategorySingle(categoryId as string),
    {
      refetchOnWindowFocus: false,

      enabled: !!categoryId, // Only run query if categoryId exists
      retry: 0,
    },
  );

  // Update form fields when categoryData is fetched
  useEffect(() => {
    if (categoryData) {
      reset({
        name: categoryData?.name || '',
        description: categoryData?.description || '',

        active: categoryData?.active ? 'true' : 'false',
      });
      categoryData?.image && setdefaultImage(categoryData?.image);
      if (categoryData?.image) {
        setImages([{ dataURL: categoryData?.image as string }]);
      }
    }
  }, [categoryData, reset]);

  // Update category mutation
  const { mutate: updateCategory, isLoading: updatingCategory } = useMutation(
    editCategoryRequest,
    {
      onSuccess: res => {
        showMessage(res.data.message); // Show success message
        router.push(LINKS.courseCategory.route); // Redirect to category list
      },
      onError: () => {
        showMessage('Error updating category', 'error');
      },
    },
  );

  // Submit Handler
  const onSubmit = (data: TEditCategory) => {
    const dataURL = images?.[0]?.dataURL ? images?.[0]?.dataURL : null;

    let payload: any = {
      ...data,
      active: data.active === 'true',

      id: categoryId,
      image: defaultImage ? defaultImage : '',
    };
    if (dataURL) {
      payload = {
        ...payload,
        image_data: dataURL.includes('data:') ? dataURL : '',
      };
    }
    updateCategory({
      id: categoryData?._id,
      ...payload,
    } as any);
  };
  const deleteConfirmation = async () => {

    if (images.length === 0 && defaultImage === undefined) return;
    // if (defaultImage === undefined) return;
    const data = await showDeleteConfirmation(
      'Are you sure want to delete category image?',
    );
    if (data?.isConfirmed) {
      setImages([]);
      setdefaultImage(undefined);
    }
  };

  if (isLoading) return <div>Loading...</div>; // Show loader while fetching data

  return (
    <div className="pt-5">
      <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
        <h6 className="mb-5 text-lg font-bold">Edit </h6>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Category Name */}
            <div>
              <Input
                label="Category Name"
                placeholder="Enter Category Name"
                {...register('name')}
                errorText={errors.name?.message}
                inverted
                isMandatory
              />
            </div>

            {/* Description */}
            <div>
              <Textarea
                label="Description"
                placeholder="Enter category description"
                {...register('description')}
                errorText={errors.description?.message?.toString()}
              />
            </div>

            <ImageSelect
              images={images}
              onRemove={deleteConfirmation}
              setImages={setImages}
              defaultImage={defaultImage}
            />

            {/* Active Status Dropdown */}
            <div>
              <SelectInput
                label="Status"
                control={control}
                name="active"
                options={[
                  { value: 'true', label: 'Active' },
                  { value: 'false', label: 'Inactive' },
                ]}
                errorText={errors.status?.message as string}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-3 gap-3 sm:col-span-2 md:flex">
            <Button text="Update" loader={updatingCategory} />
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

export const ProtectedUpdateCourseCategoryForm = withPermissionGuard(
  EditCategoryForm,
  { course_category: { update: true } },
  '/portal/dashboard',
);

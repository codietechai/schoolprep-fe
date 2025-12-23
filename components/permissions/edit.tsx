'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, ErrorMessage, Label, Textarea } from '@/components/common';
import { showMessage } from '@/utils';
import {
  editPermissionRequest,
  fetchPermissionSingle,
  FETCH_PERMISSION_KEY,
} from '@/client/endpoints';
import { LINKS } from '@/constants';
import SelectInput from '../plan-pricing/inputSelect';
import { addPermissionSchema } from '@/validations'; // Assuming this schema is created for editing permissions
import Button from '../common/loader-button';

interface PermissionFormValues {
  name: string;
  description: string;
  active: boolean; // Ensure this is boolean
}

export const EditPermissionForm = () => {
  const { id } = useParams();
  const router = useRouter();

  // Fetch permission details using query
  const { data: permission } = useQuery(
    [FETCH_PERMISSION_KEY, id],
    () => fetchPermissionSingle(id),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: id ? true : false,
    },
  );

  // Form setup using react-hook-form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset, // Ensure reset is accessible
  } = useForm<PermissionFormValues>({
    mode: 'onBlur',
    // @ts-ignore
    resolver: yupResolver(addPermissionSchema), // Assuming you have schema validation for editing permission
  });

  // Initialize form with fetched data
  useEffect(() => {
    if (permission) {
      // Reset the form with fetched permission data
      reset({
        name: permission?.name ?? '',
        description: permission?.description ?? '',
        active: permission?.active ?? false, // Ensure this is a boolean
      });
    }
  }, [permission, reset]); // Reset when permission is available

  // Mutation for updating the permission
  const { mutate: editPermission, isLoading: updationgPermission } =
    useMutation(editPermissionRequest, {
      onSuccess: (res: any) => {
        router.push(LINKS.permissions.route); // Redirect to permissions list page
        showMessage(res.message); // Show success message
      },
    });

  const onSubmit = (data: PermissionFormValues) => {
    // The active field is now a boolean, no need for conversion
    editPermission({
      id: id,
      ...data,
    });
  };

  return (
    <div className="pt-5">
      <div>
        <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
          <h6 className="mb-5 text-lg font-bold">Edit Permission</h6>
          <div className="flex flex-col sm:flex-row">
            <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Permission Name Input */}
              <div>
                <Input
                  inverted
                  label="Permission Name"
                  isMandatory
                  {...register('name')}
                  type="text"
                  placeholder="Enter Permission Name"
                  errorText={errors.name?.message as string}
                />
              </div>

              {/* Description Input */}
              <div>
                <Textarea
                  label="Description"
                  {...register('description')}
                  placeholder="Enter Permission Description"
                  errorText={errors.description?.message as string}
                />
              </div>

              {/* Status Dropdown */}
              <div>
                <SelectInput
                  label="Status"
                  // @ts-ignore
                  control={control}
                  name="active"
                  value={permission?.active ? 'true' : 'false'} // Ensure the value matches the options
                  options={[
                    { value: 'true', label: 'Active' },
                    { value: 'false', label: 'Inactive' },
                  ]}
                  errorText={errors.active?.message as string}
                />
              </div>

              {/* Save Button */}
              <div className="mt-3 gap-3 sm:col-span-2 md:flex">
                <Button
                  text="Save Changes"
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  loader={updationgPermission}
                />
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

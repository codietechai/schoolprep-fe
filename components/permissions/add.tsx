'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, ErrorMessage, Label, Textarea } from '@/components/common';
import { showMessage } from '@/utils';
import { addPermissionRequest } from '@/client/endpoints';
import { LINKS } from '@/constants';
import SelectInput from '../plan-pricing/inputSelect';
import { addPermissionSchema } from '@/validations';

export const AddPermissionForm = () => {
  const router = useRouter();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(addPermissionSchema),
  });

  // Mutation for adding permission
  const { mutate: addNewPermission } = useMutation(addPermissionRequest, {
    onSuccess: (res: any) => {
      router.push(LINKS.permissions.route); // Redirect to permissions list page
      showMessage(res.data.message); // Show success message
    },
  });

  // Form submit handler
  const onSubmit = (data: any) => {
    data.active = data.active === 'true'; // 'true' becomes true, 'false' becomes false

    addNewPermission(data);
  };

  return (
    <div className="pt-5">
      <div>
        <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
          <h6 className="mb-5 text-lg font-bold">Add New Permission</h6>
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

              {/* Status Dropdown (Boolean) */}
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
                />
              </div>

              <div className="mt-3 gap-3 sm:col-span-2 md:flex">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit(onSubmit)}>
                  Save Permission
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

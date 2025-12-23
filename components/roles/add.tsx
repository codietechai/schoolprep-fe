'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Label, Textarea, InputSelect } from '@/components/common';
import { addRoleSchema } from '@/validations';
import { showMessage } from '@/utils';
import { useMutation, useQuery } from 'react-query';
import { LINKS } from '@/constants';
import {
  addRoleRequest,
  fetchPermissions,
  FETCH_PERMISSION_KEY,
} from '@/client/endpoints';
import { DefaultValue, BooleanValues } from '@/types';
import withPermissionGuard from '@/hooks/permissions/withRoleGuard';

const booleanOptions = Object.values(BooleanValues).map(value => ({
  id: value,
  name: value,
}));

interface Permission {
  entity: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

interface RoleFormValues {
  name: string;
  description: string;
  role_permissions: Record<string, Permission>;
  active: boolean | string;
}
 const AddRoleForm = () => {
  const router = useRouter();

  const [permissions, setPermissions] = useState<any>();

  const { data: fetchedPermissions } = useQuery(
    [FETCH_PERMISSION_KEY],
    () =>
      fetchPermissions({
        size: 1000,
        skip: 0,
        search: '',
        sorting: 'id DESC',
      }),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  );

  useEffect(() => {
    if (fetchedPermissions) {
      setPermissions(fetchedPermissions?.data || []);
    }
  }, [fetchedPermissions]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(addRoleSchema),
  });

  const { mutate: addNewRole } = useMutation(addRoleRequest, {
    onSuccess: (res: any) => {
      router.push(LINKS.roles.route);
      showMessage(res.message || 'Role created successfully');
    },
    onError: (error: any) => {
      showMessage(error.response.data.message || 'Something went wrong!', 'error');
    },
  });

  const onSubmit = (data: RoleFormValues) => {
    const formattedPermissions = permissions.reduce(
      (acc: any, permission: any) => {
        acc[permission.name] = {
          create: permission.create || false,
          read: permission.read || false,
          update: permission.update || false,
          delete: permission.delete || false,
        };
        return acc;
      },
      {} as Record<string, Permission>,
    );

    const payload: any = {
      name: data.name,
      description: data.description,
      role_permissions: formattedPermissions,
      active: data.active == BooleanValues.YES ? true : false,
    };

    addNewRole(payload);
  };

  const handlePermissionChange = (
    index: number,
    field: keyof Permission,
    value: boolean,
  ) => {
    setPermissions((prev: any) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  return (
    <div className="pt-5">
      <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
        <h6 className="mb-5 text-lg font-bold">Add New </h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Input
                label="Role Name"
                {...register('name')}
                placeholder="Enter Role Name"
                errorText={errors.name?.message}
                inverted={true}
                isMandatory
              />
            </div>
            <div>
              <Textarea
                label="Description"
                {...register('description')}
                placeholder="Enter Role Description"
                errorText={errors.description?.message as string | undefined}
              />
            </div>
            {/* Permissions */}
            <div className="sm:col-span-2">
              <Label label="Permissions" />
              {permissions?.map((perm: any, index: any) => (
                <div key={perm.name} className="grid grid-cols-5 gap-4">
                  <strong className="capitalize">
                    {perm.name.replace(/_/g, ' ')}
                  </strong>
                  {['create', 'read', 'update', 'delete'].map(action => (
                    <label
                      key={action}
                      className="flex items-center capitalize">
                      <input
                        type="checkbox"
                        checked={perm[action as keyof Permission]}
                        onChange={e =>
                          handlePermissionChange(
                            index,
                            action as keyof Permission,
                            e.target.checked,
                          )
                        }
                      />{' '}
                      &nbsp;&nbsp;
                      {action}
                    </label>
                  ))}
                </div>
              ))}
            </div>

            <div>
              <Controller
                control={control}
                name="active"
                shouldUnregister={false}
                rules={{ required: true }}
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <InputSelect
                    isMandatory
                    onChange={(option: any) =>
                      onChange((option as DefaultValue).id)
                    }
                    options={booleanOptions}
                    getOptionValue={(option: any) =>
                      (option as DefaultValue).id.toString()
                    }
                    getOptionLabel={(option: any) =>
                      (option as DefaultValue).name
                    }
                    value={booleanOptions.find(
                      item => item.id === value?.toString(),
                    )}
                    label="Active"
                    errorText={errors.active?.message}
                    onBlur={onBlur}
                  />
                )}
              />
            </div>

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


export  const ProtectedAddRoleForm = withPermissionGuard(AddRoleForm, { role: { create: true } }, '/portal/dashboard');

'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Input,
  ErrorMessage,
  Label,
  Textarea,
  InputSelect,
} from '@/components/common';
import { userSchema } from '@/validations';
import { showMessage } from '@/utils';
import { fetchRoles, FETCH_ROLE_KEY } from '@/client/endpoints';
import { LINKS } from '@/constants';
import 'react-phone-number-input/style.css';
import PhoneInput, {
  isValidPhoneNumber,
  getCountryCallingCode,
} from 'react-phone-number-input';
import { phoneStyles } from '@/constants';
import { addUserRequest } from '@/client/endpoints';
import { TAddUser } from '@/types';
import SelectInput from '../plan-pricing/inputSelect';
import countryList from 'country-list';
import ImageSelect, { ImageProps } from '../plan-pricing/image-select';
import { DefaultValue, BooleanValues } from '@/types';
import withPermissionGuard from '@/hooks/permissions/withRoleGuard';

const defaultCountryCode = 'US';

export const AddUserForm = () => {
  const router = useRouter();
  const [roleOptions, setRoleOptions] = useState<DefaultValue[] | null>();
  const [countryCode, setCountryCode] = useState('1');
  const [images, setImages] = useState<ImageProps[]>([]);

  const { data: roles } = useQuery(
    [FETCH_ROLE_KEY],
    () =>
      fetchRoles({
        size: 1000,
        skip: 0,
        search: '',
        sorting: 'id DESC',
      }),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
      refetchOnMount: false,
    },
  );

  useEffect(() => {
    if (roles && roles?.data?.length) {
      let roleValues: DefaultValue[] = [];
      roles?.data?.map(role => {
        roleValues.push({
          // @ts-ignore
          id: role?._id?.toString(),
          name: role?.name,
        });
      });
      setRoleOptions(roleValues);
    }
  }, [roles]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TAddUser | any>({
    mode: 'onBlur',
    resolver: yupResolver(userSchema),
  });

  const { mutate: addNewUser } = useMutation(addUserRequest, {
    onSuccess: (res: any) => {
      router.push(LINKS.users.route);
      showMessage(res.message || 'User created successfully');
    },
  });

  const onSubmit = (data: TAddUser) => {
    const dataURL = images?.[0]?.dataURL ? images?.[0]?.dataURL : null;

    const phoneCode = `+${countryCode}`;
    const phoneNumber = data.contact_number?.replace(phoneCode, '');
    let payload = {
      ...data,
      contact_number: phoneNumber,
      phone_code: phoneCode,
    };
    if (dataURL) {
      payload = {
        ...payload,
        profile_photo_data: dataURL,
      };
    }
    addNewUser(payload);
  };

  return (
    <div className="pt-5">
      <div>
        <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
          <h6 className="mb-5 text-lg font-bold">Add New</h6>
          <div className="flex flex-col sm:flex-row">
            <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Controller
                  control={control}
                  name="role"
                  shouldUnregister={false}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => (
                    <InputSelect
                      isMandatory
                      onChange={(option: DefaultValue) => onChange(option?.id)}
                      options={roleOptions ?? []}
                      getOptionValue={(option: DefaultValue) =>
                        option?.id?.toString()
                      }
                      getOptionLabel={(option: DefaultValue) => option?.name}
                      value={
                        roleOptions &&
                        roleOptions.find(item => item.id === value?.toString())
                      }
                      label="Role"
                      errorText={errors.role?.message}
                      onBlur={onBlur}
                    />
                  )}
                />
              </div>
              <div>
                <Input
                  inverted
                  label="Full Name"
                  {...register('full_name')}
                  type="text"
                  placeholder="Enter Full Name"
                  errorText={errors.full_name?.message as string}
                  isMandatory
                />
              </div>

              <div>
                <Input
                  inverted
                  label="Email"
                  {...register('email')}
                  type="text"
                  placeholder="name@example.com"
                  errorText={errors.email?.message as string}
                  isMandatory
                />
              </div>

              <div>
                <Input
                  inverted
                  label="Password"
                  {...register('password')}
                  type="password"
                  placeholder="Enter password"
                  errorText={errors.password?.message as string}
                  isMandatory
                />
              </div>

              <div>
                <Label label="Phone number">
                  <small className="text-danger">*</small>
                </Label>
                <Controller
                  name="contact_number"
                  control={control}
                  rules={{
                    validate: value => isValidPhoneNumber(value),
                  }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <PhoneInput
                        value={value}
                        onChange={onChange}
                        isMandatory
                        onCountryChange={e => {
                          // @ts-ignore
                          const code = getCountryCallingCode(
                            e ?? defaultCountryCode,
                          );
                          setCountryCode(code);
                        }}
                        defaultCountry={defaultCountryCode}
                        id="phone-input"
                        style={phoneStyles}
                      />
                    );
                  }}
                />
                <ErrorMessage
                  errorText={errors.contact_number?.message as string}
                />
              </div>

              <SelectInput
                label="Country"
                control={control}
                name="country_code"
                options={countryList.getData().map(country => {
                  return { value: country.code, label: country.name };
                })}
                errorText={errors.country_code?.message as string}
                isMandatory
              />

              <div>
                <SelectInput
                  label="Status"
                  control={control}
                  name="status"
                  options={[
                    { value: 'ACTIVE', label: 'Active' },
                    { value: 'INACTIVE', label: 'Inactive' },
                  ]}
                  errorText={errors.status?.message as string}
                  isMandatory
                />
              </div>

              <ImageSelect images={images} setImages={setImages} />
              <div>
                <Textarea
                  label="Address"
                  {...register('address')}
                  placeholder="Enter Address"
                  errorText={errors.address?.message as string}
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

export const ProtectedAddUserForm = withPermissionGuard(
  AddUserForm,
  { user: { create: true } },
  '/portal/dashboard',
);

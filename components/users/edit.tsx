'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'next/navigation';
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
import { showDeleteConfirmation, showMessage } from '@/utils';
import {
  fetchRoles,
  FETCH_ROLE_KEY,
  editUserRequest,
  GET_USER_KEY,
  fetchUser,
} from '@/client/endpoints';
import { DefaultValue } from '@/types';
import { LINKS } from '@/constants';
import 'react-phone-number-input/style.css';
import PhoneInput, {
  isValidPhoneNumber,
  getCountryCallingCode,
} from 'react-phone-number-input';
import { phoneStyles } from '@/constants';
import SelectInput from '../plan-pricing/inputSelect';
import countryList from 'country-list';
import { TAddUser, TEditUser } from '@/types';
import ImageSelect, { ImageProps } from '../plan-pricing/image-select';
import Button from '../common/loader-button';
import withPermissionGuard from '@/hooks/permissions/withRoleGuard';

const defaultCountryCode = 'US';

export const EditUserForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const [roleOptions, setRoleOptions] = useState<DefaultValue[] | null>(null);
  const [countryCode, setCountryCode] = useState('1');
  const [images, setImages] = useState<ImageProps[]>([]);
  const [defaultImage, setdefaultImage] = useState<string>('');

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
    },
  );

  useEffect(() => {
    if (roles && roles?.data?.length) {
      let roleValues: DefaultValue[] = [];
      roles?.data?.map(role => {
        roleValues.push({
          // @ts-ignore
          id: role?._id?.toString(),
          name: role.name,
        });
      });
      if (user?.profile_photo) {
        setImages([{ dataURL: user?.profile_photo as string }]);
      }
      setRoleOptions(roleValues);
    }
  }, [roles]);

  const { data: user } = useQuery(
    [GET_USER_KEY, id],
    () => fetchUser(id as string),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: id ? true : false,
    },
  );

  useEffect(() => {
    if (user && user?.id) {
      reset({
        email: user?.email ?? '',
        full_name: user?.full_name ?? '',

        contact_number: user?.contact_number
          ? `${user?.phone_code}${user?.contact_number}`
          : '',
        status: user?.status ?? '',
        address: user?.address ?? '',
        country_code: user?.country_code ?? '',
        role: user?.role ?? '',
      });
    }
    setdefaultImage(user?.profile_photo as string);
  }, [user]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TEditUser>({
    //@ts-ignore
    resolver: yupResolver(userSchema),
  });
  useEffect(() => {
    if (user) {
      // Set default values for the form
      setValue('email', user.email);
      setValue('full_name', user.full_name);
      setValue(
        'contact_number',
        user?.contact_number
          ? `${user?.phone_code}${user?.contact_number}`
          : '',
      );
      setValue('status', user?.status);
      setValue('address', user?.address);
      setValue('country_code', user?.country_code);
      setValue('phone_code', user?.phone_code);
      setValue('role', user?.role);
    }
  }, [user, setValue]);

  const { mutate: editUser, isLoading } = useMutation(editUserRequest, {
    onSuccess: res => {
      // router.push(LINKS.users.route);
      showMessage(res.data.message);
    },
  });

  const onSubmit:any = (data: TEditUser) => {
    const dataURL = images?.[0]?.dataURL ? images?.[0]?.dataURL : null;

    const phoneCode = `+${countryCode}`;
    const phoneNumber = data.contact_number?.replace(phoneCode, '');

    let payload = {
      ...data,
      contact_number: phoneNumber,
      phone_code: phoneCode,
      profile_photo: defaultImage ? defaultImage : '',
    };
    if (dataURL) {
      payload = {
        ...payload,
        profile_photo_data: dataURL.includes('data:') ? dataURL : '',
      };
    }
    editUser({
      // @ts-ignore
      id: user?._id,
      ...payload,
    } as any);
  };

  const deleteConfirmation = async () => {
    if (images.length === 0 && defaultImage === '') return;
    const data = await showDeleteConfirmation(
      'Are you sure want to delete profile image?',
    );
    if (data?.isConfirmed) {
      setdefaultImage('');
      setImages([]);
    }
  };

  return (
    <div className="pt-5">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
          <h6 className="mb-5 text-lg font-bold">Edit</h6>
          <div className="flex">
            <div className="flex w-[calc(100%+150px)] flex-col sm:flex-row">
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
                        onChange={(option: DefaultValue) =>
                          onChange(option?.id)
                        }
                        options={roleOptions ?? []}
                        getOptionValue={(option: DefaultValue) =>
                          option?.id?.toString()
                        }
                        getOptionLabel={(option: DefaultValue) => option?.name}
                        value={
                          roleOptions &&
                          roleOptions.find(
                            item => item.id === value?.toString(),
                          )
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
                  <Label label="Phone number">
                    <small className="text-danger">*</small>
                  </Label>
                  <Controller
                    name="contact_number"
                    control={control}
                    rules={{
                      validate: value => isValidPhoneNumber(value ?? ''),
                    }}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <PhoneInput
                          value={value}
                          onChange={onChange}
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
                          isMandatory
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
                  control={control as any}
                  {...register('country_code')}
                  options={countryList.getData().map(country => {
                    return { value: country.code, label: country.name };
                  })}
                  errorText={errors.country_code?.message as string}
                  isMandatory
                />

                <div>
                  <SelectInput
                    label="Status"
                    control={control as any}
                    name="status"
                    options={[
                      { value: 'ACTIVE', label: 'Active' },
                      { value: 'INACTIVE', label: 'Inactive' },
                    ]}
                    errorText={errors.status?.message as string}
                    isMandatory
                  />
                </div>
                <ImageSelect
                  images={images}
                  onRemove={deleteConfirmation}
                  setImages={setImages}
                />
                <div>
                  <Textarea
                    label="Address"
                    {...register('address')}
                    placeholder="Enter Address"
                    errorText={errors.address?.message as string}
                  />
                </div>

                <div className="mt-3 gap-3 sm:col-span-2 md:flex">
                  <Button text="Update" loader={isLoading} />
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
        </form>
      </div>
    </div>
  );
};

export const ProtectedEditUserForm = withPermissionGuard(
  EditUserForm,
  { user: { update: true } },
  '/portal/dashboard',
);

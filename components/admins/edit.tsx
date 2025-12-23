'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Input,
  InputSelect,
  ErrorMessage,
  Label,
  Textarea,
} from '@/components/common';
import { editAdminSchema } from '@/validations';
import { showMessage } from '@/utils';
import {
  GET_ADMIN_KEY,
  fetchAdmin,
  editAdminRequest,
  TEditAdmin,
} from '@/client/endpoints';
import { DefaultValue, BooleanValues } from '@/types';
import { LINKS } from '@/constants';
import 'react-phone-number-input/style.css';
import PhoneInput, {
  isValidPhoneNumber,
  getCountryCallingCode,
} from 'react-phone-number-input';
import { phoneStyles } from '@/constants';
import Button from '../common/loader-button';

const booleanOptions = Object.values(BooleanValues).map(value => ({
  id: value,
  name: value,
}));

const defaultCountryCode = 'US';

export const EditForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const [countryCode, setCountryCode] = useState('1');

  const { data: admin } = useQuery(
    [GET_ADMIN_KEY, id],
    () => fetchAdmin(id as string),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: id ? true : false,
    },
  );

  useEffect(() => {
    if (admin && admin?.id) {
      reset({
        email: admin?.email ?? '',
        full_name: admin?.full_name ?? '',
        contact_number: admin?.contact_number
          ? `${admin?.phone_code}${admin?.contact_number}`
          : '',
        address: admin?.address ?? '',
        active: admin?.active == 1 ? BooleanValues.YES : BooleanValues.NO,
      });
    }
  }, [admin]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TEditAdmin>({
    // @ts-ignore
    resolver: yupResolver(editAdminSchema),
    defaultValues: {},
  });

  const { mutate: editAdmin, isLoading: updatingAdmin } = useMutation(
    editAdminRequest,
    {
      onSuccess: res => {
        router.push(LINKS.admins.route);
        showMessage(res.data.message);
      },
    },
  );

  const onSubmit = (data: TEditAdmin) => {
    const phoneCode = `+${countryCode}`;
    const phoneNumber = data.contact_number.replace(phoneCode, '');
    let payload = {
      ...data,
      contact_number: phoneNumber,
      phone_code: phoneCode,
      active: data.active === BooleanValues.YES ? '1' : '0',
    };
    editAdmin({
      id: admin?.id,
      ...payload,
    });
  };

  return (
    <div className="pt-5">
      <div>
        <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
          <h6 className="mb-5 text-lg font-bold">Edit</h6>
          <div className="flex">
            <div className="w-[190px]">
              <Image
                src="/assets/images/default-user.jpg"
                alt="img"
                className="mb-5 rounded-full"
                height={120}
                width={120}
              />
            </div>
            <div className="flex w-[calc(100%+150px)] flex-col sm:flex-row">
              <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Input
                    isMandatory
                    inverted
                    label="Full Name"
                    {...register('full_name')}
                    type="text"
                    errorText={errors.full_name?.message}
                    placeholder="Enter Full Name"
                  />
                </div>
                <div>
                  <Textarea
                    isMandatory
                    label="Address"
                    {...register('address')}
                    errorText={errors.address?.message}
                    placeholder="Enter Address"
                  />
                </div>
                <div>
                  <Input
                    isMandatory
                    inverted
                    label="Email"
                    {...register('email')}
                    type="text"
                    errorText={errors.email?.message}
                    placeholder="name@example.com"
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
                    errorText={errors.contact_number?.message ?? ''}
                  />
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
                <div className="mt-3 sm:col-span-2">
                  <Button
                    text="Save Changes"
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    loader={updatingAdmin}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

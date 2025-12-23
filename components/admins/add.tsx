"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import PasswordChecklist from "react-password-checklist";
import { useMutation, useQuery } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Input,
  InputSelect,
  ErrorMessage,
  Label,
  Textarea,
} from "@/components/common";
import { addAdminSchema } from "@/validations";
import { showMessage } from "@/utils";
import {
  addAdminRequest,
  TAddAdmin,
} from "@/client/endpoints";
import { DefaultValue, BooleanValues } from "@/types";
import { LINKS } from "@/constants";
import "react-phone-number-input/style.css";
import PhoneInput, {
  isValidPhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import { phoneStyles } from "@/constants";

const booleanOptions = Object.values(BooleanValues).map((value) => ({
  id: value,
  name: value,
}));

const defaultCountryCode = "US";

export const AddForm = () => {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState("1");
  const [isValidPassword, setIsValidPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<TAddAdmin>({
    mode: "onBlur",
    resolver: yupResolver(addAdminSchema),
    defaultValues: {},
  });

  const { mutate: addNewAdmin } = useMutation(addAdminRequest, {
    onSuccess: (res) => {
      router.push(LINKS.admins.route);
      showMessage(res.data.message);
    },
  });

  const onSubmit = (data: TAddAdmin) => {
    const phoneCode = `+${countryCode}`;
    const phoneNumber = data.contact_number.replace(phoneCode, "");
    let payload = {
      ...data,
      contact_number: phoneNumber,
      phone_code: phoneCode,
      active: data.active === BooleanValues.YES ? "1" : "0",
    };
    addNewAdmin({
      ...payload,
    });
  };

  return (
    <div className="pt-5">
      <div>
        <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
          <h6 className="mb-5 text-lg font-bold">Add New</h6>
          <div className="flex flex-col sm:flex-row">
            <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Input
                  isMandatory
                  inverted
                  label="Full Name"
                  {...register("full_name")}
                  type="text"
                  errorText={errors.full_name?.message}
                  placeholder="Enter Full Name"
                />
              </div>
              <div>
                <Textarea
                  isMandatory
                  label="Address"
                  {...register("address")}
                  errorText={errors.address?.message}
                  placeholder="Enter Address"
                />
              </div>
              <div>
                <Input
                  isMandatory
                  inverted
                  label="Email"
                  {...register("email")}
                  type="text"
                  errorText={errors.email?.message}
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <Input
                  isMandatory
                  inverted
                  label="Password"
                  {...register("password")}
                  type="text"
                  // errorText={errors.password?.message}
                  placeholder="Enter Password"
                />
                {watch("password") && (
                  <div className="mt-2">
                    <PasswordChecklist
                      rules={["minLength", "specialChar", "number", "capital"]}
                      minLength={5}
                      value={watch("password")}
                      onChange={(e) => setIsValidPassword(e)}
                    />
                  </div>
                )}
              </div>
              <div>
                <Label label="Phone number">
                  <small className="text-danger">*</small>
                </Label>
                <Controller
                  name="contact_number"
                  control={control}
                  rules={{
                    validate: (value) => isValidPhoneNumber(value),
                  }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <PhoneInput
                        value={value}
                        onChange={onChange}
                        onCountryChange={(e) => {
                          // @ts-ignore
                          const code = getCountryCallingCode(
                            e ?? defaultCountryCode
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
                  errorText={errors.contact_number?.message ?? ""}
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
                      getOptionLabel={(option: any) => (option as DefaultValue).name}
                      value={booleanOptions.find(
                        (item) => item.id === value?.toString()
                      )}
                      label="Active"
                      errorText={errors.active?.message}
                      onBlur={onBlur}
                    />
                  )}
                />
              </div>
              <div className="mt-3 sm:col-span-2">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit(onSubmit)}
                  disabled={!isValidPassword}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

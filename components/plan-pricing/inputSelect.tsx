import React from 'react';
import { Controller, Control, RegisterOptions } from 'react-hook-form';
import Select, { components } from 'react-select';
import { ErrorMessage, Label } from '../common';
import { clsx } from '@mantine/core';

interface SelectInputProps {
  control: Control;
  name: string;
  options: { label: string; value: string }[];
  rules?: RegisterOptions;
  defaultValue?: any;
  isMulti?: boolean;
  label: string;
  errorText?: string;
  isMandatory?: boolean;
  controlClassName?: string;
  customIcon?: React.ReactNode;
  isDisabled?: boolean;
  menuPlacement?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  control,
  name,
  options,
  rules,
  defaultValue,
  menuPlacement = 'bottom',
  isMulti = false,
  label,
  errorText,
  isMandatory = false,
  controlClassName,
  customIcon,
  isDisabled = false,
}) => {
  const CustomDropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        {!!customIcon && customIcon}
      </components.DropdownIndicator>
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, onBlur } }) => (
        <div>
          <Label label={label ?? ''}>
            {isMandatory && <small className="text-danger">*</small>}
          </Label>
          <Select
            isDisabled={isDisabled}
            onChange={(option: any) =>
              onChange(
                isMulti ? option?.map((o: any) => o.value) : option?.value,
              )
            }
            components={{ DropdownIndicator: CustomDropdownIndicator }}
            options={options}
            isMulti={isMulti}
            value={
              isMulti
                ? options.filter(option => value?.includes(option.value))
                : options.find(option => option?.value === value)
            }
            menuPlacement={menuPlacement}
            onBlur={onBlur}
            classNames={{
              control: (state: any) =>
                clsx(
                  'hover:!border-[#BBBFD1] text-[#838AA9] !border-border',
                  'hover:focus-within:!border-[#a93030] focus-within:!border-[#2B3E9B] focus-within:text-[#151F4E]',
                  'text-sm font-semibold !rounded-[6px] border-[1px] p-[3px]',
                  controlClassName,
                ),
              indicatorSeparator: () => 'hidden',
              indicatorsContainer: () => 'cursor-pointer',
              menu: () => '!bg-[#F3F4F9] !w-fit',
              singleValue: () => '!text-[currentColor]',
              option: (state: any) => {
                return clsx(
                  '!text-[#151F4E] hover:!bg-[#2B3E9B] hover:!text-white !bg-transparent',
                );
              },
            }}
          />
          {errorText && <ErrorMessage errorText={errorText} />}
        </div>
      )}
    />
  );
};

export default SelectInput;

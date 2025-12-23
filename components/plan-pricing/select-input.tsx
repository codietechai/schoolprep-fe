import { Select as any, clsx } from '@mantine/core';
import React from 'react';
import Select from 'react-select';

export default function SelectInput({
  setValue,
  value,
  options,
  menuPlacement = 'bottom',
}: {
  setValue: any;
  options: { label: string; value: string }[];
  value: { label: string; value: string };
  menuPlacement?: string;
}) {
  return (
    <>
      <Select
        onChange={async (option: any) => {
          setValue(option);
        }}
        value={value}
        menuPlacement={menuPlacement}
        options={options}
        // value={courses?.data.find(option => option?.value === value)}
        classNames={{
          control: (state: any) =>
            clsx(
              'hover:!border-[#BBBFD1] text-[#838AA9] !border-border',
              'hover:focus-within:!border-[#a93030] focus-within:!border-[#2B3E9B] focus-within:text-[#151F4E]',
              'text-sm font-semibold !rounded-[6px] border-[1px] p-[3px]',
              'w-[198px]',
            ),
          indicatorSeparator: () => 'hidden',
          indicatorsContainer: () => 'cursor-pointer',
          menu: () => '!bg-[#F3F4F9]',
          singleValue: () => '!text-[currentColor]',
          option: (state: any) => {
            return clsx(
              '!text-[#151F4E] hover:!bg-[#2B3E9B] hover:!text-white !bg-transparent',
            );
          },
        }}
      />
    </>
  );
}

import React, { useState } from 'react';
import Select from 'react-select';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { clsx } from '@mantine/core';

export const Chart = ({ height = 260 }: { height?: number }) => {
  const [value, setValue] = useState<{ label: string; value: string }>({
    label: 'This Week',
    value: 'week',
  });
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const isDark = useSelector(
    (state: IRootState) =>
      state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode,
  );
  const [range, setRange] = useState('This Month');

  const uniqueVisitorSeries: any = {
    series: [
      {
        name: 'Subscriptions',
        data: [30, 40, 45, 50, 49, 60, 70],
      },
    ],
    options: {
      chart: {
        height: height,
        type: 'bar',
        fontFamily: 'Noto, sans-serif',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        colors: ['transparent'],
      },
      colors: [
        '#4B70F5',
        '#4B70F5',
        '#E6E6E7',
        '#E6E6E7',
        '#E6E6E7',
        '#E6E6E7',
        '#E6E6E7',
      ],
      dropShadow: {
        enabled: true,
        blur: 3,
        color: '#515365',
        opacity: 0.4,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 8,
          borderRadiusApplication: 'end',
        },
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '14px',
        itemMargin: {
          horizontal: 8,
          vertical: 8,
        },
      },
      grid: {
        borderColor: isDark ? '#191e3a' : '#e0e6ed',
        padding: {
          left: 20,
          right: 20,
        },
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed ', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisBorder: {
          show: true,
          color: isDark ? '#3b3f5c' : '#e0e6ed',
        },
      },
      yaxis: {
        tickAmount: 6,
        opposite: isRtl ? true : false,
        labels: {
          offsetX: isRtl ? -10 : 0,
          formatter: function (value: any) {
            return `$${value.toFixed(1)}`;
          },
        },
      },
      tooltip: {
        marker: {
          show: true,
        },
      },
    },
  };

  return (
    <div className="panel p-0 !px-0 lg:col-span-2">
      <div className="mb-5 flex justify-center border-b border-white-light p-5 pt-0 dark:border-[#1b2e4b] dark:text-white-light">
        <Select
          onChange={async (option: any) => {
            setValue(option);
          }}
          value={value}
          options={[
            { label: 'This Week', value: 'week' },
            { label: 'This Month', value: 'month' },
            { label: 'This Year', value: 'year' },
          ]}
          // value={courses?.data.find(option => option?.value === value)}
          classNames={{
            control: (state: any) =>
              clsx(
                '!outline-none text-[#838AA9] !border-none',
                'focus-within:text-[#151F4E]',
                'text-sm font-semibold !rounded-[6px] p-[3px]',
                state.isFocused && '!border-none !outline-none !ring-0',
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
      </div>

      <ReactApexChart
        options={uniqueVisitorSeries.options}
        series={uniqueVisitorSeries.series}
        type="bar"
        height={height}
        width={'100%'}
      />
    </div>
  );
};

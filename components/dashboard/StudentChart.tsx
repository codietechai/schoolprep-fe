import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { clsx } from '@mantine/core';
import { LeftIcon, RightIcon } from '../userui/components/icons/icon';
import { UserPerformancePerDay } from './StudentDashboard';
import dayjs from 'dayjs';
import { getPreviousDates } from '../common/timer';
import { GreaterThanIcon, LessThanIcon } from '../icon/comparision-icon';

export const StudentChart = ({
  height = 260,
  data,
}: {
  height?: number;
  data: UserPerformancePerDay[];
}) => {
  const [dateNumber, setDateNumber] = useState(0);
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const isDark = useSelector(
    (state: IRootState) =>
      state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode,
  );

  const arr = getPreviousDates(dayjs().subtract(dateNumber, 'day').toString());
  const series = data?.map(item => {
    return { ...item, day: dayjs(item.date).format('ddd') };
  });

  const finalData = arr?.map(({ date, day }) => {
    const match = series?.find(item => item.date === date);
    return {
      date,
      day,
      performance: match ? match.performance : 0,
    };
  });

  const uniqueVisitorSeries: any = {
    series: [
      {
        name: 'Performance',
        data: finalData.map(item => item.performance),
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
        categories: finalData.map(item => dayjs(item.date).format('DD MMM')),
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
            return `${value.toFixed(1)}%`;
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
      <div className="mb-5 flex items-center justify-center gap-4 border-b border-white-light p-5 pt-0 dark:border-[#1b2e4b] dark:text-white-light">
        <button onClick={() => setDateNumber(dateNumber + 1)}>
          <LessThanIcon />
        </button>
        <span className="text-[14px] font-semibold text-secondary">
          Performance Per Day
        </span>

        <button
          onClick={() => setDateNumber(dateNumber - 1)}
          disabled={finalData.map(item => dayjs(item.date))[6].isSame(dayjs())}>
          <GreaterThanIcon />
        </button>
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

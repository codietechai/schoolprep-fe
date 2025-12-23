import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const ContainerWithRadialChart = ({
  series,
  title,
  description,
  elseText,
}: {
  series: number;
  title: string;
  description?: string;
  elseText?: string;
}) => {
  return (
    <div
      className={`relative flex flex-col items-center gap-2 rounded-2xl border border-border-light px-6 py-6 ${
        description ? 'h-[215px]' : ' h-[190px]'
      }`}>
      <h5 className="-mb-2 text-center font-semibold">{title}</h5>
      {!elseText ? (
        <ChartBox series={[Math.floor(series)]} />
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-[#7C8696]">{elseText}</p>
        </div>
      )}
      {description && (
        <p className="absolute bottom-6 text-sm  font-semibold text-[#7C8696]">
          {description}
        </p>
      )}
    </div>
  );
};

const DashboardBox = ({
  title,
  description,
  quantity,
  className,
}: {
  title: string;
  description?: string;
  quantity: number | string;
  className?: string;
}) => (
  <div
    className={`panel flex flex-col items-center justify-center space-y-2 ${className}`}>
    <h5 className="text-base font-semibold">{title}</h5>
    <p className="text-[38px] font-bold leading-[50px]">{quantity} </p>{' '}
    <p className=" text-sm font-semibold text-[#7C8696]">{description}</p>
  </div>
);

const SmallContainer = ({
  title,
  unit,
  quantity,
  className,
  hasData,
}: {
  title: string;
  unit?: string;
  quantity: string | number;
  className?: string;
  hasData: boolean;
}) => (
  <>
    {hasData ? (
      <div className={`panel ${className}`}>
        <h5 className="mb-2 text-base font-semibold ">{title}</h5>
        <div>
          <span className="text-[38px] font-bold leading-[50px]">
            {quantity}{' '}
          </span>{' '}
          <span className=" text-sm font-semibold text-[#7C8696]">{unit}</span>
        </div>
      </div>
    ) : (
      <div className="min-h-[130px] w-full rounded-2xl border border-border-light px-6 py-6">
        <div className="h-full animate-pulse">
          <div className="flex h-full flex-col justify-between">
            <div className="h-5 rounded bg-gray-100"></div>
            <div className="flex items-end gap-4">
              <div className="size-12 rounded-xl bg-gray-100"></div>
              <div className="size-8 rounded-xl bg-gray-100"></div>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);

const ChartBox = ({ series }: { series: number[] }) => {
  return (
    <ReactApexChart
      options={{
        chart: {
          height: 150,
          width: 150,
          type: 'radialBar',
          offsetY: -10,
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            hollow: {
              size: '50%', // Adjust to make the arc wider (e.g., decrease to '40%' for even wider arcs)
            },
            track: {
              background: '#e0e0e0', // Optional: adjust the background color of the track
              strokeWidth: '50%', // Controls the width of the background track
            },
            dataLabels: {
              name: {
                fontSize: '16px',
                color: undefined,
                offsetY: 120,
              },
              value: {
                offsetY: -10,
                fontSize: '14px',
                color: undefined,
                formatter: function (val) {
                  return val + '%';
                },
              },
            },
          },
        },

        colors: ['#4B70F5'],
        stroke: {
          dashArray: 0,
          lineCap: 'round',
        },
        labels: [''],
      }}
      series={series}
      type="radialBar"
      height={150}
      width={150}
    />
  );
};

const LineChart = ({
  data: chartData,
  userData,
}: {
  data?: { marks: number; tests: number }[];
  userData?: {
    percentage: string;
    rank: string;
  };
}) => {
  const series = [
    {
      name: `Marks (0 to ${chartData?.length})`,
      data: chartData?.map(item => item.tests || 0) || [],
    },
  ];

  const options: ApexOptions = {
    title: {
      text: 'Marks of Students',
      align: 'center',
      style: {
        fontWeight: 600,
        fontSize: '16px',
        fontFamily: 'Noto Sans',
      },
    },
    chart: {
      type: 'line',
    },
    grid: { show: false },
    stroke: {
      curve: 'smooth',
      colors: ['#4b70f5'],
      width: 2,
    },
    xaxis: {
      labels: {
        show: false, // Hide all x-axis labels
      },
      categories: chartData?.map(item => item.marks),
      title: {
        text: `Marks (0 to ${chartData?.length})`,
        style: {
          fontWeight: 600,
          fontSize: '14px',
        },
      },
    },
    yaxis: {
      axisBorder: { show: true },
      title: {
        text: 'Count of Diagnostic Test',
        style: {
          fontWeight: 600,
          fontSize: '14px',
        },
      },
    },
  };

  return (
    <div className="flex items-center gap-16 pt-5">
      <div className="w-full">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
      <div className="w-[700px] text-secondary">
        <h2 className="text-xl font-bold">Percentile Rank</h2>
        <div className="flex items-center justify-between border-b border-border-light py-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-success-light" />
            <p className="">
              Your Score{' '}
              <span className="text-sm text-[#7c8696] text-[500]">
                ({userData?.rank})
              </span>
            </p>
          </div>
          <p className="rounded-full bg-[#e8e8e8] px-2 text-[12px]">
            {userData?.percentage}
          </p>
        </div>
        {/* <div className="flex items-center justify-between border-b border-border-light py-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <p className="">Median Score (84th rank)</p>
          </div>
          <p className="rounded-full bg-[#e8e8e8] px-2 text-[12px]">65%</p>
        </div>
        <div className="flex items-center justify-between border-b border-border-light py-3">
          <p className="">Your Average Time Spent (sec) </p>
          <p className="rounded-full bg-[#e8e8e8] px-2 text-[12px]">68</p>
        </div>
        <div className="flex items-center justify-between border-b border-border-light py-3">
          <p className="">Other's Average Time Spent (sec) </p>
          <p className="rounded-full bg-[#e8e8e8] px-2 text-[12px]">68</p>
        </div> */}
      </div>
    </div>
  );
};

export {
  ContainerWithRadialChart,
  ChartBox,
  SmallContainer,
  LineChart,
  DashboardBox,
};

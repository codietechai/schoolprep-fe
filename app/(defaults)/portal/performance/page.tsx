'use client';
import ProgressBar from '@/components/common/progress-bar';
import { Chart } from '@/components/dashboard/components';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import ComponentsAnalytics from '@/components/dashboard/analytics';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const page = () => {
  return (
    <ComponentsAnalytics heading="Performance" />
    // <div className="dashboard-panel">
    //   <div>
    //     <p className=" page-header">Performace</p>
    //   </div>
    //   <div className="pt-8">
    //     <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    //       <div className="flex h-[173px] flex-col items-center gap-2 rounded-2xl border border-border-light px-6 py-[31px]">
    //         <h5 className="-mb-4 text-center font-semibold">Scored points</h5>
    //         <ChartBox />
    //       </div>
    //       <div className="flex h-[173px] flex-col items-center gap-2 rounded-2xl border border-border-light px-6 py-[31px]">
    //         <h5 className="-mb-4 text-center font-semibold">Max points</h5>
    //         <ChartBox />
    //       </div>
    //       <div className="flex h-[173px] flex-col items-center gap-2 rounded-2xl border border-border-light px-6 py-[31px]">
    //         <h5 className="-mb-4 text-center font-semibold">Unused</h5>
    //         <ChartBox />
    //       </div>
    //     </div>
    //     <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    //       <div className="panel ">
    //         <div className="mb-2 flex justify-between dark:text-white-light">
    //           <h5 className="text-lg font-semibold ">Median Score</h5>
    //         </div>
    //         <div>
    //           <span className="text-3xl font-bold">75% </span>
    //         </div>
    //       </div>
    //       <div className="panel ">
    //         <div className="mb-2 flex justify-between dark:text-white-light">
    //           <h5 className="text-lg font-semibold ">
    //             Time spent on questions
    //           </h5>
    //         </div>
    //         <div>
    //           <span className="text-3xl font-bold">102 </span>{' '}
    //           <span className="font-semibold text-[#7C8696]">Hours</span>
    //         </div>
    //       </div>
    //       <div className="panel ">
    //         <div className="mb-2 flex justify-between dark:text-white-light">
    //           <h5 className="text-lg font-semibold ">Time spent total</h5>
    //         </div>
    //         <div>
    //           <span className="text-3xl font-bold">3245 </span>{' '}
    //           <span className="font-semibold text-[#7C8696]">Hours</span>
    //         </div>
    //       </div>
    //       <div className="panel">
    //         <div className="mb-2 flex justify-between dark:text-white-light">
    //           <h5 className="text-lg font-semibold ">Your Rank</h5>
    //         </div>
    //         <div>
    //           <span className="text-3xl font-bold">1032 </span>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="mt-10">
    //       <div>
    //         <p className="sub-heading">Overall Performance</p>
    //       </div>
    //       <div className="mb-3 grid gap-6 pb-5 lg:grid-cols-2">
    //         <div className="">
    //           <Chart height={300} />
    //         </div>
    //         <div>
    //           <div className="panel mb-6">
    //             <div>
    //               <p className="performance-text mb-4">Question performance</p>
    //               <ul className="space-y-2">
    //                 <ProgressBar value={50} label="Correct" />
    //                 <ProgressBar value={30} label="Incorrect" color="red" />
    //                 <ProgressBar value={24} label="Omitted" />
    //               </ul>
    //             </div>
    //           </div>
    //           <div className="panel mb-6">
    //             <div>
    //               <p className="performance-text mb-4">Test count</p>
    //               <ul className="space-y-2">
    //                 <ProgressBar value={50} label="Correct" />
    //                 <ProgressBar value={20} label="Incorrect" color="red" />
    //               </ul>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

const ChartBox = () => {
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
      series={[67]}
      type="radialBar"
      height={150}
      width={150}
    />
  );
};

export default page;

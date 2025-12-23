'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { IRootState } from '@/store';
import { Chart } from './components';
import {
  ContainerWithRadialChart,
  DashboardBox,
} from './components/common/Containers';
import ProgressBar from '../common/progress-bar';

const AdminDashboard = () => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

  return (
    <div className="pt-8">
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ContainerWithRadialChart
          series={67}
          title="Preparatory Performance"
          description="Active Subscriptions over total students"
        />
        <DashboardBox
          quantity="$2000"
          className="text-center"
          title="Last Month’s sales"
          description="Sales for the month of Jan 2025"
        />
        <DashboardBox
          className="text-center"
          quantity="$2000"
          title="Current Month’s sales"
          description="Sales for the month of Feb 2025"
        />
      </div>
      <div className="mt-10">
        <div>
          <p className="sub-heading">Sales</p>
        </div>
        <div className="mb-3 grid gap-6 pb-5 lg:grid-cols-2">
          <div className="">
            <Chart height={300} />
          </div>
          <div>
            <div className="panel mb-6">
              <div>
                <p className="performance-text mb-4">Students</p>
                <ul className="space-y-2">
                  <ProgressBar value={50} label="Trial Plan Students" />
                  <ProgressBar
                    value={30}
                    label="Subscribed Students"
                    color="green"
                  />
                  <ProgressBar
                    value={24}
                    label="Expired/Visitors "
                    color="red"
                  />
                </ul>
              </div>
            </div>
            <div className="panel mb-6">
              <div>
                <p className="performance-text mb-4">Top Courses</p>
              </div>
            </div>
            <div className="panel mb-6">
              <div>
                <p className="performance-text mb-4">Top Plans</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

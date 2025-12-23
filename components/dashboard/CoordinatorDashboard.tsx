'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { IRootState } from '@/store';
import {
  TestChart,
  Invoice,
  Subscriptions,
  Users,
  TotalStats,
  Chart,
} from './components';
import { QuestionsList } from '@/components/questions/list';
import { UserList } from '../users';
import IconUsersGroup from '../icon/icon-users-group';
import {
  ContainerWithRadialChart,
  DashboardBox,
  SmallContainer,
} from './components/common/Containers';
import ProgressBar from '../common/progress-bar';
import { useQuery } from 'react-query';
import {
  fectchCoordinatorDashboardData,
  FETCH_COORDINATOR_DASHBOARD_DATA_KEY,
} from '@/client/endpoints/student';
import { useSession } from '@/hooks';

interface TDashboardData {
  totalQuestions: number;
  preparatoryQuestionCount: number;
  diagnosticQuestionCount: number;
  particularCourseCount: [
    {
      _id: string;
      count: number;
      course_name: string;
    },
  ];
}

const CoordinatorDashboard = () => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const session = useSession();
  const userId = session.session?.user?.id;
  const [dashboardData, setDashboardData] = useState<TDashboardData | null>(
    null,
  );

  useQuery(
    [FETCH_COORDINATOR_DASHBOARD_DATA_KEY],
    () => fectchCoordinatorDashboardData(),
    {
      enabled: !!userId,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setDashboardData(data);
      },
    },
  );
  return (
    <div>
      {/* <div className="pt-5">
        <div className="mb-6 grid gap-6 lg:grid-cols-[70%_30%]">
          <div>
            <div className="panel mb-4 flex items-center">
              <div className="flex p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary dark:text-white-light">
                  <IconUsersGroup className="h-5 w-5" />
                </div>
                <div className="font-semibold ltr:ml-3 rtl:mr-3">
                  <p className="text-xl dark:text-white-light">10</p>
                  <h5 className="text-xs text-[#506690]">Active Students</h5>
                </div>
              </div>
            </div>
            <div className="panel flex items-center">
              <div className="flex p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-danger/10 text-danger dark:bg-danger dark:text-white-light">
                  <IconUsersGroup className="h-5 w-5" />
                </div>
                <div className="font-semibold ltr:ml-3 rtl:mr-3">
                  <p className="text-xl dark:text-white-light">3</p>
                  <h5 className="text-xs text-[#506690]">In-Active Students</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
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
            <p className="sub-heading">Student Registrations</p>
          </div>
          <div className="mb-3 grid gap-6 pb-5 lg:grid-cols-2">
            <div className="">
              <Chart height={300} />
            </div>
            <div className="">
              <div className="mb-6 grid grid-cols-2 gap-6">
                <SmallContainer
                  quantity="521"
                  title="Total students"
                  hasData={true}
                />
                <SmallContainer
                  quantity="200"
                  title="Active students"
                  hasData={true}
                />
              </div>
              <div className="panel">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;

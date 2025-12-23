'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { IRootState } from '@/store';
import ProgressBar from '../common/progress-bar';
import { SmallContainer } from './components/common/Containers';
import { useQuery } from 'react-query';
import {
  fectchTeacherDashboardData,
  FETCH_TEACHER_DASHBOARD_DATA_KEY,
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

const TeacherDashboard = () => {
  const session = useSession();
  const userId = session.session?.user?.id;
  const [dashboardData, setDashboardData] = useState<TDashboardData | null>(
    null,
  );
  // const isRtl =
  //   useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  useQuery(
    [FETCH_TEACHER_DASHBOARD_DATA_KEY],
    () => fectchTeacherDashboardData(),
    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setDashboardData(data);
      },
    },
  );
  return (
    <div>
      {/* <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Teacher</span>
        </li>
      </ul> */}
      <div className="pt-5">
        {/* <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="panel ">
            <div className="mb-2 flex justify-between dark:text-white-light">
              <h5 className="text-lg font-semibold ">Total Courses</h5>
            </div>
            <div className="  text-3xl font-bold text-[#e95f2b]">
              <span>14 </span>
            </div>
          </div>
          <div className="panel ">
            <div className="mb-2 flex justify-between dark:text-white-light">
              <h5 className="text-lg font-semibold ">Total Tests</h5>
            </div>
            <div className="  text-3xl font-bold text-[#e95f2b]">
              <span>120 </span>
            </div>
          </div>
          <div className="panel ">
            <div className="mb-2 flex justify-between dark:text-white-light">
              <h5 className="text-lg font-semibold ">Total Students</h5>
            </div>
            <div className="  text-3xl font-bold text-[#e95f2b]">
              <span>10 </span>
            </div>
          </div>
          <div className="panel ">
            <div className="mb-2 flex justify-between dark:text-white-light">
              <h5 className="text-lg font-semibold ">Test Submitted</h5>
            </div>
            <div className="  text-3xl font-bold text-[#e95f2b]">
              <span>12 </span>
            </div>
          </div>
        </div> */}

        {/* <div className="mb-6 grid gap-6 lg:grid-cols-3">
          <TestChart />
        </div> */}
        <div className="mb-8 grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          <SmallContainer
            quantity={dashboardData?.totalQuestions || 0}
            title="Total Questions"
            className="text-center"
            hasData={!!dashboardData}
          />
          <SmallContainer
            quantity={dashboardData?.preparatoryQuestionCount || 0}
            title="Preparatory"
            className="text-center"
            hasData={!!dashboardData}
          />
          <SmallContainer
            quantity={dashboardData?.diagnosticQuestionCount || 0}
            title="Diagnostic"
            className="text-center"
            hasData={!!dashboardData}
          />
        </div>
        <div className="panel mb-6">
          <div>
            <p className="performance-text mb-4">Questions by course</p>
            <ul className="space-y-2">
              {dashboardData?.particularCourseCount.map((item, i) => (
                <ProgressBar
                  key={i}
                  value={item.count}
                  label={item.course_name}
                  color={i % 3 === 0 ? 'green' : i % 2 === 0 ? 'red' : 'blue'}
                  max={dashboardData?.totalQuestions}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

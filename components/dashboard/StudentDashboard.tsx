'use client';
import ProgressBar from '@/components/common/progress-bar';
import React, { useState } from 'react';
import {
  ContainerWithRadialChart,
  LineChart,
  SmallContainer,
} from './components/common/Containers';
import { useQuery } from 'react-query';
import {
  FETCH_STUDENT_DASHBOARD_DATA_KEY,
  fetchStudentDashboardData,
} from '@/client/endpoints/student';
import { useCourseId, useSession } from '@/hooks';
import { StudentChart } from './StudentChart';
import { calculateMedianContinuous } from '../common/mathematical';
import { DashboardContainerSkeleton } from '../common/skeletons/skeletons';
import { formatSecondsToHHMM } from '../common/timer';

export interface UserPerformancePerDay {
  _id: string;
  date: string;
  performance: number;
}

type PerformanceData = {
  prep_percentage: number;
  diag_percentage: number;
  total_questions: number;
  userHighestRank: number;
  corrected_questions: number;
  incorrect_questions: number;
  skipped_questions: number;
  user_performance_per_day: UserPerformancePerDay[];
  total_time_of_prep: number;
  total_time_of_diag: number;
  graph_data: { marks: number; tests: number }[];
  rankedUsers: any[];
};
const StudentDashboard = () => {
  const course_id = useCourseId(state => state.courseId);
  const session = useSession();
  const userId = session.session?.user?.id;
  const [dashboardData, setDashboardData] = useState<PerformanceData | null>(
    null,
  );

  useQuery(
    [FETCH_STUDENT_DASHBOARD_DATA_KEY, course_id],
    () => fetchStudentDashboardData(course_id),
    {
      enabled: !!course_id,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setDashboardData(data);
      },
    },
  );
  const user = dashboardData?.rankedUsers.find(
    (item: any) => item._id === userId,
  );

  const usedQuestions =
    (dashboardData?.corrected_questions || 0) +
    (dashboardData?.skipped_questions || 0) +
    (dashboardData?.incorrect_questions || 0);
  const usedQuestionsPercentage =
    (usedQuestions * 100) / (dashboardData?.total_questions || 1);
  return (
    <div className="pt-8">
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {!dashboardData ? (
          <>
            <DashboardContainerSkeleton />
            <DashboardContainerSkeleton />
            <DashboardContainerSkeleton />
          </>
        ) : (
          <>
            <ContainerWithRadialChart
              series={dashboardData?.prep_percentage || 0}
              title="Preparatory Performance"
              // elseText="No Test Attempted"
            />
            <ContainerWithRadialChart
              series={dashboardData?.diag_percentage || 0}
              title="Diagnostics Performance"
              // elseText="No Test Attempted"
            />
            <ContainerWithRadialChart
              series={usedQuestionsPercentage}
              title="Question Used"
            />
          </>
        )}
      </div>

      <div className="mt-10">
        <div>
          {dashboardData ? (
            <p className="sub-heading">Practice Performance</p>
          ) : (
            <div className="mb-5 animate-pulse">
              <div className="h-8 w-[20%] rounded-full bg-gray-100"></div>
            </div>
          )}
        </div>
        <div className="mb-3 grid gap-6 pb-5 lg:grid-cols-2">
          <div className="">
            <StudentChart
              height={300}
              data={
                dashboardData?.user_performance_per_day as UserPerformancePerDay[]
              }
            />
          </div>
          <div>
            <div className="panel mb-6">
              <div>
                <p className="performance-text mb-4">Question performance</p>
                <ul className="space-y-2">
                  <ProgressBar
                    value={dashboardData?.corrected_questions || 0}
                    max={usedQuestions}
                    label="Correct"
                    color="green"
                  />
                  <ProgressBar
                    value={dashboardData?.incorrect_questions || 0}
                    max={usedQuestions}
                    label="Incorrect"
                    color="red"
                  />
                  <ProgressBar
                    value={dashboardData?.skipped_questions || 0}
                    max={usedQuestions}
                    label="Omitted"
                  />
                </ul>
              </div>
            </div>
            <div className="panel mb-6">
              <div>
                <p className="performance-text mb-4">QBank Usage</p>
                <ul className="space-y-2">
                  <ProgressBar
                    value={usedQuestions}
                    max={dashboardData?.total_questions}
                    label="Used"
                    color="green"
                  />
                  <ProgressBar
                    value={
                      (dashboardData?.total_questions || 0) - usedQuestions
                    }
                    max={dashboardData?.total_questions}
                    label="Unused"
                    color="red"
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SmallContainer
          hasData={!!dashboardData}
          quantity={`${
            isNaN(user?.test_percentage['$numberDecimal'] * 100)
              ? 0
              : user?.test_percentage['$numberDecimal'] * 100
          }%`}
          title="Your score"
          unit={
            user?.rank === undefined
              ? 'No Rank'
              : user?.rank === 1
              ? `1st`
              : user?.rank === 2
              ? '2nd'
              : user?.rank === 3
              ? '3rd'
              : `${user?.rank}th`
          }
        />
        {/* <SmallContainer
          hasData={!!dashboardData}
          quantity={
            calculateMedianContinuous(
              dashboardData?.graph_data || [],
            )?.toString() as string
          }
          title="Median score"
          unit="Marks"
        /> */}
        <SmallContainer
          quantity={formatSecondsToHHMM(dashboardData?.total_time_of_prep || 0)}
          title="Time spent on practice"
          unit={
            (dashboardData?.total_time_of_prep as number) < 3600
              ? 'Minutes'
              : 'Hours'
          }
          hasData={!!dashboardData}
        />
        <SmallContainer
          quantity={formatSecondsToHHMM(dashboardData?.total_time_of_diag || 0)}
          title="Time spent on diagnistics"
          unit={
            (dashboardData?.total_time_of_diag as number) < 3600
              ? 'Minutes'
              : 'Hours'
          }
          hasData={!!dashboardData}
        />
      </div>
      {/* {dashboardData?.graph_data && (
        <LineChart
          data={dashboardData?.graph_data}
          userData={{
            percentage: `${
              isNaN(user?.test_percentage['$numberDecimal'] * 100)
                ? 0
                : user?.test_percentage['$numberDecimal'] * 100
            }%`,
            rank:
              user?.rank === undefined
                ? 'No Rank'
                : user?.rank === 1
                ? `1st`
                : user?.rank === 2
                ? '2nd'
                : user?.rank === 3
                ? '3rd'
                : `${user?.rank}th`,
          }}
        />
      )} */}
    </div>
  );
};

export default StudentDashboard;

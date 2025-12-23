'use client';
import IconCalendar from '@/components/icon/icon-calendar';
import IconClock from '@/components/icon/icon-clock';
import QuestionIcon from '@/components/icon/question-icon';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
import Overview from './result/overview';
import Button from '@/components/common/button';
import { usePathname, useRouter } from 'next/navigation';
import {
  convertTimeToDecimal,
  convertToHoursAndMinutes,
  formatSeconds,
  formatSecondsToHHMM,
  hoursToMinutes,
} from '@/components/common/timer';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import SelectInput from '@/components/plan-pricing/select-input';
import QuestionsList from './utils/list';
import ProgressBar from '@/components/common/progress-bar';
import IconArrowBackward from '@/components/icon/icon-arrow-backward';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { useDispatch } from 'react-redux';

export const calculatePercentage = (count: number, total: number) => {
  return Number(((count / total) * 100).toFixed(2));
};
const ResultContainer = ({ testType }: { testType: string }) => {
  const [filter, setFilter] = useState<any>({ label: 'All', value: 'all' });
  const [tab, setTab] = useState('Result');
  const dispatch = useDispatch();
  let time, series, statistics;
  const test = useSelector((state: IRootState) => state.test);
  const result = test.result;
  console.log('result.total :>> ', result?.total_time);

  if (
    result?.total_questions &&
    result?.corrected_questions >= 0 &&
    result?.skipped_questions >= 0
  ) {
    statistics = {
      total: result?.total_questions,
      correct: result?.corrected_questions,
      incorrect:
        result?.total_questions -
        result?.corrected_questions -
        result?.skipped_questions,
      unanswered: result?.skipped_questions,
    };

    time = {
      totalTime: result?.duration_of_exam,
      timeTaken: formatSeconds(result?.total_time),
    };
    series = [
      calculatePercentage(statistics.correct, statistics.total),
      calculatePercentage(statistics.incorrect, statistics.total),
      calculatePercentage(statistics.unanswered, statistics.total),
    ];
  }
  const router = useRouter();
  const params = usePathname();

  useLayoutEffect(() => {
    if (
      params === '/portal/diagnostic-test/result' ||
      params === '/portal/preparatory-test/result'
    ) {
      document.body.classList.add('main-body');
    }
    return () => {
      document.body.classList.remove('main-body');
    };
  }, []);

  return (
    <div className="m-auto max-w-[1024px] text-base text-secondary">
      <div className="flex items-center justify-between py-10">
        <div className="flex items-center gap-5">
          <div
            className="flex size-[42px] cursor-pointer items-center justify-center rounded-lg bg-white"
            onClick={() => router.back()}>
            <IconArrowBackward />
          </div>
          <h2 className="mb-2 text-[38px] font-bold leading-[50px] text-black">
            {testType[0]}
            {testType.slice(1, testType.length).toLowerCase()} test
          </h2>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-1">
            <QuestionIcon />
            <p className="">{result?.questions.length} Questions</p>
          </div>
          <div className="flex gap-1">
            <IconClock />
            <p className="">
              {convertToHoursAndMinutes(Number(time?.totalTime))}
            </p>
          </div>
        </div>
      </div>
      <div className="dashboard-panel flex flex-col gap-8">
        <div className="flex gap-4">
          <h6
            className={`mb-5 cursor-pointer pb-2 text-base font-bold ${
              tab === 'Result' ? 'border-b-2 border-b-primary' : ''
            }`}
            onClick={() => setTab('Result')}>
            Test Result
          </h6>
          <h6
            className={`mb-5 cursor-pointer pb-2 text-base font-bold ${
              tab !== 'Result' ? 'border-b-2 border-b-primary' : ''
            }`}
            onClick={() => setTab('Analysis')}>
            Test Analysis
          </h6>
        </div>
        {tab === 'Result' ? (
          <div className="">
            <div className="">
              <div className="mb-4 flex justify-between">
                <div className="flex items-center gap-8">
                  <ReactApexChart
                    options={{
                      plotOptions: {
                        pie: {
                          donut: {
                            size: '40%',
                          },
                          dataLabels: {
                            // enabled: false, // Disables the percentage labels
                          },
                        },
                      },
                      colors: ['#4BF5A3', '#F54B4E', '#f4faf7'],
                      dataLabels: {
                        enabled: false,
                      },
                      stroke: {
                        show: false,
                      },
                      labels: [''],
                      legend: {
                        show: false,
                      },
                      tooltip: {
                        enabled: false,
                      },
                    }}
                    series={series}
                    type="donut"
                    height={160}
                    width={160}
                  />
                  {statistics?.correct && statistics?.correct ? (
                    <div className="">
                      <p className="leading text-[64px] font-bold leading-[80px] text-black">
                        {calculatePercentage(
                          statistics?.correct,
                          statistics.total,
                        )}
                        %
                      </p>
                    </div>
                  ) : (
                    <p className="leading text-[64px] font-bold leading-[80px] text-black">
                      0 %
                    </p>
                  )}
                </div>
                <div className="">
                  <div className="mb-2 flex gap-1">
                    <IconClock color="#a8afb9" />
                    <p className="">{time?.timeTaken}</p>
                  </div>
                  <div className="flex gap-1">
                    <IconCalendar />
                    <p className="">
                      {dayjs(result?.submitted_at).format(
                        'D MMM YYYY | h:mm A',
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-black">
                  <div className="flex items-center gap-1">
                    <span className="h-[14px] w-[14px] rounded-sm bg-success-light"></span>
                    <span className="">Correct</span>
                  </div>{' '}
                  <div className="flex items-center gap-1">
                    <span className="h-[14px] w-[14px] rounded-sm bg-danger-light"></span>
                    <span className="">Incorrect</span>
                  </div>{' '}
                  <div className="flex items-center gap-1">
                    <span className="h-[14px] w-[14px] rounded-sm border border-[#dce1df] bg-[#f4faf7]"></span>
                    <span className="">Skipped</span>
                  </div>
                </div>
                <SelectInput
                  options={[
                    { label: 'All', value: 'all' },
                    { label: 'Correct', value: 'correct' },
                    { label: 'Incorrect', value: 'incorrect' },
                    { label: 'Skipped', value: 'skipped' },
                  ]}
                  setValue={setFilter}
                  value={filter}
                />
              </div>
              {result && (
                <div className="my-10 space-y-7">
                  <div className="flex flex-wrap justify-between gap-5">
                    <div className="min-w-[300px]">
                      <ProgressBar
                        value={result.corrected_questions}
                        max={result.total_questions}
                        label="Correct"
                        color="green"
                      />
                    </div>
                    <div className="min-w-[300px]">
                      <ProgressBar
                        value={result.wrong_questions}
                        max={result.total_questions}
                        label="Incorrect"
                        color="red"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between gap-5">
                    <div className="min-w-[300px]">
                      <ProgressBar
                        value={result.skipped_questions}
                        max={result.total_questions}
                        label="Skipped"
                        color="gray"
                      />
                    </div>
                    <div className="min-w-[300px]">
                      <ProgressBar
                        value={result.total_time / 60}
                        rightLabel={`${formatSeconds(
                          result.total_time,
                          true,
                        )} / ${convertToHoursAndMinutes(
                          result.duration_of_exam,
                          true,
                        )}`}
                        max={hoursToMinutes(result.duration_of_exam)}
                        label="Time"
                        color="blue"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-12">
              {result?.progress.map((item, i) => (
                <Overview
                  overview={item as any}
                  n={i + 1}
                  key={i}
                  filter={filter}
                  questions={result.progress as any}
                />
              ))}
            </div>
            <div className="mt-8 flex gap-6 self-end">
              <Button
                text="Retake test"
                onClick={() => {
                  if (testType === 'PREPARATORY') {
                    router.push('/portal/preparatory-test/create-test');
                  } else router.push('/portal/diagnostic-test/?retake=true');
                }}
                type="tertiary"
                className="w-[159px]"
              />
              <Button
                text="Continue"
                onClick={() =>
                  router.push(
                    `/portal/${
                      testType === 'DIAGNOSTIC'
                        ? 'diagnostic-test'
                        : 'preparatory-test'
                    }`,
                  )
                }
                className="w-[159px]"
                type="primary"
              />
            </div>
          </div>
        ) : (
          <QuestionsList result={result} />
        )}
      </div>
    </div>
  );
};

export default ResultContainer;

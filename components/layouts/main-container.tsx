'use client';
import {
  FETCH_ONGOING_TEST,
  FETCH_TEST_KEY,
  fetchTestRequest,
  getOngoingTestId,
} from '@/client/endpoints/test';
import { useSession } from '@/hooks';
import { IRootState } from '@/store';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { TOption, TQuestion } from '../test/question-container';
import { createTest } from '@/store/testSlice';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { getTimeDifferenceInSeconds } from '../common/timer';

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const router = useRouter();
  const test = useSelector((state: IRootState) => state.test.test);
  const dispatch = useDispatch();
  const session = useSession();
  const [payload, setPayload] = useState({
    _id: '',
    user_id: '',
    test_type: '',
  });
  const isSidebarOpened = useSelector(
    (state: IRootState) => state.themeConfig.sidebar,
  );
  const userId = session?.session?.user?.id?.toString();
  const {} = useQuery(
    [FETCH_ONGOING_TEST, userId],
    () => getOngoingTestId(userId as string),
    {
      enabled: !!userId,
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        const testId = data?.data?.data?.test_id;
        if (testId) {
          setPayload({
            _id: testId,
            test_type: 'DIAGNOSTIC',
            user_id: userId as string,
          });
        }
      },
    },
  );
  useQuery([FETCH_TEST_KEY, setPayload], () => fetchTestRequest(payload), {
    refetchOnWindowFocus: false,
    enabled: !!payload._id,
    onSuccess(data) {
      const testData = data.data.data;
      if (!isSidebarOpened) {
        dispatch(toggleSidebar());
      }
      // action({
      //   action: 'NEXT',
      //   current_question_id: testData.questions[0]?._id,
      //   new_question_id: testData.questions?.[1]
      //     ? testData.questions?.[1]._id
      //     : null,
      //   upcoming_question_id: testData?.questions?.[2]
      //     ? testData?.questions?.[2]?._id
      //     : null,
      //   test_id: testData?._id,
      // });
      dispatch(
        createTest({
          _id: testData._id,
          user_id: testData.user_id,
          type: testData.type,
          course_id: testData.course_id,
          duration_of_exam: testData.duration_of_exam,
          questions: testData.questions,
          topics: testData.topics,
          bookmark_questions: testData.bookmark_questions,
          current_question_no: testData.progress?.length + 1,
          remaining_time:
            testData.duration_of_exam -
            getTimeDifferenceInSeconds(testData.createdAt),
          tutor: testData?.tutor,
          status: 'ACTIVE',
          question_mode: ['NONE'],
          total_questions: testData.total_questions,
          createdAt: testData.createdAt,
          progress: testData.progress.map(
            (item: {
              question: string;
              selected_option: string;
              time_taken: string;
            }) => {
              return {
                question: testData?.questions.find(
                  (question: TQuestion) => question._id === item.question,
                ),
                selected_option: testData?.questions
                  .find((question: TQuestion) => question._id === item.question)
                  .options.find(
                    (option: TOption) => option._id === item.selected_option,
                  ),
              };
            },
          ),
        }),
      );
      router.replace('/portal/diagnostic-test/test');
    },
  });
  // const isTestActive = test.status === 'ACTIVE';
  // if (isTestActive) {
  //   if (test.type === 'DIAGNOSTIC') {
  //     router.replace('/portal/diagnostic-test/test');
  //   }
  //   if (test.type === 'PREPARATORY') {
  //     router.replace('/portal/preparatory-test/test');
  //   }
  // }
  return (
    <div
      className={`${themeConfig.navbar} main-container min-h-screen text-black dark:text-white-dark`}>
      {' '}
      {children}
    </div>
  );
};

export default MainContainer;

import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { deleteUserRequest } from '@/client/endpoints';
import { showDeleteConfirmation, showMessage } from '@/utils';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
  FETCH_TEST_KEY,
  FETCH_TEST_REPORT_KEY,
  fetchTestRequest,
  getTestReport,
} from '@/client/endpoints/test';
import { createTest, setFinalResult } from '@/store/testSlice';
import ResultIcon from '@/components/icon/result-icon';
import PlayIcon from '@/components/icon/play-icon';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '@/store';
import { TOption, TQuestion } from '@/components/test/question-container';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { getTimeDifferenceInSeconds } from '@/components/common/timer';

type TProps = {
  refetch: () => void;
};

export const getColumns = ({ refetch }: TProps) => {
  const router = useRouter();
  const isSidebarOpened = useSelector(
    (state: IRootState) => state.themeConfig.sidebar,
  );

  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.auth);

  const [payload, setPayload] = useState({
    _id: '',
    user_id: user.user?.user?.id as any,
    test_type: 'PREPARATORY',
  });

  useQuery([FETCH_TEST_KEY, setPayload], () => fetchTestRequest(payload), {
    refetchOnWindowFocus: false,
    enabled: !!payload._id,
    onSuccess(data) {
      const testData = data.data.data;

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
          remaining_time:
            testData.duration_of_exam -
            getTimeDifferenceInSeconds(testData.createdAt, testData.paused_at),
          current_question_no: testData.progress?.length + 1,
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
      router.replace('/portal/preparatory-test/test');
    },
  });

  const [testId, setTestId] = useState('');
  useQuery(
    [FETCH_TEST_REPORT_KEY, testId],
    () => getTestReport({ test_id: testId }),
    {
      refetchOnWindowFocus: false,
      enabled: !!testId,
      onSuccess(data) {
        dispatch(setFinalResult(data.data.data));
        router.push(`/portal/preparatory-test/result`);
      },
    },
  );

  const cols = [
    // {
    //   accessor: 'percentage',
    //   title: 'Percentage',
    //   sortable: true,
    //   render: (row: any) => (
    //     <p className="py-1 text-base text-secondary">{row.percentage}</p>
    //   ),
    // },
    {
      accessor: 'corrected_questions',
      title: 'Correct',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">
          {row.corrected_questions}
        </p>
      ),
    },
    {
      accessor: 'wrong_questions',
      title: 'Incorrect',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row.wrong_questions}</p>
      ),
    },
    {
      accessor: 'skipped_questions',
      title: 'Skipped',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">
          {row?.skipped_questions}
        </p>
      ),
    },
    {
      accessor: 'total_questions',
      title: 'Total Question',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row.total_questions}</p>
      ),
    },
    {
      accessor: 'question_mode',
      title: 'Question Mode',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">
          {row.question_mode.length !== 4
            ? row.question_mode.map((item: any, i: number) => (
                <span>
                  {item}
                  {row.question_mode.length !== i + 1 && ', '}
                </span>
              ))
            : 'NONE'}
        </p>
      ),
    },
    {
      accessor: 'tutor',
      title: 'Tutor',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary" onClick={() => ({})}>
          {row.tutor.toString()}
        </p>
      ),
    },
    // {
    //   accessor: 'createdAt',
    //   title: 'Date',
    //   sortable: true,
    //   render: (row: any) => {
    //     return (
    //       <p className="text-base text-secondary">
    //         {dayjs(row?.createdAt).format('D MMM YYYY | h:mm A')}
    //       </p>
    //     );
    //   },
    // },
    {
      accessor: 'status',
      title: 'Status',
      sortable: true,
      // render: (row: any) => {
      //   return (
      //     <p className="text-base text-secondary">
      //       {dayjs(row?.createdAt).format('D MMM YYYY | h:mm A')}
      //     </p>
      //   );
      // },
    },
    {
      accessor: 'submitted_at',
      title: 'Submitted at',
      sortable: true,
      render: (row: any) => {
        return (
          <p className="text-base text-secondary">
            {dayjs(row?.submitted_at).format('D MMM YYYY | h:mm A')}
          </p>
        );
      },
    },
    {
      accessor: 'actions',
      title: 'Actions',
      render: (row: any) => {
        return (
          <div className="flex items-center justify-center gap-4">
            {row.status === 'PAUSED' && (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setPayload(prev => {
                    return { ...prev, _id: row._id };
                  });
                  if (!isSidebarOpened) {
                    dispatch(toggleSidebar());
                  }
                }}>
                <PlayIcon />
              </div>
            )}
            {row.status === 'SUBMITTED' && (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setTestId(row._id);
                  if (!isSidebarOpened) {
                    dispatch(toggleSidebar());
                  }
                }}>
                <ResultIcon />
              </div>
            )}
          </div>
        );
      },
    },
  ] as Array<any>;

  return cols;
};

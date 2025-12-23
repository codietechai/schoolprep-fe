import { Modal } from '@mantine/core';
import React, { useState } from 'react';
import Button from '@/components/common/button';
import { useCourseId, useSession } from '@/hooks';
import { showMessage } from '@/utils';
import { useMutation, useQuery } from 'react-query';
import { toggleSidebar } from '@/store/themeConfigSlice';
import {
  createTestRequest,
  FETCH_TEST_KEY,
  fetchTestRequest,
  handleUserTestAction,
} from '@/client/endpoints/test';
import { useRouter } from 'next/navigation';
import { createTest } from '@/store/testSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import {
  FETCH_DAIGNOSTIC_COUNT,
  getCountAndDurationOfDiagnosticTest,
} from '@/client/endpoints';
import { convertToHoursAndMinutes } from '../common/timer';
import IconClock from '../icon/icon-clock';

const TestModal = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const session = useSession();
  const [payload, setPayload] = useState({
    _id: '',
    user_id: '',
    test_type: '',
  });
  const dispatch = useDispatch();
  const isSidebarOpened = useSelector(
    (state: IRootState) => state.themeConfig.sidebar,
  );
  const courseId = useCourseId(state => {
    return state.courseId;
  });

  const [data, setData] = useState<any>(null);

  const { mutate: startTest, isLoading } = useMutation(createTestRequest, {
    onSuccess: (res: any) => {
      setPayload({
        _id: res.data.data._id,
        user_id: res.data.data.user_id,
        test_type: 'DIAGNOSTIC',
      });
    },
    onError: error => {
      showMessage('Something went wrong unable to start test.', 'error');
    },
  });

  const { mutate: action } = useMutation(handleUserTestAction, {
    onSuccess: (res: any) => {},
    onError: (error: any) => {
      console.log('error. :>> ', error);
    },
  });

  useQuery(
    [FETCH_DAIGNOSTIC_COUNT],
    () => getCountAndDurationOfDiagnosticTest(courseId),
    {
      refetchOnWindowFocus: false,
      enabled: !!courseId,
      onSuccess(data) {
        setData(data.data[0]);
      },
    },
  );

  const { isLoading: fetchingTestData } = useQuery(
    [FETCH_TEST_KEY, setPayload],
    () => fetchTestRequest(payload),
    {
      refetchOnWindowFocus: false,
      enabled: !!payload._id,
      onSuccess(data) {
        const testData = data.data.data;
        action({
          action: 'NEXT',
          current_question_id: testData?.questions[0]?._id,
          new_question_id: testData?.questions?.[1]
            ? testData.questions?.[1]._id
            : null,
          upcoming_question_id: testData?.questions?.[2]
            ? testData?.questions?.[2]?._id
            : null,
          test_id: testData?._id,
        });
        if (!isSidebarOpened) {
          dispatch(toggleSidebar());
        }
        dispatch(
          createTest({
            _id: testData._id,
            user_id: testData.user_id,
            type: testData.type,
            course_id: testData.course_id,
            duration_of_exam: testData.duration_of_exam,
            questions: testData.questions,
            topics: testData.topics,
            current_question_no: '',
            remaining_time: testData.duration_of_exam,
            tutor: false,
            status: 'ACTIVE',
            bookmark_questions: testData.bookmark_questions,
            question_mode: ['NONE'],
            total_questions: testData.total_questions,
            createdAt: testData.createdAt,
            progress: [],
          }),
        );
        router.replace('/portal/diagnostic-test/test');
      },
    },
  );

  const onSubmit = () => {
    if (
      session.session?.user.id &&
      data?.totalAllowedQuestions &&
      data?.totalTime
    ) {
      if (!isSidebarOpened) {
        dispatch(toggleSidebar());
      }
      startTest({
        user_id: session.session?.user.id.toString(),
        type: 'DIAGNOSTIC',
        duration_of_exam: data?.totalTime,
        course_id: courseId,
        total_questions: data?.totalAllowedQuestions,
      });
    }
  };

  return (
    <Modal
      opened={show}
      onClose={() => setShow(false)}
      title="Diagnostic test"
      classNames={{
        body: 'px-2 md:px-7',
        modal: 'w-[460px]',
      }}
      styles={{
        title: {
          color: '#05060F',
          fontWeight: 'bold',
          textAlign: 'center',
          width: '100%',
        },

        modal: {
          top: '20%',
          borderRadius: '16px',
        },
      }}
      overlayBlur={3}
      overlayOpacity={0.55}>
      <div className="text-secondary">
        {/* <h2 className="text-black"></h2> */}
        <p className="mb-4 text-center text-base">
          Take a realistic test and track your progress and manage your time
          effectively, with results revealed only at the end for an authentic
          exam experience.
        </p>
        <div className="grid grid-cols-1 gap-4 text-base sm:grid-cols-2">
          <div className="flex gap-1 rounded-lg border border-border-light px-4 py-2">
            <span className="font-bold">?</span>
            <div className="">
              <p className="font-bold">Questions</p>
              <p className="">{data?.totalAllowedQuestions}</p>
            </div>
          </div>
          <div className="flex gap-1 rounded-lg border border-border-light px-4 py-2">
            <span className="mt-1">
              <IconClock size={16} />
            </span>
            <div>
              <p className="font-bold">Duration</p>
              <p className="">
                {convertToHoursAndMinutes(data?.totalTime || 0)}
              </p>
            </div>
          </div>
        </div>
        <Button
          text="Start test"
          className="mb-1 mt-6 w-full"
          onClick={onSubmit}
          disabled={isLoading || fetchingTestData}
          type="secondary"
        />
      </div>
    </Modal>
  );
};

export default TestModal;

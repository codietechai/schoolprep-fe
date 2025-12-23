'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import IconClock from '../icon/icon-clock';
import SelectInput from '../plan-pricing/inputSelect';
import Button from '@/components/common/button';
import { createTest } from '@/store/testSlice';
import { useMutation, useQuery } from 'react-query';
import {
  createTestRequest,
  FETCH_COUNT_FOR_PREPARATORY_TEST,
  FETCH_TEST_KEY,
  fetchTestRequest,
  getCountForPreparatoryTest,
  handleUserTestAction,
} from '@/client/endpoints/test';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { showMessage } from '@/utils';
import { useCourseId } from '@/hooks';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { InfoSmallIcon } from '../icon/info-icon';
import {
  QuestionModeDetail,
  RequiredFieldsDetail,
  TestModeDetail,
} from './components-test-modal';

enum CountType {
  UNUSED = 'UNUSED',
  CORRECT = 'CORRECT',
  INCORRECT = 'INCORRECT',
  SKIPPED = 'SKIPPED',
}

const QuestionMode = [
  {
    label: 'Unused',
    value: 'UNUSED',
  },
  {
    label: 'Correct',
    value: 'CORRECT',
  },
  {
    label: 'Incorrect',
    value: 'INCORRECT',
  },
  {
    label: 'Omitted',
    value: 'SKIPPED',
  },
];

const TimeOptions = [
  {
    label: '30 minutes',
    value: '0.5',
  },
  {
    label: '1 hour',
    value: '1',
  },
  {
    label: '1 hour 30 minutes',
    value: '1.5',
  },
  {
    label: '2 hour',
    value: '2',
  },
  {
    label: '2 hour 30 minutes',
    value: '2.5',
  },
];
const TestModal = () => {
  const totalQuestions = ({
    data,
    selectedModes,
  }: {
    data: {
      correctQuestions: number;
      incorrectQuestions: number;
      skippedQuestions: number;
      unusedQuestions: number;
    };
    selectedModes: string[];
  }) => {
    let total: number = 0;
    if (selectedModes?.includes('CORRECT')) {
      total += data.correctQuestions;
    }
    if (selectedModes?.includes('SKIPPED')) {
      total += data.skippedQuestions;
    }
    if (selectedModes?.includes('UNUSED')) {
      total += data.unusedQuestions;
    }
    if (selectedModes?.includes('INCORRECT')) {
      total += data.incorrectQuestions;
    }
    if (selectedModes?.length === 0) {
      total =
        data?.correctQuestions +
        data?.incorrectQuestions +
        data?.skippedQuestions +
        data?.unusedQuestions;
    }
    return total;
  };
  const course_id = useCourseId(state => {
    return state.courseId;
  });

  const [courseData, setCourseData] = useState<any>(null);
  const user = useSelector((item: IRootState) => item.auth);
  const router = useRouter();
  const userId = user.user?.user?.id as any;
  const [selectedTopics, setSelectedTopics] = useState<any[]>([]);
  const [count, setCount] = useState({
    [CountType.UNUSED]: 0,
    [CountType.CORRECT]: 0,
    [CountType.INCORRECT]: 0,
    [CountType.SKIPPED]: 0,
  });
  const [showTestMode, setShowTestMode] = useState(false);
  const [showQuestionMode, setShowQuestionMode] = useState(false);
  const [showRequired, setShowRequired] = useState(false);

  const isSidebarOpened = useSelector(
    (state: IRootState) => state.themeConfig.sidebar,
  );

  const [payload, setPayload] = useState({
    _id: '',
    user_id: '',
    test_type: '',
  });

  const dispatch = useDispatch();

  const { mutate: startTest } = useMutation(createTestRequest, {
    onSuccess: (res: any) => {
      // showMessage(res.message);
      setPayload({
        _id: res.data.data._id,
        user_id: res.data.data.user_id,
        test_type: 'PREPARATORY',
      });
    },
    onError: error => {
      showMessage('Something went wrong unable to start test.', 'error');
    },
  });

  const { mutate: action } = useMutation(handleUserTestAction, {
    onSuccess: (res: any) => {},
  });

  useQuery([FETCH_TEST_KEY], () => fetchTestRequest(payload), {
    refetchOnWindowFocus: false,
    enabled: !!payload._id,
    onSuccess(data) {
      const testData = data.data.data;
      action({
        action: 'NEXT',
        current_question_id: testData.questions[0]?._id,
        new_question_id: testData.questions?.[1]
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
          remaining_time: testData.duration_of_exam,
          bookmark_questions: testData.bookmark_questions,
          topics: testData.topics,
          status: 'ACTIVE',
          tutor: watch('tutor'),
          question_mode: testData.question_mode,
          total_questions: testData.total_questions,
          createdAt: testData.createdAt,
          progress: [],
        }),
      );
      router.replace('/portal/preparatory-test/test');
    },
  });
  const [selectedModes, setSelectedModes] = useState<
    { label: string; value: string }[]
  >([]);

  useQuery(
    [FETCH_COUNT_FOR_PREPARATORY_TEST, course_id],
    () => getCountForPreparatoryTest({ user_id: userId, course_id: course_id }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: !!course_id,
      retry: 0,
      onSuccess(data) {
        setCount({
          UNUSED: data?.data?.data?.topics.reduce(
            (acc: number, topic: any) => acc + (topic?.unusedQuestions || 0),
            0,
          ),
          CORRECT: data?.data?.data?.topics.reduce(
            (acc: number, topic: any) => acc + (topic?.correctQuestions || 0),
            0,
          ),
          INCORRECT: data?.data?.data?.topics.reduce(
            (acc: number, topic: any) => acc + (topic?.incorrectQuestions || 0),
            0,
          ),
          SKIPPED: data?.data?.data?.topics.reduce(
            (acc: number, topic: any) => acc + (topic?.skippedQuestions || 0),
            0,
          ),
        });

        const variable = data.data.data.subjects[0]?.subjects.map(
          (subject: any) => {
            return {
              ...subject,
              questionTopics: data.data.data.topics.filter((item: any) =>
                subject.topics.includes(item.topic_id),
              ),
            };
          },
        );
        setCourseData(variable);
      },
    },
  );

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Item = ({
    subject,
  }: {
    subject: { name: string; questionTopics: any[]; _id: string };
  }) => {
    return (
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center gap-7">
            <input
              type="checkbox"
              className="custom-checkbox"
              id={subject._id}
              checked={subject.questionTopics.every((x: any) =>
                selectedTopics.map(item => item.topic_id).includes(x.topic_id),
              )}
              onChange={() =>
                setSelectedTopics((topics: any) => {
                  let arr = [...topics];
                  if (
                    subject.questionTopics.every((x: any) =>
                      selectedTopics
                        .map(item => item.topic_id)
                        .includes(x.topic_id),
                    )
                  ) {
                    return arr.filter(
                      x =>
                        !subject.questionTopics
                          .map(item => item.topic_id)
                          .includes(x.topic_id),
                    );
                  } else {
                    subject.questionTopics.forEach(item => {
                      arr.push({
                        topic_id: item.topic_id,
                        allowed_questions: totalQuestions({
                          data: item,
                          selectedModes: selectedModes.map(item => item.value),
                        }),
                      });
                    });

                    return arr;
                  }
                })
              }
            />
            <label
              htmlFor={subject._id}
              className="checkbox-icon absolute"></label>
            <label
              htmlFor={subject._id}
              className="!font-semibold text-secondary">
              {subject.name}
            </label>
          </div>
        </div>
        <div className="mt-1 space-y-2">
          {subject?.questionTopics?.map((item, i) => (
            <div className="flex items-center gap-6" key={i}>
              <div className="relative flex items-center gap-7">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  disabled={
                    totalQuestions({
                      data: item,
                      selectedModes: selectedModes.map(item => item.value),
                    }) === 0
                  }
                  id={item.topic_id}
                  checked={
                    selectedTopics.find(
                      (x: any) => x.topic_id === item.topic_id,
                    ) &&
                    totalQuestions({
                      data: item,
                      selectedModes: selectedModes.map(item => item.value),
                    }) !== 0
                  }
                  onChange={() =>
                    setSelectedTopics((topics: any) => {
                      let arr = [...topics];
                      if (
                        arr.find(
                          (topic: any) => item.topic_id === topic.topic_id,
                        )
                      ) {
                        return arr.filter(x => x.topic_id !== item.topic_id);
                      } else
                        return [
                          ...topics,
                          {
                            topic_id: item.topic_id,
                            allowed_questions: totalQuestions({
                              data: item,
                              selectedModes: selectedModes.map(
                                item => item.value,
                              ),
                            }),
                          },
                        ];
                    })
                  }
                />
                <label
                  htmlFor={item.topic_id}
                  className={`checkbox-icon absolute top-1 ${
                    totalQuestions({
                      data: item,
                      selectedModes: selectedModes.map(item => item.value),
                    }) === 0
                      ? '!cursor-not-allowed !border-gray-300'
                      : ''
                  }`}></label>
                <label
                  htmlFor={item.topic_id}
                  className={`pt-1 text-sm ${
                    totalQuestions({
                      data: item,
                      selectedModes: selectedModes.map(item => item.value),
                    }) === 0
                      ? 'text-gray-300'
                      : ''
                  }`}>
                  {item.topic_name}
                </label>
              </div>
              <input
                type="number"
                className={`-ml-4 w-12 rounded-lg border border-border-light px-2 py-[2px] text-sm `}
                defaultValue={0}
                min={0}
                value={
                  selectedTopics.find((t: any) => t.topic_id === item.topic_id)
                    ?.allowed_questions
                }
                max={totalQuestions({
                  data: item,
                  selectedModes: selectedModes.map(item => item.value),
                })}
                onChange={e => {
                  setSelectedTopics((topics: any) => {
                    const arr = [...topics];
                    return arr.map((topic: any) => {
                      if (topic.topic_id === item.topic_id)
                        return {
                          ...topic,
                          allowed_questions: Number(e.target.value),
                        };
                      return topic;
                    });
                  });
                }}
              />
              <span
                className="-ml-4 w-fit rounded-lg border border-border-light bg-gray-100 px-2 py-[2px] text-sm"
                onClick={() => {}}>
                {totalQuestions({
                  data: item,
                  selectedModes: selectedModes.map(item => item.value),
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const onSubmit = (data: any) => {
    if (userId) {
      startTest({
        user_id: userId,
        type: 'PREPARATORY',
        duration_of_exam: Number(data.duration),
        question_mode:
          selectedModes.length > 0
            ? selectedModes.map(item => item.value)
            : ['CORRECT', 'INCORRECT', 'SKIPPED', 'UNUSED'],
        course_id: course_id,
        total_questions: selectedTopics
          .filter(
            (obj, index, arr) =>
              arr.findIndex(item => item.topic_id === obj.topic_id) === index,
          )
          ?.reduce((acc, topic) => acc + (topic?.allowed_questions || 0), 0),
        topics: selectedTopics.filter(
          (obj, index, arr) =>
            arr.findIndex(item => item.topic_id === obj.topic_id) === index,
        ),
        tutor: data.tutor,
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="test gap-6 text-secondary">
        {/* <h2 className="text-black"></h2> */}
        <p className="mb-4 text-base">
          Take a realistic test and track your progress and manage your time
          effectively.
        </p>
        <div className="space-y-4">
          <div className="">
            <div className="relative mb-2 flex w-fit items-center">
              <h2 className="font-semibold">Test Mode</h2>
              <div
                className="p-2"
                onMouseEnter={() => setShowTestMode(true)}
                onMouseLeave={() => setShowTestMode(false)}>
                <InfoSmallIcon />
              </div>
              {showTestMode ? <TestModeDetail /> : null}
            </div>
            <div className={`flex items-center gap-7`}>
              <div className="relative flex items-center gap-7">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  {...register('tutor')}
                  id="tutor"
                />
                <label
                  htmlFor="tutor"
                  className="checkbox-icon absolute top-[2px]"></label>
                <label htmlFor="tutor">Tutor</label>
              </div>
            </div>
          </div>
          <div className="">
            <div className="relative mb-2 flex w-fit cursor-pointer items-center ">
              <h2 className="font-semibold">Quesiton Mode</h2>
              <div
                className="p-2"
                onMouseEnter={() => setShowQuestionMode(true)}
                onMouseLeave={() => setShowQuestionMode(false)}>
                <InfoSmallIcon />
              </div>
              {showQuestionMode ? <QuestionModeDetail /> : null}
            </div>
            <div className="flex justify-between">
              {QuestionMode.map((item, i) => (
                <div className={`flex items-center gap-7 `} key={i}>
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      id={item.value}
                      onChange={() => {
                        setSelectedModes(prev => {
                          let arr = [...prev];
                          if (prev.find(mode => mode.value === item.value)) {
                            return arr.filter(
                              mode => item.value !== mode.value,
                            );
                          } else {
                            return [...prev, item];
                          }
                        });
                      }}
                    />
                    <label
                      htmlFor={item.value}
                      className="checkbox-icon absolute top-0"></label>
                  </div>
                  <label htmlFor={item.value}>{item.label}</label>
                  <p className="-ml-4 w-fit rounded-lg border border-border-light bg-gray-100 px-2 py-[2px] text-sm">
                    {count[item.value as CountType] || 0}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="">
            <h2 className="mb-2 font-semibold">Subjects</h2>
            <div className="w grid grid-cols-2 gap-2">
              {courseData?.length > 0 &&
                courseData?.map((item: any, i: number) => (
                  <Item key={i} subject={item} />
                ))}
            </div>
          </div>
          <div className="">
            <h2 className="mb-2 font-semibold">Duration</h2>
            <SelectInput
              control={control}
              label=""
              name="duration"
              menuPlacement="top"
              controlClassName="max-w-[200px]"
              customIcon={<IconClock color="#253650" size={16} />}
              options={TimeOptions}
            />
          </div>
          <div className="flex items-center gap-3">
            <p className="font-bold">Number of questions in exam:</p>
            <span className="w-fit rounded-lg border border-border-light bg-gray-100 px-2 py-1 text-sm">
              {selectedTopics?.reduce(
                (acc, topic) => acc + (topic?.allowed_questions || 0),
                0,
              )}
            </span>
          </div>
        </div>
        <div className="mb-1 mt-6 flex items-center gap-4">
          <Button
            text="Start test"
            disabled={
              selectedTopics.reduce(
                (init, item) => init + item.allowed_questions,
                0,
              ) === 0 || !watch('duration')
            }
            type="secondary"
            buttonType="submit"
          />
          <Button text="Cancel" onClick={() => router.back()} />
          <div
            className="p-4"
            onMouseEnter={() => setShowRequired(true)}
            onMouseLeave={() => setShowRequired(false)}>
            <InfoSmallIcon />
          </div>
          <div className="relative">
            {showRequired ? <RequiredFieldsDetail /> : null}
          </div>
        </div>
      </form>
    </div>
  );
};

export default TestModal;

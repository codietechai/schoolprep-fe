'use client';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Button from '@/components/common/button';
import Question from '@/components/test/components/question';
import IconClock from '@/components/icon/icon-clock';
import QuestionIcon from '@/components/icon/question-icon';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import {
  convertToHoursAndMinutes,
  getTimeDifferenceInSeconds,
  reverseTimer,
} from '../common/timer';
import { useDispatch } from 'react-redux';
import {
  createTest,
  deleteTest,
  setFinalResult,
  setQuestionNumber,
  submitAnswer,
} from '@/store/testSlice';
import { showDeleteConfirmation, showMessage } from '@/utils';
import { useMutation, useQuery } from 'react-query';
import {
  FETCH_TEST_KEY,
  FETCH_TEST_REPORT_KEY,
  fetchTestRequest,
  getTestReport,
  handleUserTestAction,
  submitAnswerRequest,
  submitTestRequest,
} from '@/client/endpoints/test';
import { useGlobalSocket } from '@/hooks';
import { io } from 'socket.io-client';
import QuestionNavigator from './components/navigator';
import { toggleSidebar } from '@/store/themeConfigSlice';

export interface TOption {
  text: string;
  _id: string;
  isCorrect: boolean;
}
export interface TQuestion {
  _id: string;
  question_text: string;
  options: TOption[];
  subject_id: string;
  topic_id: string;
  course_id: string;
  explanation_text?: string;
  explanation_image?: string;
  image_url?: string;
  explanation_video?: string;
  difficulty_level: string;
  is_diagnostic: string;
  is_real_exam: string;
}

const QuestionContainer = ({ testType }: { testType: string }) => {
  const test = useSelector((state: IRootState) => state.test);
  const questions = test.test.questions;
  const isTutor = test?.test?.tutor;
  const [open, setOpen] = useState(false);
  const [testId, setTestId] = useState('');
  const [showScroll, setShowScroll] = useState(true);
  const [updatedAction, setUpdatedAction] = useState('');
  const [serialNumber, setSerialNumber] = useState(
    test.test.current_question_no || 1,
  );
  const [selectedOption, setSelectedOption] = useState<TOption | null>(null);
  const userSession = useSelector((state: IRootState) => state.auth);
  const [isActive, setIsActive] = useState(true);
  const user = userSession.user?.user;
  const [onlineUsers, setOnlineUsers] = useState(null);

  const payload = {
    user_id: user?.id.toString() as string,
    _id: test.test._id,
    test_type: 'PREPARATORY',
  };
  useQuery([FETCH_TEST_KEY], () => fetchTestRequest(payload), {
    refetchOnWindowFocus: false,
    enabled: testType === 'PREPARATORY' && !!payload._id,
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
            getTimeDifferenceInSeconds(
              testData.createdAt,
              testData.paused_at || testData.updatedAt,
            ),
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

  useEffect(() => {
    if (user?.id) {
      const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
        query: {
          userId: user.id,
          testId: test.test._id,
        },
      });

      useGlobalSocket.getState().setSocket(socket);

      socket.on('getOnlineUsers', users => {
        setOnlineUsers(users);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user?.id]);
  const [result, setResult] = useState<
    {
      question: TQuestion;
      selected_option: TOption | null;
      time_taken: number;
    }[]
  >(test.test?.progress as any);
  const router = useRouter();
  const params = usePathname();
  useLayoutEffect(() => {
    if (
      params === '/portal/diagnostic-test/test' ||
      params === '/portal/preparatory-test/test'
    ) {
      document.body.classList.add('main-body');
    }
    return () => {
      document.body.classList.remove('main-body');
    };
  }, []);
  const [isAnswerChecked, setIsAnswerChecked] = useState(!isTutor);
  const [showExplanation, setShowExplanation] = useState(false);
  const dispatch = useDispatch();

  const { isLoading: isGettingTestReport } = useQuery(
    [FETCH_TEST_REPORT_KEY, testId],
    () => getTestReport({ test_id: test?.test?._id }),
    {
      refetchOnWindowFocus: false,
      enabled: !!testId,
      onSuccess(data) {
        dispatch(deleteTest());
        dispatch(setFinalResult(data.data.data));
        if (testType === 'PREPARATORY') {
          router.replace(`/portal/preparatory-test/result`);
        } else {
          router.replace(`/portal/diagnostic-test/result`);
        }
      },
    },
  );

  const endTestConfirmation = async () => {
    const data = await showDeleteConfirmation(
      'Do you really want to submit your test?',
    );
    if (data?.isConfirmed) {
      submitTest({ test_id: test.test._id });
    }
  };

  const pauseTestConfirmation = async () => {
    const data = await showDeleteConfirmation(
      'Do you really want to finish test later?',
    );
    if (data?.isConfirmed) {
      dispatch(deleteTest());
      router.push('/portal/preparatory-test');
    }
  };

  const { mutate: answer, isLoading: submittingAnswer } = useMutation(
    submitAnswerRequest,
    {
      onError(error: any) {
        if (error.response.data.message === 'test already submitted') {
          router.push('/portal/dashboard');
        }
      },
    },
  );
  const [lastQuestionSumbitted, setLastQuestionSubmitted] =
    useState<boolean>(false);

  const { mutate: action, isLoading: takingAction } = useMutation(
    handleUserTestAction,
    {
      onSuccess: res => {
        if (serialNumber === questions?.length) {
          setLastQuestionSubmitted(true);
        }
      },
      onError(error: any) {
        console.log('error :>> ', error.response.data.message);
      },
    },
  );

  useEffect(() => {
    if (serialNumber !== questions?.length) {
      setLastQuestionSubmitted(false);
    }
  }, [serialNumber, lastQuestionSumbitted]);

  const { mutate: submitTest, isLoading: submittingTest } = useMutation(
    submitTestRequest,
    {
      onSuccess: (res: any) => {
        setTestId(test.test._id);
        showMessage(res.data.message || 'Test Submitted successfully');
      },
      onError(error: any) {
        if (error.response.data.message === 'test already submitted') {
          router.push('/portal/dashboard');
        }
      },
    },
  );
  const handleSubmitTest = () => {
    submitTest({ test_id: test.test._id });
  };
  let timeLeft = reverseTimer(
    test?.test?.remaining_time?.toString(),
    isActive,
    handleSubmitTest,
  );

  useEffect(() => {
    if (lastQuestionSumbitted && updatedAction === 'NEXT') {
      submitTest({ test_id: test.test._id });
    }
  }, [lastQuestionSumbitted, updatedAction]);
  const isSidebarOpened = useSelector(
    (state: IRootState) => state.themeConfig.sidebar,
  );
  useEffect(() => {
    if (!isSidebarOpened) {
      dispatch(toggleSidebar());
    }
  }, []);

  return (
    <>
      {/* <FullscreenGuard submit={() => submitTest({ test_id: test.test._id })} /> */}
      {questions?.length > 0 ? (
        <div className="">
          <div className="m-auto flex max-w-[1024px] flex-col justify-between gap-4 py-3 md:flex-row md:gap-0 md:py-10">
            <div className="">
              <h2 className="mb-2 text-center text-[24px] font-bold leading-[36px] text-black md:text-left md:text-[38px] md:leading-[50px]">
                {testType[0]}
                {testType.slice(1, testType.length).toLowerCase()} test
              </h2>
              <div className="flex flex-col gap-1 md:flex-row md:gap-4">
                <div className="flex gap-1">
                  <QuestionIcon />
                  <p className="">{questions?.length} Questions</p>
                </div>
                <div className="flex gap-1">
                  <IconClock />
                  <p className="">
                    {convertToHoursAndMinutes(
                      Number(test.test.duration_of_exam),
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 md:justify-start">
              {testType === 'PREPARATORY' && (
                <Button
                  type="primary"
                  buttonType="button"
                  onClick={pauseTestConfirmation}
                  className="!px-8"
                  text="Pause test"
                />
              )}
              <Button
                type="primary"
                buttonType="button"
                onClick={endTestConfirmation}
                className="!px-8"
                text="Submit test"
              />

              <Button
                type="secondary"
                onClick={() => {}}
                icon={<IconClock color="white" />}
                text={timeLeft}
              />
            </div>
          </div>
          <div
            className={`dashboard-panel ${
              isTutor ? 'lg:grid-cols-2' : 'm-auto max-w-[1024px]'
            } relative grid grid-cols-1 `}>
            <div
              className={`flex flex-col gap-8 ${
                isTutor ? 'lg:border-r lg:border-gray-200 lg:pr-[42px]' : ''
              }  lg:flex-row`}>
              <form className="flex w-full flex-col justify-between ">
                <QuestionNavigator
                  setShow={setOpen}
                  show={open}
                  testType={testType}
                  action={action}
                  setLastQuestionSubmitted={setLastQuestionSubmitted}
                  setSerialNumber={setSerialNumber}
                  setIsChecked={setIsAnswerChecked}
                  setSelectedOption={setSelectedOption}
                  setUpdatedAction={setUpdatedAction}
                />
                <div className="absolute right-3 top-3 md:right-5 md:top-5">
                  <Button
                    text="Navigator"
                    buttonType="button"
                    onClick={() => setOpen(true)}
                  />
                </div>
                <Question
                  isTutor={isTutor}
                  answerChecked={isAnswerChecked}
                  n={serialNumber}
                  question={questions[serialNumber - 1]}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
                <div className="mt-10 flex gap-6 self-end">
                  {!isTutor && (
                    <Button
                      text="Skip"
                      type="tertiary"
                      disabled={
                        submittingTest ||
                        isGettingTestReport ||
                        takingAction ||
                        submittingAnswer
                      }
                      onClick={() => {
                        setShowScroll(true);
                        if (serialNumber === questions?.length) {
                          setUpdatedAction('NEXT');
                          action({
                            action: 'NEXT',
                            current_question_id:
                              questions[serialNumber - 1]._id,
                            new_question_id: null,
                            test_id: test.test._id,
                          });
                        } else {
                          setUpdatedAction('NEXT');
                          action({
                            action: 'NEXT',
                            current_question_id:
                              questions[serialNumber - 1]._id,
                            new_question_id: questions[serialNumber]?._id,
                            upcoming_question_id:
                              questions[serialNumber + 1]?._id,
                            test_id: test.test._id,
                          });
                        }

                        if (serialNumber !== questions?.length) {
                          setSerialNumber(prev => prev + 1);
                          dispatch(setQuestionNumber(serialNumber + 1));
                        }
                        if (result[serialNumber]) {
                          setSelectedOption(
                            result[serialNumber].selected_option,
                          );
                        } else setSelectedOption(null);

                        if (result[serialNumber] || result[serialNumber - 1]) {
                          if (
                            result[serialNumber - 1].selected_option !== null
                          ) {
                            answer({
                              question_id: questions[serialNumber - 1]._id,
                              selected_option_id: null,
                              test_id: test.test._id,
                            });

                            setResult(prev => {
                              const updatedResult = [...prev];
                              updatedResult.splice(serialNumber - 1, 1, {
                                question: questions[serialNumber - 1],
                                selected_option: null,
                                time_taken: 0,
                              });

                              dispatch(submitAnswer(updatedResult));
                              return updatedResult;
                            });
                          }
                        } else {
                          if (result?.length !== serialNumber) {
                            answer({
                              question_id: questions[serialNumber - 1]._id,
                              selected_option_id: null,
                              test_id: test.test._id,
                            });

                            setResult(prev => {
                              const updatedResult = [...prev];
                              updatedResult.push({
                                question: questions[serialNumber - 1],
                                selected_option: null,
                                time_taken: 0,
                              });
                              dispatch(submitAnswer(updatedResult));
                              return updatedResult;
                            });
                          }
                        }
                      }}
                    />
                  )}
                  {serialNumber > 1 && (
                    <Button
                      text="Back"
                      type="primary"
                      onClick={() => {
                        setShowScroll(true);
                        if (isTutor) {
                          setIsAnswerChecked(true);
                        }
                        setSerialNumber(serialNumber - 1);
                        dispatch(setQuestionNumber(serialNumber - 1));
                        setSelectedOption(
                          result[serialNumber - 2].selected_option,
                        );
                        setUpdatedAction('BACK');
                        action({
                          action: 'BACK',
                          current_question_id: questions[serialNumber - 1]._id,
                          new_question_id: questions[serialNumber - 2]._id,
                          test_id: test.test._id,
                        });
                      }}
                      disabled={serialNumber < 2}
                    />
                  )}
                  {isTutor && !isAnswerChecked && (
                    <Button
                      onClick={() => {
                        setIsAnswerChecked(true);
                        setShowExplanation(true);
                        // setIsActive(false);
                      }}
                      text="Check answer"
                      disabled={!selectedOption}
                      type="secondary"
                    />
                  )}
                  {isAnswerChecked && (
                    <Button
                      text={
                        serialNumber === questions?.length ? 'Submit' : 'Next'
                      }
                      type="secondary"
                      disabled={
                        !selectedOption ||
                        !isAnswerChecked ||
                        submittingTest ||
                        isGettingTestReport ||
                        takingAction ||
                        submittingAnswer
                      }
                      onClick={async () => {
                        setShowScroll(true);
                        if (serialNumber === questions?.length) {
                          const data = await showDeleteConfirmation(
                            'Are you sure you want to submit your test?',
                          );
                          if (!data?.isConfirmed) {
                            return;
                          }
                        }

                        if (
                          serialNumber !== questions?.length &&
                          selectedOption
                        ) {
                          setSerialNumber(prev => prev + 1);
                          dispatch(setQuestionNumber(serialNumber + 1));
                        }
                        if (serialNumber === questions?.length) {
                          setUpdatedAction('NEXT');
                          action({
                            action: 'NEXT',
                            current_question_id:
                              questions[serialNumber - 1]._id,
                            new_question_id: null,
                            test_id: test.test._id,
                          });
                        } else {
                          setUpdatedAction('NEXT');
                          action({
                            action: 'NEXT',
                            current_question_id:
                              questions[serialNumber - 1]._id,
                            new_question_id: questions[serialNumber]?._id,
                            upcoming_question_id:
                              questions[serialNumber + 1]?._id,
                            test_id: test.test._id,
                          });
                        }
                        if (result[serialNumber]) {
                          setSelectedOption(
                            result[serialNumber].selected_option,
                          );
                        } else {
                          setSelectedOption(null);
                          if (isTutor) {
                            setIsAnswerChecked(false);
                            setShowExplanation(false);
                          }
                        }

                        if (result[serialNumber] || result[serialNumber - 1]) {
                          if (
                            result[serialNumber - 1].selected_option?.text !==
                            selectedOption?.text
                          ) {
                            answer({
                              question_id: questions[serialNumber - 1]._id,
                              selected_option_id: selectedOption?._id as string,
                              test_id: test.test._id,
                            });

                            setResult(prev => {
                              const updatedResult = [...prev];
                              updatedResult.splice(serialNumber - 1, 1, {
                                question: questions[serialNumber - 1],
                                selected_option: selectedOption,
                                time_taken: 0,
                              });

                              dispatch(submitAnswer(updatedResult));
                              return updatedResult;
                            });
                          }
                        } else {
                          if (
                            selectedOption?.text &&
                            result?.length !== serialNumber
                          ) {
                            answer({
                              question_id: questions[serialNumber - 1]._id,
                              selected_option_id: selectedOption._id,
                              test_id: test.test._id,
                            });

                            setResult(prev => {
                              const updatedResult = [...prev];
                              updatedResult.push({
                                question: questions[serialNumber - 1],
                                selected_option: selectedOption,
                                time_taken: 0,
                              });
                              dispatch(submitAnswer(updatedResult));
                              return updatedResult;
                            });
                          }
                        }
                      }}
                    />
                  )}
                </div>
              </form>
            </div>
            {questions[serialNumber - 1]?.explanation_text &&
              isTutor &&
              isAnswerChecked && (
                <div className=" relative pl-[42px]">
                  {showScroll && (
                    <div className="absolute bottom-10 left-[45%] rounded-full border border-primary-light bg-white px-3 py-[2px] text-xs font-semibold text-primary shadow-sm shadow-primary">
                      Scroll Down
                    </div>
                  )}
                  <h2 className=" pb-5 text-[24px] font-bold leading-[36px] text-black">
                    {' '}
                    Explanation
                  </h2>
                  <div
                    className="invisible-scrollbar max-h-[82vh] overflow-y-scroll"
                    onScroll={() => setShowScroll(false)}>
                    {questions[serialNumber - 1].explanation_image && (
                      <img
                        src={
                          questions[serialNumber - 1]
                            .explanation_image as string
                        }
                        className=" h-auto w-[100%] rounded-md"
                        alt=""
                      />
                    )}
                    {questions[serialNumber - 1].explanation_video && (
                      <video
                        src={questions[serialNumber - 1].explanation_video}
                        className="mt-5 h-auto w-[300px]"></video>
                    )}
                    <p className="mt-5">
                      {questions[serialNumber - 1]?.explanation_text}{' '}
                      skkkkkkkkkk jdkallllllllllllllf jkdasljf Lorem ipsum dolor
                      sit amet consectetur adipisicing elit. Minus nemo illum a
                      et dolorum eius molestias reprehenderit cum quidem
                      reiciendis ipsam sed neque accusamus sequi modi, possimus
                      omnis odio repellendus earum dolores sapiente! Libero,
                      perferendis alias nam ipsa eum nostrum laudantium ratione
                      eligendi impedit quam exercitationem esse, aliquam qui
                      quae in iste. Cupiditate adipisci eius doloribus, odio
                      reprehenderit, expedita doloremque sequi laborum aliquid
                      eum, praesentium beatae magni laboriosam! Lorem ipsum
                      dolor sit amet consectetur adipisicing elit. Animi, ad!
                      Tempore, ea odit, nulla iste ratione similique excepturi
                      quisquam placeat ipsa voluptatem facilis porro distinctio
                      reiciendis iusto nostrum voluptates. Ullam culpa earum
                      vero qui voluptate velit, debitis in illum nesciunt non.
                      Asperiores, tempora unde earum laudantium placeat rem odit
                      minus?
                    </p>
                  </div>
                </div>
              )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default QuestionContainer;

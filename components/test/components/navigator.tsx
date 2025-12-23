import Button from '@/components/common/button';
import { SmallBookmarkIcon } from '@/components/icon/bookmark-icons';
import { IRootState } from '@/store';
import { setQuestionNumber } from '@/store/testSlice';
import { Modal } from '@mantine/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const QuestionNavigator = ({
  show,
  setShow,
  testType,
  action,
  setSerialNumber,
  setIsChecked,
  setSelectedOption,
  setLastQuestionSubmitted,
  setUpdatedAction,
}: {
  show: boolean;
  setShow: any;
  testType: string;
  action: any;
  setSerialNumber: React.Dispatch<React.SetStateAction<number>>;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedOption: React.Dispatch<React.SetStateAction<any>>;
  setUpdatedAction: React.Dispatch<React.SetStateAction<string>>;
  setLastQuestionSubmitted: any;
}) => {
  const dispatch = useDispatch();
  const test = useSelector((state: IRootState) => state.test);
  const totalQuestions = test?.test?.questions?.length;
  const progress = test?.test?.progress;
  const isTutor = test?.test?.tutor;
  const current_question_id = progress[progress.length - 1]?.question?._id;
  const isPreparatory = testType === 'PREPARATORY';

  const QuestionReference = ({ serialNumber }: { serialNumber: number }) => {
    const isCorrect =
      progress[serialNumber - 1]?.selected_option?.text ===
      progress[serialNumber - 1]?.question.options.find(
        option => option.isCorrect,
      )?.text;
    const isWrong =
      progress[serialNumber - 1]?.selected_option?.text !==
      progress[serialNumber - 1]?.question.options.find(
        option => option.isCorrect,
      )?.text;
    const isDone = progress[serialNumber - 1]?.selected_option;
    const isBookMarked = test.test.bookmark_questions.includes(
      progress[serialNumber - 1]?.question?._id,
    );

    const isNotReached = serialNumber <= progress.length;

    return (
      <div
        className={`relative ${
          !isNotReached ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={() => {
          if (isNotReached) {
            setUpdatedAction('BACK');
            setIsChecked(true);
            setLastQuestionSubmitted(false);
            setShow(false);
            setSerialNumber(serialNumber);
            dispatch(setQuestionNumber(serialNumber));
            setSelectedOption(progress[serialNumber - 1].selected_option);
            action({
              action: 'BACK',
              current_question_id: current_question_id,
              new_question_id: progress[serialNumber - 1]?.question?._id,
              upcoming_question_id:
                progress[serialNumber]?.question?._id || null,
              test_id: test.test._id,
            });
          }
        }}>
        <p
          className={`relative flex items-center justify-center py-1 ${
            progress[serialNumber - 1] && isCorrect && isPreparatory && isTutor
              ? 'rounded-t-full bg-success-light  text-white'
              : isWrong && isPreparatory && isTutor
              ? 'rounded-b-full bg-danger-light text-white'
              : isDone
              ? 'rounded-lg bg-primary text-white'
              : 'rounded-lg border border-border'
          } `}>
          {serialNumber}
        </p>
        {isBookMarked && (
          <div className="absolute right-1 top-0">
            <SmallBookmarkIcon color={isDone ? '#fff' : ''} />
          </div>
        )}
      </div>
    );
  };
  return (
    <Modal
      opened={show}
      onClose={() => setShow(false)}
      title="Test Overview"
      styles={{
        title: {
          color: '#05060F',
          fontWeight: 'bold',
          textAlign: 'center',
          width: '100%',
        },
        body: {
          paddingLeft: '28px',
          paddingRight: '28px',
          minHeight: '300px',
        },
        modal: {
          top: '20%',
          borderRadius: '16px',
        },
      }}
      overlayBlur={3}
      overlayOpacity={0.55}>
      <div className="mb-4 grid grid-cols-2 text-black">
        {testType === 'PREPARATORY' && (
          <>
            <div className="flex items-center gap-2">
              <span className="h-[14px] w-[14px] rounded-sm bg-success-light"></span>
              <span className="">Correct</span>
            </div>{' '}
            <div className="flex items-center gap-2">
              <span className="h-[14px] w-[14px] rounded-sm bg-danger-light"></span>
              <span className="">Incorrect</span>
            </div>{' '}
          </>
        )}
        <div className="flex items-center gap-2">
          <span className="h-[14px] w-[14px] rounded-sm bg-primary"></span>
          <span className="">Attempted</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-[14px] w-[14px] rounded-sm border border-border"></span>
          <span className="">Not Attempted</span>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-6 text-secondary">
        {Array(totalQuestions)
          .fill(0)
          .map((_, i: number) => (
            <QuestionReference serialNumber={i + 1} />
          ))}
      </div>
    </Modal>
  );
};

export default QuestionNavigator;

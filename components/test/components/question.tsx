import CrossIcon from '@/components/icon/icon-cross';
import TickIcon from '@/components/icon/icon-tick';
import React from 'react';
import { TOption, TQuestion } from '../question-container';
import Image from 'next/image';
import {
  AddToBookMarkIcon,
  RemoveFromBookMarkIcon,
} from '@/components/icon/bookmark-icons';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { useMutation } from 'react-query';
import { showMessage } from '@/utils';
import { useDispatch } from 'react-redux';
import { addToBookMark, removeFromBookMark } from '@/store/testSlice';
import {
  addBookmarkRequest,
  removeBookmarkRequest,
} from '@/client/endpoints/test';

const Question = ({
  isTutor,
  answerChecked,
  question,
  n,
  selectedOption,
  setSelectedOption,
}: {
  isTutor: boolean;
  answerChecked: boolean;
  question: TQuestion;
  n: number;
  selectedOption: TOption | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<TOption | null>>;
}) => {
  const test = useSelector((state: IRootState) => state.test).test;
  const dispatch = useDispatch();
  const bookmarks = test.bookmark_questions;

  const { mutate: handleAddToBookMark } = useMutation(addBookmarkRequest, {
    onSuccess: (res: any) => {
      console.log('res', res);
    },
    onError: error => {
      showMessage('Unable to book mark');
    },
  });
  const { mutate: handleRemoveFromBookMark } = useMutation(
    removeBookmarkRequest,
    {
      onSuccess: (res: any) => {
        console.log('res', res);
      },
      onError: error => {
        showMessage('Unable to book mark');
      },
    },
  );

  const Option = ({ option, id }: { option: TOption; id: number }) => {
    return (
      <>
        {answerChecked && option.isCorrect && isTutor ? (
          <div className="space-y-4 rounded-lg border-2 border-success bg-[#F4FAF7] p-6">
            <p
              className={`rounded-lg bg-[#C5FFE3] px-4 py-2 text-xs font-[500] text-success`}>
              {selectedOption?.text === option.text
                ? 'Your answer is correct'
                : 'Correct answer is'}
            </p>
            <div className="flex items-center gap-4">
              <TickIcon color="#206945" />
              <span className="">{option.text}</span>
            </div>
          </div>
        ) : selectedOption?.text === option.text && answerChecked && isTutor ? (
          <div className="space-y-4 rounded-lg border-2 border-danger bg-[#FFF3F3] p-6">
            <p
              className={`rounded-lg bg-[#FFC5C5] px-4 py-2 text-xs font-[500] text-danger`}>
              Your answer is incorrect
            </p>
            <div className="flex items-center gap-4">
              <CrossIcon />
              <span className="">{option.text}</span>
            </div>
          </div>
        ) : (
          <div
            className={`flex cursor-pointer items-center gap-8 rounded-lg border lg:gap-10 ${
              selectedOption?.text === option.text
                ? 'border-primary'
                : 'border-border'
            } p-3 md:p-6`}
            onClick={() => {
              setSelectedOption(option);
            }}>
            <div className="relative">
              <input
                type="radio"
                className="custom-radio"
                id={id.toString()}
                checked={selectedOption?.text === option.text}
                onChange={() => {
                  setSelectedOption(option);
                }}
              />
              <label
                htmlFor={id.toString()}
                className="radio-icon absolute top-[3px] md:top-0 "></label>
            </div>
            <p className="">{option.text}</p>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2 md:gap-4">
          <h2 className="text-lg font-bold text-black md:text-[24px] md:leading-[36px]">
            Question {n}
          </h2>
          {!isTutor && (
            <>
              {!bookmarks.includes(question._id) ? (
                <div
                  onClick={() => {
                    handleAddToBookMark({
                      question_id: question._id,
                      test_id: test._id,
                    });
                    dispatch(addToBookMark(question._id));
                  }}>
                  <AddToBookMarkIcon />
                </div>
              ) : (
                <div
                  onClick={() => {
                    handleRemoveFromBookMark({
                      question_id: question._id,
                      test_id: test._id,
                    });
                    dispatch(removeFromBookMark(question._id));
                  }}>
                  <RemoveFromBookMarkIcon />
                </div>
              )}
            </>
          )}
        </div>
        <p className="font-[600]">{question?.question_text}</p>
      </div>
      <div className="space-y-8">
        {question?.options.map((item, i) => (
          <Option key={i} id={i} option={item} />
        ))}
      </div>
    </div>
  );
};

export default Question;

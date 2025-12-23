import React, { useState } from 'react';
import TickIcon from '@/components/icon/icon-tick';
import CrossIcon from '@/components/icon/icon-cross';
import { TQuestion } from '../../question-container';
import { formatSeconds } from '@/components/common/timer';

const Overview = ({
  overview,
  filter,
  n,
  questions,
}: {
  overview: {
    question: TQuestion;
    selected_option: string | null;
    time_taken: { previous_time_in_seconds: number };
    _id: string;
  };
  filter: { label: string; value: string };
  questions: {
    question: TQuestion;
    selected_option: string | null;
    time_taken: number;
    _id: string;
  }[];
  n: number;
}) => {
  const [showImage, setShowImage] = useState(false);
  const correctOption = overview.question.options.find(
    item => item.isCorrect,
  )?._id;
  const correctFilter = filter.value === 'correct';
  const incorrectFilter = filter.value === 'incorrect';
  const skippedFilter = filter.value === 'skipped';
  const appliedFilter = correctFilter
    ? correctOption === overview?.selected_option
    : incorrectFilter
    ? correctOption !== overview?.selected_option &&
      overview?.selected_option !== null
    : skippedFilter
    ? overview?.selected_option === null
    : true;

  return (
    <>
      {appliedFilter && (
        <div className="space-y-6 border-b border-border-light pb-8">
          <div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <h2 className="mb-1 font-bold text-black">Question {n}</h2>
                {overview?.selected_option === null && (
                  <p className="">(Skipped)</p>
                )}
              </div>
              <p className="">
                {formatSeconds(overview?.time_taken?.previous_time_in_seconds)}
              </p>
            </div>
            <p className="font-[600]">{overview.question?.question_text}</p>
          </div>
          {correctOption === overview?.selected_option && (
            <div className="space-y-4 rounded-lg border-2 border-success bg-[#F4FAF7] p-6">
              <p
                className={`rounded-lg bg-[#C5FFE3] px-4 py-2 text-xs font-[500] text-success`}>
                Your answer is correct
              </p>
              <div className="flex items-center gap-4">
                <TickIcon color="#206945" />
                <span className="">
                  {
                    questions[n - 1].question.options.find(
                      item => item.isCorrect,
                    )?.text
                  }
                </span>
              </div>
            </div>
          )}
          {correctOption !== overview?.selected_option &&
            overview?.selected_option && (
              <div className="space-y-4 rounded-lg border-2 border-danger bg-[#FFF3F3] p-6">
                <p
                  className={`rounded-lg bg-[#FFC5C5] px-4 py-2 text-xs font-[500] text-danger`}>
                  Your answer is incorrect
                </p>
                <div className="flex items-center gap-4">
                  <CrossIcon />
                  <span className="">
                    {
                      questions[n - 1]?.question?.options.find(
                        item => item._id === overview?.selected_option,
                      )?.text
                    }
                  </span>
                </div>
              </div>
            )}
          {correctOption !== overview?.selected_option && (
            <div className="space-y-4 rounded-lg border border-border bg-[#F4FAF7] p-6">
              <p
                className={`rounded-lg bg-[#C5FFE3] px-4 py-2 text-xs font-[500] text-success`}>
                Correct answer is
              </p>
              <div className="flex items-center gap-4">
                <TickIcon color="#206945" />
                <span className="">
                  {
                    questions[n - 1].question.options.find(
                      item => item.isCorrect,
                    )?.text
                  }
                </span>
              </div>
            </div>
          )}
          <div className="rounded-lg bg-background p-4">
            <h2 className="mb-1 font-[600]">Explanation</h2>
            <p className="">
              {overview.question.explanation_image && showImage && (
                <div className="p-4">
                  <img
                    src={overview.question.explanation_image}
                    className="max-h-[50vh] w-auto rounded-md"
                    alt=""
                  />
                </div>
              )}
              {showImage
                ? overview.question.explanation_text
                : overview?.question?.explanation_text?.slice(0, 221)}
              {!showImage && (
                <span>
                  ...{' '}
                  <span
                    className="cursor-pointer text-primary underline"
                    onClick={() => {
                      setShowImage(true);
                    }}>
                    more
                  </span>
                </span>
              )}{' '}
              {showImage && (
                <span
                  className="cursor-pointer text-primary underline"
                  onClick={() => {
                    setShowImage(false);
                  }}>
                  show less
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Overview;

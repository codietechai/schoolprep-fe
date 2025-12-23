import ProgressBar, {
  MultiProgressBar,
} from '@/components/common/progress-bar';
import IconSearch from '@/components/icon/icon-search';
import { DownTriangleIcon } from '@/components/userui/components/icons/icon';
import React, { useState } from 'react';

export interface TopicForAnalysics {
  _id: string;
  title: string;
  wrong_questions: number;
  correct_questions: number;
  skipped_questions: number;
  total_questions: number;
  subject_id: string;
}

export interface SubjectForAnalysics {
  _id: string;
  name: string;
  correct_questions: number;
  wrong_questions: number;
  skipped_questions: number;
  total_questions: number;
  topics: TopicForAnalysics[];
  total_subject_questions?: string;
}

export const ItemOfAnalysis = ({
  subject,
  search,
}: {
  subject: SubjectForAnalysics;
  search: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {subject.name.toLowerCase().includes(search?.toLowerCase()) && (
        <>
          <tr className={open ? '!bg-[#ebebeb]' : ''}>
            <td>
              <div
                className="flex cursor-pointer items-center gap-2"
                onClick={() => setOpen(!open)}>
                <div
                  className={
                    open ? 'rotate-180 transition-all duration-300' : ''
                  }>
                  <DownTriangleIcon />
                </div>
                <span className="">
                  {/* <BoldText search={search} word={subject.name} /> */}
                  {subject.name}
                </span>
              </div>
              <div className="ml-5">
                <MultiProgressBar
                  segments={[
                    { value: subject.correct_questions, color: 'green' },
                    { value: subject.wrong_questions, color: 'red' },
                    { value: subject.skipped_questions, color: 'blue' },
                  ]}
                  max={subject.total_questions}
                />
              </div>
            </td>
            {/* {subject} */}
            <td className="text-center">
              {subject.total_questions}{' '}
              {subject.total_subject_questions
                ? `/${subject.total_subject_questions}`
                : ''}
            </td>
            <td className="text-center">{subject.correct_questions}</td>
            <td className="text-center">{subject.wrong_questions}</td>
            <td className="text-center">{subject.skipped_questions}</td>
          </tr>
          {open ? (
            subject.topics.map((topic, i) => (
              <tr className="" key={i}>
                <td className="relative !pl-14">
                  {topic.title}
                  {/* <div className=""> */}
                  <MultiProgressBar
                    segments={[
                      { value: topic.correct_questions, color: 'green' },
                      { value: topic.wrong_questions, color: 'red' },
                      { value: topic.skipped_questions, color: 'blue' },
                    ]}
                    max={topic.total_questions}
                  />
                  {/* </div> */}
                </td>
                <td className="text-center">{topic.total_questions}</td>
                <td className="text-center">{topic.correct_questions}</td>
                <td className="text-center">{topic.wrong_questions}</td>
                <td className="text-center">{topic.skipped_questions}</td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};
// function BoldText({ search, word }: { search: string; word: string }) {
//   if (!word.toLowerCase().includes(search.toLowerCase()))
//     return <span>{word}</span>;

//   const boldedWord = word
//     .split('')
//     .map((char, i) =>
//       search.toLowerCase().includes(char.toLowerCase()) ? (
//         <b key={i}>{char}</b>
//       ) : (
//         char
//       ),
//     );

//   return <span>{boldedWord}</span>;
// }
const QuestionsList = ({ result }: { result: any }) => {
  const progress = result?.progress;
  const [search, setSearch] = useState('');
  const topics = Array.from(
    new Set(
      result?.topics.map((item: any) => {
        return {
          _id: item.topic_id?._id,
          title: item.topic_id?.title,
          wrong_questions: progress
            .filter(
              (progressItem: any) =>
                progressItem.question.topic_id === item.topic_id?._id,
            )
            .filter(
              (element: any) =>
                element.question.options.filter(
                  (option: any) => option.isCorrect,
                )[0]._id !== element.selected_option &&
                element.selected_option !== null,
            )?.length,
          correct_questions: progress
            .filter(
              (progressItem: any) =>
                progressItem.question.topic_id === item.topic_id?._id,
            )
            .filter(
              (element: any) =>
                element.question.options.filter(
                  (option: any) => option.isCorrect,
                )[0]._id === element.selected_option,
            )?.length,
          skipped_questions: progress.filter(
            (progressItem: any) =>
              progressItem.question.topic_id === item.topic_id?._id &&
              progressItem.selected_option === null,
          ).length,
          total_questions: progress.filter(
            (progressItem: any) =>
              progressItem.question.topic_id === item.topic_id?._id,
          ).length,
          subject_id: item?.topic_id?.subject._id,
        };
      }) || [],
    ),
  );
  const subjects = result?.topics
    .map((item: any) => {
      return item.topic_id?.subject;
    })
    .filter(
      (subject: any, index: number, self: any) =>
        index ===
        self.findIndex((c: any) => {
          return c._id === subject._id;
        }),
    );

  const subjectsWithData = subjects.map((subject: any) => {
    return {
      ...subject,
      correct_questions: topics
        .filter((topic: any) => topic.subject_id === subject._id)
        .reduce((sum, item: any) => sum + item.correct_questions, 0),
      wrong_questions: topics
        .filter((topic: any) => topic.subject_id === subject._id)
        .reduce((sum, item: any) => sum + item.wrong_questions, 0),
      skipped_questions: topics
        .filter((topic: any) => topic.subject_id === subject._id)
        .reduce((sum, item: any) => sum + item.skipped_questions, 0),
      total_questions: topics
        .filter((topic: any) => topic.subject_id === subject._id)
        .reduce((sum, item: any) => sum + item.total_questions, 0),
      topics: topics.filter((topic: any) => topic.subject_id === subject._id),
    };
  });
  const filteredData = subjectsWithData.filter((subject: any) =>
    subject.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="min-h-[43vh]">
      <div className="relative rounded-lg border-0 p-0">
        <div className="absolute -top-24 right-0 z-50">
          <div className="relative z-50 rounded-lg">
            <input
              type="text"
              placeholder="Search..."
              className="peer form-input min-h-[30px] py-[10px] ltr:pr-11 rtl:pl-11"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
              <IconSearch className="mx-auto" />
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <div className="datatables">
            {filteredData?.length ? (
              <table>
                <thead>
                  <tr>
                    <th className="">Subjects</th>
                    <th className="text-center">Total Question</th>
                    <th className="text-center">CORRECT Q</th>
                    <th className="text-center">INCORRECT Q</th>
                    <th className="text-center">OMITTED Q</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map(
                    (subject: SubjectForAnalysics, i: number) => (
                      <ItemOfAnalysis
                        subject={subject}
                        key={i}
                        search={search}
                      />
                    ),
                  )}
                </tbody>
              </table>
            ) : (
              <p className="flex h-[30vh] w-full items-center justify-center">
                {' '}
                No results for "{search}"
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsList;

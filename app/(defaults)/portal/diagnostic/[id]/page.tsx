'use client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Button from '@/components/common/loader-button';
import { useMutation, useQuery } from 'react-query';
import {
  addTopicAllowedQuestions,
  FETCH_TOPIC_KEY_COURSE,
  fetchTopicsByCourse,
} from '@/client/endpoints';
import { showMessage } from '@/utils';
import SelectInput from '@/components/plan-pricing/select-input';
import { convertToHoursAndMinutes } from '@/components/common/timer';

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
  {
    label: '3 hour',
    value: '3',
  },
  {
    label: '3 hour 30 minutes',
    value: '3.5',
  },
];

const page = () => {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id;
  const [courseData, setCourseData] = useState<any>(null);
  const [selectedTopics, setSelectedTopics] = useState<any[]>([]);

  const { refetch } = useQuery(
    [FETCH_TOPIC_KEY_COURSE, courseId],
    () => fetchTopicsByCourse(courseId as string),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: !!courseId,
      retry: 0,
      onSuccess(data) {
        setCourseData(data?.data);
      },
    },
  );

  const [duration, setDuration] = useState<{ label: string; value: string }>({
    label: convertToHoursAndMinutes(courseData?.diagnostic_test_time || 0),
    value: courseData?.diagnostic_test_time,
  });

  useEffect(() => {
    setDuration({
      label: convertToHoursAndMinutes(courseData?.diagnostic_test_time || 0),
      value: courseData?.diagnostic_test_time,
    });
  }, [courseData]);

  const { mutate: addAllowedQuestions, isLoading } = useMutation(
    addTopicAllowedQuestions,
    {
      onSuccess: (res: any) => {
        showMessage(res.message || 'Daignostic test updated successfully');
      },
      onError: error => {
        showMessage('Error updating daignostic test', 'error');
      },
    },
  );

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (selectedTopics.length === 0) {
      showMessage('Please select topics', 'error');
      return;
    }
    if (
      selectedTopics.every(topic => topic.topic_id && topic.allowed_questions)
    ) {
      addAllowedQuestions({
        topics: selectedTopics,
        course_id: courseId,
        total_time: duration.value,
      });
    } else {
      showMessage(
        'Please select allowed questions for all selected topics',
        'error',
      );
    }
  };

  useEffect(() => {
    if (courseData?.selected_topic_for_exam?.length > 0) {
      const Topics = courseData.subjects.flatMap(
        (subject: any) => subject?.topics || [],
      );
      setSelectedTopics(
        Topics.filter((topic: any) =>
          courseData.selected_topic_for_exam.includes(topic._id),
        ).map((topic: any) => {
          return {
            topic_id: topic._id,
            allowed_questions: topic.allowed_questions,
          };
        }),
      );
    }
  }, [courseData]);

  const Item = ({
    subject,
  }: {
    subject: { name: string; topics: any[]; _id: string };
  }) => {
    return (
      <div className="">
        <h2 className="text-lg text-secondary">{subject.name}</h2>
        <div className="mt-3 space-y-2">
          {subject?.topics?.map((item, i) => (
            <div className="flex items-center gap-8" key={i}>
              <div className="relative">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  id={item._id}
                  checked={selectedTopics.find(
                    (x: any) => x.topic_id === item._id,
                  )}
                  onChange={() =>
                    setSelectedTopics((topics: any) => {
                      let arr = [...topics];
                      if (
                        topics.find((topic: any) => item._id === topic.topic_id)
                      ) {
                        return arr.filter(x => x.topic_id !== item._id);
                      } else
                        return [
                          ...topics,
                          {
                            topic_id: item._id,
                            allowed_questions: item.allowed_questions,
                          },
                        ];
                    })
                  }
                />
                <label
                  htmlFor={item._id}
                  className="checkbox-icon absolute top-[-1px]"></label>
              </div>
              <span>{item.title}</span>
              <input
                type="number"
                className={`-ml-4 w-14 rounded-lg border border-border-light px-2 py-[2px] text-sm `}
                min={0}
                value={
                  selectedTopics.find((t: any) => t.topic_id === item._id)
                    ?.allowed_questions
                }
                max={item.questions?.length}
                onChange={e => {
                  setSelectedTopics((topics: any) => {
                    const arr = [...topics];
                    return arr.map((topic: any) => {
                      if (topic.topic_id === item._id)
                        return {
                          ...topic,
                          allowed_questions: Number(e.target.value),
                        };
                      return topic;
                    });
                  });
                }}
              />
              <span className="-ml-4 w-14 rounded-lg border border-border-light px-2 py-[2px] text-sm">
                {item.questions?.length}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const totalQuestions = selectedTopics?.reduce(
    (init, topic) => init + topic.allowed_questions,
    0,
  );

  return (
    <div className="pt-5">
      <div className="mb-5 rounded-md border bg-white p-6 dark:border-[#191e3a] dark:bg-black">
        <h6 className="mb-5 text-lg font-bold">Subjects</h6>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-5">
            <div className="">
              <div>
                <div className="grid grid-cols-2 gap-2">
                  {courseData?.subjects.length > 0 &&
                    courseData?.subjects?.map((item: any, i: number) => (
                      <Item key={i} subject={item} />
                    ))}
                </div>
              </div>
              <div className="my-5">
                <h2 className="mb-3 font-semibold">Duration</h2>
                <SelectInput
                  setValue={setDuration}
                  value={duration}
                  options={TimeOptions}
                />
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold">Number of questions in exam:</p>
                <p className="w-12 rounded-lg border border-border-light bg-gray-100 px-2 py-1 text-sm">
                  {totalQuestions}
                </p>
              </div>
              <div className="mt-5 gap-3 sm:col-span-2 md:flex">
                <Button text="Update" loader={isLoading} />
                <button
                  onClick={() => router.back()}
                  type="button"
                  className="btn btn-neutral shadow-sm sm:col-span-2">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;

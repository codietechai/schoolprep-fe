'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/common';
import { addQuestionSchema } from '@/validations';
import { showMessage } from '@/utils';
import { useMutation, useQuery } from 'react-query';
import { LINKS } from '@/constants';
import {
  FETCH_SUBJECTS_KEY,
  fetchSubjects,
  fetchCourses,
  FETCH_COURSES_KEY,
  addQuestionRequest,
  FETCH_TOPICS_KEY,
  fetchTopics,
} from '@/client/endpoints';
import SelectInput from '../plan-pricing/inputSelect';
import ImageSelect, { ImageProps } from '../plan-pricing/image-select';
import withPermissionGuard from '@/hooks/permissions/withRoleGuard';

type TAddQuestions = {
  subject_id: string;
  course_id: string;
  question_text: string;
  options: [
    {
      text: string;
      isCorrect: boolean;
    },
  ];
  topic_id: string;
  explanation_text: string;
  explanation_image?: string;
  explanation_image_data?: string;
  explanation_video: string;
  difficulty_level: string;
  image_url: string;
  image_url_data: string;
  is_diagnostic: boolean;
  is_preparatory: boolean;
  is_real_exam: boolean;
};

const AddQuestionsForm = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [questionOptions, setQuestionOptions] = useState<any[]>([
    {
      text: 'Option1',
      isCorrect: true,
    },
  ]);
  const [images, setImages] = useState<ImageProps[]>([]);
  const [questionimages, setQuestionImages] = useState<ImageProps[]>([]);
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(addQuestionSchema),
  });

  const { data: fetchedCourses } = useQuery(
    [FETCH_COURSES_KEY],
    () =>
      fetchCourses({ size: 1000, skip: 0, search: '', sorting: 'name ASC' }),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  );

  const {} = useQuery(
    [FETCH_TOPICS_KEY, watch('subject_id')],
    () => fetchTopics(watch('subject_id')),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: !!watch('subject_id'),
      onSuccess(data) {
        setTopics(data.data);
      },
    },
  );

  useEffect(() => {
    if (fetchedCourses) {
      setCourses(fetchedCourses?.data || []);
    }
  }, [fetchedCourses]);

  const { data: fetchedSubjects } = useQuery(
    [FETCH_SUBJECTS_KEY],
    () =>
      fetchSubjects({ size: 1000, skip: 0, search: '', sorting: 'name ASC' }),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  );

  useEffect(() => {
    if (fetchedSubjects) {
      setSubjects(fetchedSubjects?.data || []);
    }
  }, [fetchedSubjects]);

  const { mutate: addNewQuestion } = useMutation(addQuestionRequest, {
    onSuccess: (res: any) => {
      router.push(LINKS.questions.route);
      showMessage(res.message || 'Question created successfully');
    },
    onError: (error: any) => {
      showMessage(error.message || 'Something went wrong!', 'error');
    },
  });

  const onSubmit = (data: TAddQuestions) => {
    const answerdataURL = images?.[0]?.dataURL ? images?.[0]?.dataURL : null;
    const questiondataURL = questionimages?.[0]?.dataURL
      ? questionimages?.[0]?.dataURL
      : null;

    let payload = {
      ...data,
      options: questionOptions,
      is_diagnostic: data.is_diagnostic,
      is_preparatory: data.is_preparatory,
      topic_id: data.topic_id,
      is_real_exam: data.is_real_exam,
    };
    if (answerdataURL && questiondataURL) {
      payload = {
        ...payload,
        explanation_image_data: answerdataURL,
        image_url_data: questiondataURL,
      };
    }
    addNewQuestion(payload);
  };

  const handleOptions = (type: string, questionOption?: any) => {
    if (type === 'add') {
      setQuestionOptions([
        ...questionOptions,
        {
          text: '',
          isCorrect: false,
        },
      ]);
    } else if (type === 'remove' && questionOption) {
      setQuestionOptions(
        questionOptions.filter(option => option !== questionOption),
      );
    }
  };

  return (
    <div className="pt-5">
      <div className="mb-5 rounded-md border bg-white p-6 dark:border-[#191e3a] dark:bg-black">
        <h6 className="mb-5 text-lg font-bold">Add New </h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="col-span-2 grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div>
                <SelectInput
                  label="Course"
                  isMandatory
                  control={control}
                  name="course_id"
                  options={courses.map(category => ({
                    value: category._id,
                    label: category.name,
                  }))}
                  errorText={errors.course_id?.message as string}
                />
              </div>
              <div>
                <SelectInput
                  label="Subject"
                  isMandatory
                  control={control}
                  name="subject_id"
                  options={subjects.map(subjects => ({
                    value: subjects._id,
                    label: subjects.name,
                  }))}
                  errorText={errors.subject_id?.message as string}
                />
              </div>
              <div>
                <SelectInput
                  label="Topic"
                  isMandatory
                  isDisabled={!watch('subject_id')}
                  control={control}
                  name="topic_id"
                  options={topics.map(topic => ({
                    value: topic._id,
                    label: topic.title,
                  }))}
                  errorText={errors.topic_id?.message as string}
                />
              </div>
            </div>
            <div>
              <Input
                label="Question"
                isMandatory
                {...register('question_text')}
                placeholder="Enter Question"
                errorText={errors.question_text?.message}
                inverted
              />
            </div>

            <div>
              <SelectInput
                label="Difficulty Level"
                isMandatory
                control={control}
                name="difficulty_level"
                options={[
                  { value: 'EASY', label: 'Easy' },
                  { value: 'MEDIUM', label: 'Medium' },
                  { value: 'HARD', label: 'Hard' },
                ]}
                errorText={errors.difficulty_level?.message as string}
              />
            </div>

            <div>
              <label>
                Question Options <small className="text-danger">*</small>
              </label>
              {questionOptions?.map((questionOption, index) => (
                <div className="mb-3 flex" key={index}>
                  <div className="w-[80%]">
                    <input
                      className="form-input w-full bg-transparent p-3 leading-[16.94px] outline-none focus:ring-0"
                      placeholder="Enter option"
                      value={questionOption.text}
                      onChange={e => {
                        const newOptions = [...questionOptions];
                        newOptions[index].text = e.target.value;
                        setQuestionOptions(newOptions);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className={`btn ${
                      questionOption.isCorrect ? 'btn-success' : 'btn-danger'
                    } ml-2 w-[15%] px-1 text-[10px]`}
                    onClick={() => {
                      const newOptions = questionOptions.map((option, i) => ({
                        ...option,
                        isCorrect: i === index,
                      }));
                      setQuestionOptions(newOptions);
                    }}>
                    {questionOption.isCorrect ? 'Correct' : 'Incorrect'}
                  </button>
                  {index === 0 ? (
                    <button
                      type="button"
                      className="btn btn-success ml-2 w-[5%] text-lg"
                      onClick={() => handleOptions('add')}>
                      +
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-danger ml-2 w-[5%] text-lg"
                      onClick={() => handleOptions('remove', questionOption)}
                      disabled={questionOptions.length <= 1}>
                      -
                    </button>
                  )}
                </div>
              ))}
            </div>
            <ImageSelect
              label="Question (Image)"
              images={questionimages}
              setImages={setQuestionImages}
            />
            <div>
              <SelectInput
                label="Diagnostic Test"
                isMandatory
                control={control}
                name="is_diagnostic" // use "active" for the field name
                options={[
                  { value: 'true', label: 'Yes' }, // Convert boolean to string
                  { value: 'false', label: 'No' }, // Convert boolean to string
                ]}
                errorText={errors.is_diagnostic?.message as string}
              />
            </div>
            <div>
              <SelectInput
                label="Preparatory Test"
                isMandatory
                control={control}
                name="is_preparatory" // use "active" for the field name
                options={[
                  { value: 'true', label: 'Yes' }, // Convert boolean to string
                  { value: 'false', label: 'No' }, // Convert boolean to string
                ]}
                errorText={errors.is_preparatory?.message as string}
              />
            </div>
            <div>
              <SelectInput
                label="Real Exam"
                isMandatory
                control={control}
                name="is_real_exam" // use "active" for the field name
                options={[
                  { value: 'true', label: 'Yes' }, // Convert boolean to string
                  { value: 'false', label: 'No' }, // Convert boolean to string
                ]}
                errorText={errors.is_real_exam?.message as string}
              />
            </div>
            <div>
              <Input
                label="Answer Explanation (Text)"
                inverted
                {...register('explanation_text')}
                placeholder="Enter Answer"
                errorText={errors.explanation_text?.message?.toString()}
              />
            </div>
            <ImageSelect
              label="Answer Explanation (Image)"
              images={images}
              setImages={setImages}
            />
            <div className="mt-3 gap-3 sm:col-span-2 md:flex">
              <button type="submit" className="btn btn-primary sm:col-span-2">
                Save
              </button>
              <button
                onClick={() => router.back()}
                type="button"
                className="btn btn-neutral shadow-sm sm:col-span-2">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export const ProtectedCreateQuestionForm = withPermissionGuard(
  AddQuestionsForm,
  { question: { create: true } },
  '/portal/dashboard',
);

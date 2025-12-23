'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, ErrorMessage, Label, Textarea } from '@/components/common';
import { addCourseSchema, addQuestionSchema } from '@/validations';
import { showDeleteConfirmation, showMessage } from '@/utils';
import { useMutation, useQuery } from 'react-query';
import { LINKS } from '@/constants';
import ImageSelect, { ImageProps } from '../plan-pricing/image-select';

import {
  editCourseRequest,
  fetchCategories,
  fetchCourseSingle,
  FETCH_CATEGORIES_KEY,
  FETCH_SUBJECTS_KEY,
  fetchSubjects,
  fetchCourses,
  FETCH_COURSES_KEY,
  fetchQuestionSingle,
  editQuestionRequest,
  FETCH_TOPICS_KEY,
  fetchTopics,
} from '@/client/endpoints';
import SelectInput from '../plan-pricing/inputSelect';
import Button from '../common/loader-button';
import withPermissionGuard from '@/hooks/permissions/withRoleGuard';

export type TEditQuestion = {
  subject_id: string;
  course_id: string;
  question_text: string;
  topic_id: string;
  options: [
    {
      text: string;
      isCorrect: boolean;
    },
  ];
  explanation_text: string;
  explanation_image?: string;
  difficulty_level: string;
  explanation_image_data?: string;
  image_url: string;
  image_url_data: string;
  explanation_video?: string;
  is_diagnostic: boolean;
  is_preparatory: boolean;
  is_real_exam: boolean;
};

export const EditQuestionsForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const qestionsId = id;
  const [courses, setCourses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [images, setImages] = useState<ImageProps[]>([]);
  const [questionimages, setQuestionImages] = useState<ImageProps[]>([]);
  const [defaultImage, setdefaultImage] = useState<ImageProps[]>();
  const [defaultQuestionImage, setdefaultQuestionImage] =
    useState<ImageProps[]>();
  const [topics, setTopics] = useState<any[]>([]);

  const [questionOptions, setQuestionOptions] = useState<any[]>([
    { text: '', isCorrect: false },
  ]);
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(addQuestionSchema),
  });
  const { data: fetchedCourses } = useQuery(
    [FETCH_COURSES_KEY],
    () =>
      fetchCourses({ size: 1000, skip: 0, search: '', sorting: 'name ASC' }),
    { keepPreviousData: false, refetchOnWindowFocus: false, retry: 0 },
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
    { keepPreviousData: false, refetchOnWindowFocus: false, retry: 0 },
  );

  useEffect(() => {
    if (fetchedSubjects) {
      setSubjects(fetchedSubjects?.data || []);
    }
  }, [fetchedSubjects]);

  const { data: questionData, isLoading } = useQuery(
    ['question', qestionsId],
    () => fetchQuestionSingle(qestionsId as string),
    { enabled: !!qestionsId, retry: 0, refetchOnWindowFocus: false },
  );

  useEffect(() => {
    if (questionData) {
      reset({
        question_text: questionData?.question_text || '',
        course_id: questionData?.course_id || '',
        subject_id: questionData?.subject_id || '',
        topic_id: questionData?.topic_id || '',
        explanation_text: questionData?.explanation_text || '',
        explanation_image: questionData?.explanation_image || '',
        explanation_video: questionData?.explanation_video || '',
        difficulty_level: questionData?.difficulty_level || '',
        is_diagnostic: questionData?.is_diagnostic ? 'true' : 'false',
        is_preparatory: questionData?.is_preparatory ? 'true' : 'false',
        is_real_exam: questionData?.is_real_exam ? 'true' : 'false',
      });

      setQuestionOptions(
        // @ts-ignore
        questionData?.options.map(({ _id, ...rest }) => rest) || [],
      );
      if (questionData?.image_url) {
        setQuestionImages([{ dataURL: questionData?.image_url as string }]);
      }

      if (questionData?.explanation_image) {
        setImages([{ dataURL: questionData?.explanation_image as string }]);
      }
    }
  }, [questionData, reset]);

  const { mutate: updateCourse, isLoading: updatingQuestion } = useMutation(
    editQuestionRequest,
    {
      onSuccess: (res: any) => {
        // router.push(LINKS.questions.route);
        showMessage(res.message || 'Question updated successfully');
      },
      onError: (error: any) => {
        showMessage(error.message || 'Something went wrong!', 'error');
      },
    },
  );

  const onSubmit = (data: TEditQuestion) => {
    const sanitizedOptions = questionOptions.map(({ _id, ...rest }) => rest);
    const answerdataURL = images?.[0]?.dataURL ? images?.[0]?.dataURL : null;
    const questiondataURL = questionimages?.[0]?.dataURL
      ? questionimages?.[0]?.dataURL
      : null;

    let payload: any = {
      ...data,
      id: qestionsId,
      options: sanitizedOptions,
      // explanation_image_data: defaultImage ? defaultImage : '',
      // image_url_data: defaultQuestionImage ? defaultQuestionImage : '',
      topic_id: data.topic_id,
      is_diagnostic: data.is_diagnostic,
      is_preparatory: data.is_preparatory,
      is_real_exam: data.is_real_exam,
    };

    if (answerdataURL) {
      payload = {
        ...payload,
        explanation_image_data: answerdataURL.includes('data:')
          ? answerdataURL
          : '',
      };
    }
    if (questiondataURL) {
      payload = {
        ...payload,
        image_url_data: questiondataURL.includes('data:')
          ? questiondataURL
          : '',
      };
    }

    updateCourse({
      id: questionData?._id,
      ...payload,
    });
  };

  const handleOptions = (type: string, questionOption?: any) => {
    if (type === 'add') {
      setQuestionOptions([...questionOptions, { text: '', isCorrect: false }]);
    } else if (type === 'remove' && questionOption) {
      setQuestionOptions(
        questionOptions.filter(option => option !== questionOption),
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const deleteConfirmation = async () => {
    if (images.length === 0 && defaultImage === undefined) return;
    // if (defaultImage === undefined) return;
    const data = await showDeleteConfirmation(
      'Are you sure want to delete image?',
    );
    if (data?.isConfirmed) {
      setdefaultImage(undefined);
      setImages([]);
    }
  };

  return (
    <div className="pt-5">
      <div className="mb-5 rounded-md border bg-white p-6 dark:border-[#191e3a] dark:bg-black">
        <h6 className="mb-5 text-lg font-bold">Edit Question</h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Course Select */}
            <div className="col-span-2 grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div>
                <SelectInput
                  label="Course"
                  isMandatory
                  control={control}
                  name="course_id"
                  options={courses.map(course => ({
                    value: course._id,
                    label: course.name,
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
                  options={subjects.map(subject => ({
                    value: subject._id,
                    label: subject.name,
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

            {/* Question Text */}
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
              <ImageSelect
                label="Question (Image)"
                images={questionimages}
                onRemove={deleteConfirmation}
                setImages={setQuestionImages}
                defaultImage={defaultQuestionImage}
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
              <Input
                label="Answer Explanation (Text)"
                {...register('explanation_text')}
                isMandatory
                placeholder="Enter Explanation"
                errorText={errors.explanation_text?.message?.toString()}
                inverted
              />
            </div>

            {/* Question Options */}
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
                errorText={errors.active?.message as string}
              />
            </div>
            <div>
              <ImageSelect
                label="Answer Explanation (Image)"
                images={images}
                onRemove={deleteConfirmation}
                setImages={setImages}
                defaultImage={defaultImage}
              />
            </div>

            {/* Submit Button */}
            <div className="mt-3 gap-3 sm:col-span-2 md:flex">
              <Button text="Update" loader={updatingQuestion} />
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
export const ProtectedEditQuestionsForm = withPermissionGuard(
  EditQuestionsForm,
  { question: { update: true } },
  '/portal/dashboard',
);

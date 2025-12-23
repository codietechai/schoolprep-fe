import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';
import { TServerResponseWithPagination, TQueryData } from '@/types';

export const ADD_QUESTION_KEY = 'add-question';
export const DELETE_QUESTION_KEY = 'delete-question';
export const EDIT_QUESTION_KEY = 'edit-question';
export const GET_QUESTION_KEY = 'fetch-question';
export const FETCH_QUESTIONS_KEY = 'list-questions';
export const FETCH_COURSE_QUESTIONS_KEY = 'list-course-questions';

// Types for payloads
export type TAddQuestion = {
  subject_id: string;
  course_id: string;
  question_text: string;
  options: any[];
  difficulty_level: string;
  is_diagnostic: boolean;
  is_preparatory: boolean;
  is_real_exam: boolean;
  explanation_text: string;
  explanation_image?: string;
  explanation_image_data?: string;
  explanation_video: string;
};

export type TEditQuestion = {
  id: string;
  subject_id: string;
  course_id: string;
  topic_id: string;
  question_text: string;
  image_data?: string;
  image_data_url?: string;
  difficulty_level: string;
  options: [
    {
      text: string;
      isCorrect: boolean;
    },
  ];
  explanation_text: string;
  explanation_image?: string;
  explanation_image_data?: string;
  explanation_video?: string;
  is_diagnostic: boolean;
  is_preparatory: boolean;
  is_real_exam: boolean;
  image_url?: string;
  image_url_data?: string;
};

// Fetch a single course by ID
export const fetchQuestionSingle = async (id: string) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(`/admin/questions/get/${id}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Fetch a list of courses with pagination and search
export const fetchQuestions = async (payload: TQueryData) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get<
      TServerResponseWithPagination<any>
    >(
      `/admin/questions/list?size=${payload?.size}&skip=${
        payload?.skip
      }&search=${payload?.search ?? ''}&sorting=${payload.sorting ?? ''}`,
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

export const fetchCourseQuestions = async (
  payload: TQueryData & { course_id: string },
) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get<
      TServerResponseWithPagination<any>
    >(
      `/admin/questions/course-questions?course_id=${payload.course_id}&size=${
        payload.size
      }&skip=${payload.skip}&search=${payload.search ?? ''}`,
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Add a new course
export const addQuestionRequest = async (payload: TAddQuestion) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post('/admin/questions/add', payload);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Edit an existing course
export const editQuestionRequest = async (payload: TEditQuestion) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      `/admin/questions/edit/${payload.id}`,
      {
        subject_id: payload.subject_id,
        topic_id: payload.topic_id,
        course_id: payload.course_id,
        question_text: payload.question_text,
        options: payload.options,
        is_diagnostic: payload.is_diagnostic,
        is_preparatory: payload.is_preparatory,
        is_real_exam: payload.is_real_exam,
        difficulty_level: payload.difficulty_level,
        explanation_text: payload.explanation_text,
        explanation_image: payload.explanation_image,
        explanation_image_data: payload.explanation_image_data,
        image_url: payload.image_url,
        image_url_data: payload.image_url_data,
      },
    );
    return response?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Delete one or more courses
export const deleteQuestionRequest = async (ids: string[]) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.delete('/admin/questions/delete', {
      data: { ids },
    });
    return response?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

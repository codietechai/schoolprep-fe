import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';
import { TServerResponseWithPagination, TQueryData } from '@/types';

export const ADD_TOPIC_KEY = 'add-topic';
export const DELETE_TOPIC_KEY = 'delete-topic';
export const EDIT_TOPIC_KEY = 'edit-topic';
export const GET_TOPIC_KEY = 'fetch-topic';
export const FETCH_TOPIC_KEY_COURSE = 'fetch-topic-course';
export const FETCH_DAIGNOSTIC_COUNT = 'fetch-diagnostic-count';
export const FETCH_TOPICS_KEY = 'list-topics';
export const ADD_ALLOWED_QUESTIONS_KEY = 'add-allowed-questions';

// Types for payloads
export type TAddTopic = {
  title: string;
  subject: string;
  active: boolean;
};

export type TEditTopic = {
  _id: string;
  title: string;
  subject: string;
  active: boolean;
};

// Fetch a single subject by ID
export const fetchTopicSingle = async (id: string) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(`/admin/topic/get/${id}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Fetch a list of subjects with pagination and search
export const fetchTopics = async (subjectId: string) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get<
      TServerResponseWithPagination<any>
    >(`/admin/topic/list/${subjectId}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

export const fetchTopicsByCourse = async (courseId: string) => {
  try {
    const response = await backendClient.get<
      TServerResponseWithPagination<any>
    >(`/admin/topic/all/${courseId}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Add a new subject
export const addTopicRequest = async (payload: TAddTopic) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post('/admin/topic/add', payload);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Edit an existing subject
export const editTopicRequest = async (payload: TEditTopic) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      `/admin/topic/edit/${payload._id}`,
      {
        title: payload.title,
        subject: payload.subject,
        active: payload.active,
      },
    );
    return response?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Delete one or more subjects
export const deleteTopicRequest = async (id: string) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.delete(`/admin/topic/delete/${id}`);
    return response?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

export const getCountAndDurationOfDiagnosticTest = async (courseId: string) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(
      `/admin/test/diagnostic-test-count/${courseId}`,
    );
    return response?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

export const addTopicAllowedQuestions = async (payload: any) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      `/admin/topic/add-topic-allowed-question-count`,
      payload,
    );
    return response?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

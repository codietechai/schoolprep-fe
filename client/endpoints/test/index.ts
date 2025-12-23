import { backendClient } from '@/client/backendClient';
import { useContainerLoader, useGlobalLoader } from '@/hooks';
import { TQueryData } from '@/types';

interface TCreateTest {
  user_id: string;
  type: 'PREPARATORY' | 'DIAGNOSTIC';
  question_mode?: string[];
  duration_of_exam: number;
  topics?: { topic_id: string; allowed_question_number: number }[];
  tutor?: boolean;
  course_id: string;
  total_questions?: number;
}

export const FETCH_TEST_KEY = 'fetch-test';
export const FETCH_ONGOING_TEST = 'fetch-ongoing-test';
export const FETCH_ALL_TEST_KEY = 'fetch-all-test';
export const FETCH_TEST_REPORT_KEY = 'fetch-test-report';
export const FETCH_COUNT_FOR_PREPARATORY_TEST = 'fetch-count-preparatory-test';

export const getAllTests = async (
  payload: {
    user_id: string;
    type: string;
    course_id: string;
  },
  queryData: TQueryData,
) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(
      `/admin/test/get-all-user-test?user_id=${payload.user_id}&type=${
        payload.type
      }&course_id=${payload.course_id}&size=${queryData?.size}&skip=${
        queryData?.skip
      }&search=${queryData?.search ?? ''}&sorting=${queryData.sorting ?? ''}`,
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

export const getOngoingTestId = async (userId: string) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(
      `/admin/test/get-ongoing-test-id/?user_id=${userId}`,
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};

export const createTestRequest = async (payload: TCreateTest) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      '/admin/test/create-test',
      payload,
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};

export const fetchTestRequest = async (payload: {
  user_id: string;
  _id: string;
  test_type: string;
}) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(
      `/admin/test/get-active-user-test?user_id=${payload.user_id}&_id=${payload._id}&test_type=${payload.test_type}`,
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};

export const submitAnswerRequest = async (payload: {
  question_id: string;
  test_id: string;
  selected_option_id: string | null;
}) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      `/admin/test/submit-question`,
      payload,
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

export const submitTestRequest = async (payload: { test_id: string }) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      `/admin/test/submit-test`,
      payload,
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};

export const getTestReport = async (payload: { test_id: string }) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(
      `/admin/test/get-test-report/${payload.test_id}`,
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};

export const handleUserTestAction = async (payload: {
  current_question_id: string;
  new_question_id: string | null;
  upcoming_question_id?: string | null;
  test_id: string;
  action: 'BACK' | 'NEXT';
}) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      `/admin/test/handle-user-test-action`,
      payload,
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// For preparatory
export const getCountForPreparatoryTest = async (payload: {
  user_id: string;
  course_id: string;
}) => {
  useGlobalLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(
      `/admin/test/get-count-to-create-prep-test/?user_id=${payload.user_id}&course_id=${payload.course_id}
`,
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useGlobalLoader.getState().setShowLoader(false);
  }
};

export const getAllBookmarks = async (testId: string) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(
      `/admin/test/get-test-bookmark-questions/${testId}`,
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

export const addBookmarkRequest = async (payload: {
  question_id: string;
  test_id: string;
}) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      '/admin/test/mark-question-bookmark/',
      payload,
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

export const removeBookmarkRequest = async (payload: {
  question_id: string;
  test_id: string;
}) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      '/admin/test/unmark-question-from-bookmark/',
      payload,
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

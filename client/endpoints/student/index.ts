import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const FETCH_STUDENT_DASHBOARD_DATA_KEY = 'fetch-student-dashboard-data';
export const FETCH_STUDENT_PERFORMANCE_REPORT_KEY =
  'fetch-student-dashboard-data';
export const FETCH_TEACHER_DASHBOARD_DATA_KEY = 'fetch-teacher-dashboard-data';
export const FETCH_COORDINATOR_DASHBOARD_DATA_KEY =
  'fetch-coordintor-dashboard-data';

export const fetchStudentDashboardData = async (course_id: string) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(
      `/admin/dashboard/student-dashboard?course_id=${course_id}`,
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

export const fetchStudentPerformaceReport = async (user_id: string) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(
      `/admin/test/view-current-user-test-performance/${user_id}`,
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

export const fectchTeacherDashboardData = async () => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(
      `/admin/dashboard/teacher-dashboard`,
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

export const fectchCoordinatorDashboardData = async () => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(
      `/admin/dashboard/cordinator-dashboard`,
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';
import { TServerResponseWithPagination, TQueryData } from '@/types';

export const ADD_COURSE_KEY = 'add-course';
export const DELETE_COURSE_KEY = 'delete-course';
export const EDIT_COURSE_KEY = 'edit-course';
export const GET_COURSE_KEY = 'fetch-course';
export const FETCH_COURSES_KEY = 'list-courses';
export const FETCH_COURSES_NAME = 'name-courses';

// Types for payloads
export type TAddCourse = {
  name: string;
  description?: string;
  category: string; // Category ID
  active: boolean;
  level: string;
  image?: string;
  image_data?: string;
  subjects: string[];
};

export type TEditCourse = {
  id: string;
  name: string;
  description?: string;
  category: string;
  active: boolean;
  level: string;
  image?: string;
  image_data?: string;
  subjects: string[];
};

// Fetch a single course by ID
export const fetchCourseSingle = async (id: string) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(`/admin/courses/get/${id}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Fetch a list of courses with pagination and search
export const fetchCourses = async (payload: TQueryData) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get<
      TServerResponseWithPagination<any>
    >(
      `/admin/courses/list?size=${payload?.size}&skip=${payload?.skip}&search=${
        payload?.search ?? ''
      }&sorting=${payload.sorting ?? ''}`,
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Add a new course
export const addCourseRequest = async (payload: TAddCourse) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post('/admin/courses/add', payload);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Edit an existing course
export const editCourseRequest = async (payload: TEditCourse) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      `/admin/courses/edit/${payload.id}`,
      {
        name: payload.name,
        description: payload.description,
        category: payload.category,
        active: payload.active,
        level: payload.level,
        image: payload.image,
        image_data: payload.image_data,
        subjects: payload.subjects,
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
export const deleteCourseRequest = async (ids: string[]) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.delete('/admin/courses/delete', {
      data: { ids },
    });
    return response?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

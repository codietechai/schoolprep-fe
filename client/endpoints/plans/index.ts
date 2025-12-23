import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';
import { TServerResponseWithPagination } from '@/types';

export const ADD_PLAN_KEY = 'add-course';
export const DELETE_PLAN_KEY = 'delete-course';
export const EDIT_PLAN_KEY = 'edit-course';
export const GET_PLAN_KEY = 'fetch-course';
export const FETCH_PLANS_KEY = 'list-courses';

export type TQueryData = {
  id: string;
  size: number;
  skip: number;
  search: string;
  sorting?: string;
  trashOnly?: string;
};

// Types for payloads
export type TAddPlan = {
  name: string;
  description?: string;
  price: number;
  duration: number;
  active: boolean;
  course: string;
};

export type TEditPlan = {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  active: boolean;
  course: string;
};

// Fetch a single course by ID
export const fetchPlanSingle = async (id: string) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(`/admin/plans/get/${id}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Fetch a list of courses with pagination and search
export const fetchPlans = async (payload: TQueryData) => {
  // useContainerLoader.getState().setShowLoader(true);
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get<
      TServerResponseWithPagination<any>
    >(
      `/admin/plans/list/${payload.id}/?size=${payload?.size}&skip=${
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

// Add a new course
export const addPlanRequest = async (payload: TAddPlan) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post('/admin/plans/add', payload);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Edit an existing course
export const editPlanRequest = async (payload: TEditPlan) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      `/admin/plans/edit/${payload.id}`,
      {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        active: payload.active,
        duration: payload.duration,
        course: payload.course,
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
export const deletePlanRequest = async (ids: string[]) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.delete('/admin/plans/delete', {
      data: { ids },
    });
    return response?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';
import { TServerResponseWithPagination, TQueryData } from '@/types';

export const ADD_SUBJECT_KEY = 'add-subject';
export const DELETE_SUBJECT_KEY = 'delete-subject';
export const EDIT_SUBJECT_KEY = 'edit-subject';
export const GET_SUBJECT_KEY = 'fetch-subject';
export const FETCH_SUBJECTS_KEY = 'list-subjects';

// Types for payloads
export type TAddSubject = {
  name: string;
  description?: string;
  active: boolean;
};

export type TEditSubject = {
  id: string;
  name: string;
  description?: string;
  active: boolean;
};

// Fetch a single subject by ID
export const fetchSubjectSingle = async (id: string) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(`/admin/subjects/get/${id}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Fetch a list of subjects with pagination and search
export const fetchSubjects = async (payload: TQueryData) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get<
      TServerResponseWithPagination<any>
    >(
      `/admin/subjects/list?size=${payload?.size}&skip=${
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

// Add a new subject
export const addSubjectRequest = async (payload: TAddSubject) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post('/admin/subjects/add', payload);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Edit an existing subject
export const editSubjectRequest = async (payload: TEditSubject) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      `/admin/subjects/edit/${payload.id}`,
      {
        name: payload.name,

        description: payload.description,

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
export const deleteSubjectRequest = async (ids: string[]) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.delete('/admin/subjects/delete', {
      data: { ids },
    });
    return response?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';
import { TServerResponseWithPagination, TQueryData } from '@/types';

export const ADD_CATEGORY_KEY = 'add-course-category';
export const DELETE_CATEGORY_KEY = 'delete-course-category';
export const EDIT_CATEGORY_KEY = 'edit-course-category';
export const GET_CATEGORY_KEY = 'fetch-course-category';
export const FETCH_CATEGORIES_KEY = 'list-course-categories';

// Types for payloads
export type TAddCategory = {
  name: string;
  description?: string;
  parent_category?: string | null;
  active: boolean;
};

export type TEditCategory = {
  id: string;
  name: string;
  description?: string;
  parent_category?: string | null;
  active: boolean;
  image?: string;
  image_data?: string;
};

// Fetch a single course category by ID
export const fetchCategorySingle = async (id: string) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(
      `/admin/course-categories/get/${id}`,
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Fetch a list of course categories
export const fetchCategories = async (payload: TQueryData) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get<
      TServerResponseWithPagination<any>
    >(
      `/admin/course-categories/list?size=${payload?.size}&skip=${
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

// Add a new course category
export const addCategoryRequest = async (payload: TAddCategory) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      '/admin/course-categories/add',
      payload,
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Edit an existing course category
export const editCategoryRequest = async (payload: TEditCategory) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.put(
      `/admin/course-categories/edit/${payload.id}`,
      {
        name: payload.name,
        description: payload.description,
        parent_category: payload.parent_category,
        active: payload.active,
        image: payload?.image ?? '',
        image_data: payload?.image_data ?? '',
      },
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Delete one or more course categories
export const deleteCategoryRequest = async (ids: string[]) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.delete(
      '/admin/course-categories/delete',
      {
        data: { ids },
      },
    );
    return response?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

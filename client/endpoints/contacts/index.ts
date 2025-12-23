import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';
import { TServerResponseWithPagination, TQueryData } from '@/types';

export const GET_CONTACTS_KEY = 'fetch-contact';
export const FETCH_CONTACTS_KEY = 'list-contact';

// Types for payloads
export type TContacts = {
  name: string;
  description?: string;
  email: string;
  phone: string;
};

// Fetch a single course category by ID
export const fetchContactSingle = async (id: string) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(`/admin/contact/get/${id}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

// Fetch a list of course categories
export const fetchContacts = async (payload: TQueryData) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get<
      TServerResponseWithPagination<any>
    >(
      `/admin/contact/list?size=${payload?.size}&skip=${payload?.skip}&search=${
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

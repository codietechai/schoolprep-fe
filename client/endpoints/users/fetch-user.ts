import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';
import { TUser } from '@/types';

export const GET_USER_KEY = 'fetch-user';

export const fetchUser = async (id: string) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(`/admin/users/get/${id}`);
    return response?.data?.data as TUser;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

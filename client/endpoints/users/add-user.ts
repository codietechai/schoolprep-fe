import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';
import { TAddUser } from '@/types';

export const ADD_USER_KEY = 'add-user';

export const addUserRequest = async (payload: TAddUser) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post('/admin/users/add', payload);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

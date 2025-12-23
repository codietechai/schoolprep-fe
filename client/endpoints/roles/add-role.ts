import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const ADD_ROLE_KEY = 'add-role';

export type TAddRole = {
  name: string;
  active: number | string | boolean;
};

export const addRoleRequest = async (payload: TAddRole) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post('/admin/roles/add', payload);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

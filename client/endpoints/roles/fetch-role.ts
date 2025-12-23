import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const GET_ROLE_KEY = 'fetch-role';

export const fetchRole = async (id: string) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(`/admin/roles/get/${id}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

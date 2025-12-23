import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const GET_ADMIN_KEY = 'fetch-admin';

export const fetchAdmin = async (id: string) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(`/admin/user/admin/${id}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

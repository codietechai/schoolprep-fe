import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const GET_PERMISSION_KEY = 'fetch-permission';

export const fetchPermissionSingle = async (id: any) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(`/admin/permissions/get/${id}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

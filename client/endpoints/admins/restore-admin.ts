import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const restoreAdminRequest = async (ids: number[]) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(`/admin/user/restore`, { ids });
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

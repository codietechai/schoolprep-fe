import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const DELETE_ROLE_KEY = 'delete-role';

export const deleteRoleRequest = async (ids: string[]) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.delete(`/admin/roles/delete`, {
      data: { ids },
    });
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

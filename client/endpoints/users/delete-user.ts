import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const DELETE_USER_KEY = 'delete-user';

export const deleteUserRequest = async (ids: number[]) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.delete(`/admin/users/delete`, {
      data: { ids },
    });
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

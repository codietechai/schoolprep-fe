import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const deleteUserForeverRequest = async (ids: number[]) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.delete(
      `/admin/users/delete-permanant`,
      {
        data: { ids },
      },
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

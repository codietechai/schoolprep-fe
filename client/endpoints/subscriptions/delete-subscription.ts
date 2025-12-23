import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const deleteSubscriptionRequest = async (ids: number[]) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.delete(`/admin/subscription/delete`, {
      data: { ids },
    });
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

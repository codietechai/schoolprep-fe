import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const deleteSubscriptionForeverRequest = async (ids: number[]) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.delete(
      `/admin/subscription/delete-permanant`,
      { data: { ids } },
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

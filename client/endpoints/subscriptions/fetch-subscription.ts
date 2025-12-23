import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const GET_SUBSCRIPTION_KEY = 'fetch-subscription';

export const fetchSubscription = async (id: string) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(`/admin/subscription/${id}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const GET_METRICS_KEY = 'fetch-metrics';

type TProps = {
  type: any;
  range: 'Last Month' | 'This Month' | 'Last Week' | 'This Week' | '';
};

export const filters = ['Last Month', 'This Month', 'Last Week', 'This Week'];

export const fetchMetrics = async (payload: TProps) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(
      `/admin/misc/dashboard-metrics?range=${payload.range}&type=${payload.type}`,
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

export const fetchSubscriptionMetrics = async (payload: TProps) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get(
      `/admin/misc/subscription-metrics?range=${payload.range}&type=${payload.type}`,
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

import { backendClient } from '@/client/backendClient';
import {
  TSubscription,
  TServerResponseWithPagination,
  TQueryData,
} from '@/types';
import { useContainerLoader } from '@/hooks';

export const FETCH_SUBSCRIPTIONS_KEY = 'list-subscriptions';

export const fetchSubscriptions = async (payload: TQueryData) => {
  try {
    const response = await backendClient.get<
      TServerResponseWithPagination<TSubscription>
    >(
      `/admin/subscription/list?size=${payload?.size}&skip=${
        payload?.skip
      }&search=${payload?.search}&sorting=${payload?.sorting ?? ''}&trashOnly=${
        payload?.trashOnly ?? ''
      }`,
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

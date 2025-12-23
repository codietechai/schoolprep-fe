import { backendClient } from '@/client/backendClient';
import { TServerResponseWithPagination, TQueryData } from '@/types';
import { useContainerLoader } from '@/hooks';
import { TAddUser } from '@/types';

export const FETCH_USERS_KEY = 'list-users';

export const fetchUsers = async (payload: TQueryData) => {
  try {
    useContainerLoader.getState().setShowLoader(true);
    const response = await backendClient.get<
      TServerResponseWithPagination<TAddUser>
    >(
      `/admin/users/list?size=${payload?.size}&skip=${payload?.skip}&search=${
        payload?.search
      }&sorting=${payload?.sorting ?? ''}&trashOnly=${
        payload?.trashOnly ?? ''
      }`,
    );
    useContainerLoader.getState().setShowLoader(false);
    return response?.data?.data;
  } catch (error) {
    useContainerLoader.getState().setShowLoader(false);
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

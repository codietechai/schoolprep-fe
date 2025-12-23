import { backendClient } from '@/client/backendClient';
import { TAdminRole, TServerResponseWithPagination, TQueryData } from '@/types';
import { useContainerLoader } from '@/hooks';

export const FETCH_PERMISSION_KEY = 'list-permission';

export const fetchPermissions = async (payload: TQueryData) => {
  try {
    const response = await backendClient.get<
      TServerResponseWithPagination<TAdminRole>
    >(
      `/admin/permissions/list?size=${payload?.size}&skip=${
        payload?.skip
      }&search=${payload?.search}&sorting=${payload?.sorting ?? ''}`,
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

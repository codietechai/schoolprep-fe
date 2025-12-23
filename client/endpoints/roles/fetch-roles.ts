import { backendClient } from '@/client/backendClient';
import { TAdminRole, TServerResponseWithPagination, TQueryData } from '@/types';
import { useContainerLoader } from '@/hooks';

export const FETCH_ROLE_KEY = 'list-roles';

export const fetchRoles = async (payload: TQueryData) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.get<
      TServerResponseWithPagination<TAdminRole>
    >(
      `/admin/roles/list?size=${payload?.size}&skip=${payload?.skip}&search=${
        payload?.search
      }&sorting=${payload?.sorting ?? ''}`,
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

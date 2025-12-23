import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';
import { TEditUser } from '@/types';

export const EDIT_USER_KEY = 'edit-user';

export const editUserRequest = async (payload: TEditUser) => {
  useContainerLoader.getState().setShowLoader(true);
  const withoutId = { ...payload };
  delete withoutId?.id;
  try {
    const response = await backendClient.put(
      `/admin/users/edit/${payload.id}`,
      withoutId,
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

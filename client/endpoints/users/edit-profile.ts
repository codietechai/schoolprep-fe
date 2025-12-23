import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';
import { TEditUser } from '@/types';

export const EDIT_USERPROFILE_KEY = 'edit-profile';

export const editUserProfileRequest = async (payload: TEditUser) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      `/admin/users/edit-profile`,
      payload,
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const CHANGE_USER_PASSWORD_KEY = 'change-user-password';

export type TChangeUserPassword = {
  old_password: string;
  new_password: string;
};

export const changeUserPasswordRequest = async (
  payload: TChangeUserPassword,
) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      `/admin/users/change-password`,
      payload,
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

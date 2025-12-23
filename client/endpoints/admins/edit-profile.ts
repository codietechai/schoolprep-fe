import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const EDIT_PROFILE_KEY = 'edit-profile';

export type TEditAdminProfile = {
  full_name: string;
  address: string;
  contact_number: string;
  phone_code: string;
};

export const editAdminProfileRequest = async (payload: TEditAdminProfile) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(`/admin/edit-profile`, payload);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

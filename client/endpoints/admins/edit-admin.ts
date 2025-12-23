import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const EDIT_ADMIN_KEY = 'edit-admin';

export type TEditAdmin = {
  id?: number;
  email: string;
  full_name: string;
  address: string;
  contact_number: string;
  active: string | number;
};

export const editAdminRequest = async (payload: TEditAdmin) => {
  useContainerLoader.getState().setShowLoader(true);
  const withoutId = { ...payload };
  delete withoutId?.id;
  try {
    const response = await backendClient.post(
      `/admin/user/edit/${payload.id}`,
      withoutId,
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

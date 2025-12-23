import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const ADD_PERMISSION_KEY = 'add-permission';

export type TAddpermission = {
  name: string;
  active: number | string;
};

export const addPermissionRequest = async (payload: any) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      '/admin/permissions/add',
      payload,
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

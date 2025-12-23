import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const DELETE_PERMISSION_KEY = 'delete-permission';

export const deletePermissionRequest = async (ids: string[]) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.delete(`/admin/permissions/delete`, {
      data: { ids },
    });
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

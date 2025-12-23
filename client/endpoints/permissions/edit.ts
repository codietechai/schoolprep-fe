import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';
import { Description } from '@headlessui/react/dist/components/description/description';

export const EDIT_PERMISSION_KEY = 'edit-permission';

export type TEditPermission = {
  id: string;
  name: string;
  active: number | string;
};

export const editPermissionRequest = async (payload: any) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      `/admin/permissions/edit/${payload.id}`,
      {
        name: payload.name,
        description: payload.description,
        active: payload.active,
      },
    );
    return response?.data;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

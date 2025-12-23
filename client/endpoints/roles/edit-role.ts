import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const EDIT_ROLE_KEY = 'edit-role';

export type TEditRole = {
  id: string;
  name: string;
  active: number | string;
  description: any;
  role_permissions: any;
};

export const editRoleRequest = async (payload: TEditRole) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      `/admin/roles/edit/${payload.id}`,
      {
        name: payload.name,
        active: payload.active,
        description: payload.description,
        role_permissions: payload.role_permissions,
      },
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

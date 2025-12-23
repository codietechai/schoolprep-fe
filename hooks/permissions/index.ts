import { useEffect, useState } from 'react';
import { useSession } from '@/hooks';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';

export const usePermissions = () => {
  const { session } = useSession();
  const userSession = useSelector((state: IRootState) => state.auth);
  const hasPermission = (featureName: string, permissionName: string) => {
    let flag = false;
    if (!userSession.user?.user?.role?.role_permissions) {
      flag = false;
    } else if (
      typeof userSession.user?.user.role.role_permissions[featureName] !=
        'undefined' &&
      userSession.user?.user.role.role_permissions[featureName][permissionName]
    ) {
      flag = true;
    } else {
      flag = false;
    }

    if (session?.user?.role?.name === 'Super Admin') {
      flag = true;
    }

    return flag;
  };

  return { hasPermission };
};

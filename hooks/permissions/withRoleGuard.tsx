'use client';

import { IRootState } from '@/store';
import { ComponentType, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useSession } from '../auth';

type Permissions = Record<
  string,
  { read?: boolean; create?: boolean; update?: boolean; delete?: boolean }
>;

type RoleGuardHOC = <P extends object>(
  Component: ComponentType<P>,
  requiredPermission: Permissions,
  redirectRoute: string,
) => ComponentType<P>;

const withPermissionGuard: RoleGuardHOC = (
  Component,
  requiredPermission,
  redirectRoute,
) => {
  return function RoleGuard(props: any) {
    const router = useRouter();
    const userSession = useSelector((state: IRootState) => state.auth);

    useEffect(() => {
      const hasPermission = Object.entries(requiredPermission).every(
        ([key, perms]) => {
          const userPerms = userSession.user?.user.role.role_permissions[key];

          return (
            userPerms &&
            Object.entries(perms).every(([permKey, permValue]) => {
              return userPerms[permKey as keyof typeof userPerms] === permValue;
            })
          );
        },
      );

      if (!hasPermission) {
        router.replace(redirectRoute);
      }
    }, [requiredPermission, redirectRoute, router]);

    const hasPermission = Object.entries(requiredPermission).every(
      ([key, perms]) => {
        const userPerms = userSession!.user?.user.role.role_permissions[key];
        return (
          userPerms &&
          Object.entries(perms).every(([permKey, permValue]) => {
            return userPerms[permKey as keyof typeof userPerms] === permValue;
          })
        );
      },
    );

    // return hasPermission ? <Component {...props} /> : null;
    return <Component {...props} />;
  };
};

export default withPermissionGuard;

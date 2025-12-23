'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import TeacherDashboard from './TeacherDashboard';
import CoordinatorDashboard from './CoordinatorDashboard';
import { usePermissions, useSession } from '@/hooks';
import StudentDashboard from './StudentDashboard';

const ComponentsAnalytics = ({ heading }: { heading: string }) => {
  const { session } = useSession();
  const { hasPermission } = usePermissions();
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  return (
    <div className="dashboard-panel">
      <div>
        <p className=" page-header">{heading}</p>
      </div>
      {session?.user?.role?.name === 'Super Admin' ? <AdminDashboard /> : null}
      {hasPermission('user', 'update') ? <CoordinatorDashboard /> : null}
      {hasPermission('question', 'update') ? <TeacherDashboard /> : null}
      {session?.user?.role?.name === 'Student' ? <StudentDashboard /> : null}
    </div>
  );
};

export default ComponentsAnalytics;

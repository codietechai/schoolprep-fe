'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from 'react-query';
import { ListHeader, Table } from '@/components/common';
import { LINKS, DEFAULT_QUERY } from '@/constants';
import { useContainerLoader } from '@/hooks';
import { TQueryData } from '@/types';
import {
  FETCH_ROLE_KEY,
  fetchRoles,
  deleteRoleRequest,
} from '@/client/endpoints';
import { getColumns } from './utils';
import { showDeleteConfirmation, showMessage } from '@/utils';
import { usePermissions } from '@/hooks';
import withPermissionGuard from '@/hooks/permissions/withRoleGuard';

const defaultQuery = DEFAULT_QUERY;

const RoleList = () => {
  const { hasPermission } = usePermissions();
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const [queryData, setQueryData] = useState<TQueryData>(defaultQuery);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Fetch roles from the backend
  const { data: roles, refetch } = useQuery(
    [FETCH_ROLE_KEY, queryData],
    () => fetchRoles(queryData),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) useContainerLoader.getState().setShowLoader(true);
      setQueryData({
        ...defaultQuery,
        search,
      });
    }, 0);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  // Handle delete role mutation
  const { mutate: deleteRole } = useMutation(deleteRoleRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
      setSelectedRows([]);
    },
  });

  const deleteConfirmation = async () => {
    const data = await showDeleteConfirmation(
      'Do you want to move this role to trash?',
    );
    setSelectedRows([]);
    if (data?.isConfirmed) {
      deleteRole(selectedRows);
    }
  };

  const handleSearch = (param: string) => {
    setSearch(param);
  };

  const handlePageChange = (filters: TQueryData) => {
    setQueryData(filters);
  };

  const handleSortChange = (filters: TQueryData) => {
    setQueryData(filters);
  };

  const handleRowSelection = (rows: any[]) => {
    if (rows?.length) {
      setSelectedRows(rows.map(row => row._id));
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div className="dashboard-panel">
      <ListHeader
        title="Roles"
        onSearch={handleSearch}
        onAddNew={() => router.push(LINKS.roles.add)}
        search={search}
        showTrash={false}
        onShowTrash={() => router.push('/roles/trash')}
        selectedRows={selectedRows}
        onMoveToTrash={deleteConfirmation}
      />
      <div className="relative mt-5 overflow-hidden rounded-lg border-0 p-0">
        <div className="table-responsive">
          <div className="datatables">
            <Table
              records={roles?.data || []}
              columns={getColumns({ refetch })}
              totalRecords={roles?.total || 0}
              onPageChange={handlePageChange}
              onSortStatusChange={handleSortChange}
              filters={queryData}
              onRowSelection={handleRowSelection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export const ProtectedRoleList = withPermissionGuard(
  RoleList,
  { role: { read: true } },
  '/portal/dashboard',
);

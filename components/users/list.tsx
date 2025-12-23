'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from 'react-query';
import { ListHeader, Table } from '@/components/common';
import { LINKS, DEFAULT_QUERY } from '@/constants';
import { useContainerLoader, usePermissions } from '@/hooks';
import { TQueryData } from '@/types';
import {
  FETCH_USERS_KEY,
  fetchUsers,
  deleteUserRequest,
} from '@/client/endpoints';
import { TUser } from '@/types';
import { getColumns } from './utils';
import { showDeleteConfirmation, showMessage } from '@/utils';
import withPermissionGuard from '@/hooks/permissions/withRoleGuard';

const defaultQuery = DEFAULT_QUERY;

export const UserList = () => {
  const router = useRouter();
  const [search, setSearch] = useState<any>('');
  const [queryData, setQueryData] = useState<TQueryData>(defaultQuery);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
      const { hasPermission } = usePermissions();
  
  
  const { data: users, refetch } = useQuery(
    [FETCH_USERS_KEY, queryData],
    () => fetchUsers(queryData),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      search && useContainerLoader.getState().setShowLoader(true);
      setQueryData({
        ...defaultQuery,
        search,
      });
    }, 0);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const { mutate: deleteUser } = useMutation(deleteUserRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
      setSelectedRows([]);
    },
  });

  const deleteConfirmation = async () => {
    const data = await showDeleteConfirmation(
      'Do you want to move this user to trash?',
    );
    setSelectedRows([]);
    if (data?.isConfirmed) {
      deleteUser(selectedRows);
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

  const handleRowSelection = (rows: TUser[]) => {
    if (rows?.length) {
      setSelectedRows(rows.map((row: any) => row._id));
    } else {
      setSelectedRows([]);
    }
  };
  const isAdd=hasPermission('subject', 'add');
  const isDelete = hasPermission('subject', 'delete');

  return (
    <div className="dashboard-panel">
      <ListHeader
        title="Users"
        onSearch={handleSearch}
        onAddNew={() => router.push(LINKS.users.add)}
        search={search}
        showAdd={isAdd}
        selectedRows={isDelete?selectedRows:[]}
        onShowTrash={() => router.push('/users/trash')}
        onMoveToTrash={deleteConfirmation}
      />
      <div className="relative mt-5 overflow-hidden rounded-lg border-0 p-0">
        <div className="table-responsive">
          <div className="datatables">
            <Table
              records={users && users.data}
              columns={getColumns({ refetch })}
              totalRecords={users?.total || 0}
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

export  const ProtectedUserList = withPermissionGuard(UserList, { user: { read: true } }, '/portal/dashboard');

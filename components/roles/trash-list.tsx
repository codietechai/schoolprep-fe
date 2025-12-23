'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from 'react-query';
import { ListHeader, Table } from '@/components/common';
import { LINKS, DEFAULT_QUERY } from '@/constants';
import { useContainerLoader } from '@/hooks';
import { TQueryData } from '@/types';
import {
  FETCH_USERS_KEY,
  fetchUsers,
  deleteUserForeverRequest,
  restoreUserRequest,
} from '@/client/endpoints';
import { TUser } from '@/types';
import { getTrashColumns } from './utils';
import { showDeleteConfirmation, showMessage } from '@/utils';

const defaultQuery = DEFAULT_QUERY;

export const UserTrashList = () => {
  const router = useRouter();
  const [search, setSearch] = useState<any>('');
  const [queryData, setQueryData] = useState<TQueryData>(defaultQuery);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const { data: users, refetch } = useQuery(
    [FETCH_USERS_KEY, queryData],
    () => fetchUsers({ ...queryData, trashOnly: 'true' }),
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

  const { mutate: deleteUser } = useMutation(deleteUserForeverRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
      setSelectedRows([]);
    },
  });

  const { mutate: restoreUser } = useMutation(restoreUserRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
      setSelectedRows([]);
    },
  });

  const deleteConfirmation = async () => {
    const data = await showDeleteConfirmation(
      'Do you want to delete selected users?',
    );
    setSelectedRows([]);
    if (data?.isConfirmed) {
      deleteUser(selectedRows);
    }
  };

  const restoreConfirmation = async () => {
    const data = await showDeleteConfirmation(
      'Do you want to restore selected users?',
    );
    setSelectedRows([]);
    if (data?.isConfirmed) {
      restoreUser(selectedRows);
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

  return (
    <div>
      <ListHeader
        title="Users"
        onSearch={handleSearch}
        onAddNew={() => router.push(LINKS.users.add)}
        search={search}
        showAdd={false}
        selectedRows={selectedRows}
        onRestore={restoreConfirmation}
        onDelete={deleteConfirmation}
        isTrashList={true}
      />
      <div className="relative mt-5 overflow-hidden rounded-lg border-0 p-0">
        <div className="table-responsive">
          <div className="datatables">
            <Table
              records={users && users.data}
              columns={getTrashColumns({ refetch })}
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

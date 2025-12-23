'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from 'react-query';
import { ListHeader, Table } from '@/components/common';
import { LINKS, DEFAULT_QUERY } from '@/constants';
import {
  fetchAdmins,
  FETCH_ADMINS_KEY,
  deleteAdminRequest,
} from '@/client/endpoints';
import { useContainerLoader } from '@/hooks';
import { TQueryData, TAdmin } from '@/types';
import { getColumns } from './utils';
import { showDeleteConfirmation, showMessage } from '@/utils';

const defaultQuery = DEFAULT_QUERY;

export const List = () => {
  const router = useRouter();
  const [search, setSearch] = useState<any>('');
  const [queryData, setQueryData] = useState<TQueryData>(defaultQuery);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const { data: admins, refetch } = useQuery(
    [FETCH_ADMINS_KEY, queryData],
    () => fetchAdmins(queryData),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  );

  const { mutate: deleteAdmin } = useMutation(deleteAdminRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
      setSelectedRows([]);
    },
  });

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

  const handleSearch = (param: string) => {
    setSearch(param);
  };

  const handlePageChange = (filters: TQueryData) => {
    setQueryData(filters);
  };

  const handleSortChange = (filters: TQueryData) => {
    setQueryData(filters);
  };

  const handleRowSelection = (rows: TAdmin[]) => {
    if (rows?.length) {
      setSelectedRows(rows.map((row: any) => row._id));
    } else {
      setSelectedRows([]);
    }
  };

  const trashConfirmation = async () => {
    const data = await showDeleteConfirmation(
      'Do you want to move selected admin users to trash?',
    );
    setSelectedRows([]);
    if (data?.isConfirmed) {
      deleteAdmin(selectedRows);
    }
  };

  return (
    <div className="dashboard-panel">
      <ListHeader
        title="Admins"
        onSearch={handleSearch}
        onAddNew={() => router.push(LINKS.admins.add)}
        search={search}
        showTrash={true}
        onShowTrash={() => router.push(LINKS.admins.trash)}
        selectedRows={selectedRows}
        onMoveToTrash={trashConfirmation}
      />
      <div className="relative mt-5 overflow-hidden rounded-lg border-0 p-0">
        <div className="table-responsive">
          <div className="datatables">
            <Table
              records={admins && admins.data}
              columns={getColumns({ refetch })}
              totalRecords={admins?.total || 0}
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

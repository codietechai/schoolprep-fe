'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from 'react-query';
import { ListHeader, Table } from '@/components/common';
import { LINKS, DEFAULT_QUERY } from '@/constants';
import { useContainerLoader, usePermissions, useSession } from '@/hooks';
import { TQueryData } from '@/types';
import {
  FETCH_SUBJECTS_KEY,
  fetchSubjects,
  deleteSubjectRequest,
} from '@/client/endpoints';
import { getColumns } from './utils';
import { showDeleteConfirmation, showMessage } from '@/utils';
import withPermissionGuard from '@/hooks/permissions/withRoleGuard';

const defaultQuery = DEFAULT_QUERY;

export const SubjectList = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const [queryData, setQueryData] = useState<TQueryData>(defaultQuery);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { hasPermission } = usePermissions();

  // Fetch subjects from the backend
  const { data: subjects, refetch } = useQuery(
    [FETCH_SUBJECTS_KEY, queryData],
    () => fetchSubjects(queryData),
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

  // Handle delete subject mutation
  const { mutate: deleteSubject } = useMutation(deleteSubjectRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
      setSelectedRows([]);
    },
  });

  const deleteConfirmation = async () => {
    const data = await showDeleteConfirmation(
      'Do you want to move this subject to trash?',
    );
    setSelectedRows([]);
    if (data?.isConfirmed) {
      deleteSubject(selectedRows);
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

  const session = useSession();

  const isAdd = hasPermission('subject', 'add');
  const isDelete = hasPermission('subject', 'delete');

  return (
    <div className="dashboard-panel">
      <ListHeader
        title="Subjects"
        onSearch={handleSearch}
        onAddNew={() => router.push(LINKS.subjects.add)}
        search={search}
        showTrash={false}
        showAdd={isAdd}
        onShowTrash={() => router.push('/subjects/trash')}
        selectedRows={isDelete ? selectedRows : []}
        onMoveToTrash={deleteConfirmation}
      />
      <div className="relative mt-5 overflow-hidden rounded-lg border-0 p-0">
        <div className="table-responsive">
          <div className="datatables">
            <Table
              records={subjects?.data || []}
              columns={getColumns({ refetch })}
              totalRecords={subjects?.total || 0}
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

export const ProtectedSubjectList = withPermissionGuard(
  SubjectList,
  { subject: { read: true } },
  '/portal/dashboard',
);

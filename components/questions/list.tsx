'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from 'react-query';

import { ListHeader, Table } from '@/components/common';
import { LINKS, DEFAULT_QUERY } from '@/constants';
import { useContainerLoader, usePermissions } from '@/hooks';
import { TQueryData } from '@/types';
import {
  FETCH_COURSES_KEY,
  fetchCourses,
  deleteQuestionRequest,
  fetchQuestions,
  FETCH_QUESTIONS_KEY,
} from '@/client/endpoints';
import { getColumns } from './utils';
import { showDeleteConfirmation, showMessage } from '@/utils';
import withPermissionGuard from '@/hooks/permissions/withRoleGuard';

const defaultQuery = DEFAULT_QUERY;

export const QuestionsList = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const [queryData, setQueryData] = useState<TQueryData>(defaultQuery);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { hasPermission } = usePermissions();

  // Fetch courses
  const { data: questions, refetch } = useQuery(
    [FETCH_QUESTIONS_KEY, queryData],
    () => fetchQuestions(queryData),
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
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  // Handle delete course mutation
  const { mutate: deleteCourse } = useMutation(deleteQuestionRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
      setSelectedRows([]);
    },
  });

  const deleteConfirmation = async () => {
    const data = await showDeleteConfirmation(
      'Do you want to move the selected Question to trash?',
    );
    setSelectedRows([]);
    if (data?.isConfirmed) {
      deleteCourse(selectedRows);
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

  const isAdd = hasPermission('course', 'add');
  const isDelete = hasPermission('course', 'delete');

  return (
    <div className="dashboard-panel">
      <ListHeader
        title="Questions"
        onSearch={handleSearch}
        onAddNew={() => router.push(LINKS.questions.add)}
        search={search}
        showTrash={false}
        onShowTrash={() => router.push(LINKS.questions.trash)}
        showAdd={isAdd}
        selectedRows={isDelete ? selectedRows : []}
        onMoveToTrash={deleteConfirmation}
      />
      <div className="relative mt-5 overflow-hidden rounded-lg border-0 p-0">
        <div className="table-responsive">
          <div className="datatables">
            <Table
              records={questions?.data || []}
              columns={getColumns({ refetch })}
              totalRecords={questions?.total || 0}
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

export const ProtectedQuestionsList = withPermissionGuard(
  QuestionsList,
  { question: { read: true } },
  '/portal/dashboard',
);

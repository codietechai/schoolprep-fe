'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from 'react-query';
import { ListHeader, Table } from '@/components/common';
import { LINKS, DEFAULT_QUERY } from '@/constants';
import { useContainerLoader, usePermissions } from '@/hooks';
import { TQueryData } from '@/types';
import {
  FETCH_CATEGORIES_KEY,
  fetchCategories,
  deleteCategoryRequest,
} from '@/client/endpoints';
import { getColumns } from './utils';
import { showDeleteConfirmation, showMessage } from '@/utils';
import withPermissionGuard from '@/hooks/permissions/withRoleGuard';

const defaultQuery = DEFAULT_QUERY;

const CourseCategoryList = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const [queryData, setQueryData] = useState<TQueryData>(defaultQuery);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { hasPermission } = usePermissions();

  // Fetch course categories from the backend
  const { data: courseCategories, refetch } = useQuery(
    [FETCH_CATEGORIES_KEY, queryData],
    () => fetchCategories(queryData),
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

  // Handle delete course category mutation
  const { mutate: deleteCourseCategory } = useMutation(deleteCategoryRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
      setSelectedRows([]);
    },
  });

  const deleteConfirmation = async () => {
    const data = await showDeleteConfirmation(
      'Do you want to move this category to trash?',
    );
    setSelectedRows([]);
    if (data?.isConfirmed) {
      deleteCourseCategory(selectedRows);
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

  const isAdd = hasPermission('course_category', 'add');
  const isDelete = hasPermission('course_category', 'delete');
  return (
    <div className="dashboard-panel">
      <ListHeader
        title="Categories"
        onSearch={handleSearch}
        onAddNew={() => router.push(LINKS.courseCategory.add)}
        showAdd={isAdd}
        search={search}
        showTrash={false}
        // onShowTrash={() => router.push('/course-categories/trash')}
        selectedRows={isDelete ? selectedRows : []}
        onMoveToTrash={deleteConfirmation}
      />
      <div className="relative mt-5 overflow-hidden rounded-lg border-0 p-0">
        <div className="table-responsive">
          <div className="datatables">
            <Table
              records={courseCategories?.data || []}
              columns={getColumns({ refetch })}
              totalRecords={courseCategories?.total || 0}
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
export const ProtectedListCourseCategoryForm = withPermissionGuard(
  CourseCategoryList,
  { course_category: { read: true } },
  '/portal/course-category',
);

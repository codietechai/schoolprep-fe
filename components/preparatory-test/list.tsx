'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { ListHeader, Table } from '@/components/common';
import { DEFAULT_QUERY, LINKS } from '@/constants';
import {
  useContainerLoader,
  useCourseId,
  usePermissions,
  useSession,
} from '@/hooks';
import { TQueryData } from '@/types';
import { TUser } from '@/types';
import { getColumns } from './utils';
import { showDeleteConfirmation } from '@/utils';
import { FETCH_ALL_TEST_KEY, getAllTests } from '@/client/endpoints/test';
import TestModal from './test-modal';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';

const defaultQuery = DEFAULT_QUERY;

export const PreparatoryTestList = () => {
  const router = useRouter();
  const [search, setSearch] = useState<any>('');
  const [queryData, setQueryData] = useState<TQueryData>(defaultQuery);
  const { hasPermission } = usePermissions();
  const user = useSelector((state: IRootState) => state.auth);
  const courseId = useCourseId(state => {
    return state.courseId;
  });
  const userId = user.user?.user.id;
  const { data: tests, refetch } = useQuery(
    [FETCH_ALL_TEST_KEY, userId, queryData, courseId],
    () =>
      getAllTests(
        {
          user_id: userId?.toString() as string,
          type: 'PREPARATORY',
          course_id: courseId,
        },
        queryData,
      ),
    {
      enabled: !!userId,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess(data) {},
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

  const handleSearch = (param: string) => {
    setSearch(param);
  };

  const handlePageChange = (filters: TQueryData) => {
    setQueryData(filters);
  };

  const handleSortChange = (filters: TQueryData) => {
    setQueryData(filters);
  };

  const isAdd = true;
  const isDelete = hasPermission('subject', 'delete');

  return (
    <div className="dashboard-panel">
      {/* {hasData ? ( */}
      <ListHeader
        title="Preparatory Tests"
        onSearch={handleSearch}
        onAddNew={() => router.push(LINKS.preparatory.create)}
        search={search}
        showAdd={isAdd}
        addText="Start Test"
        onShowTrash={() => router.push('/users/trash')}
      />

      <div className="relative mt-5 overflow-hidden rounded-lg border-0 p-0">
        <div className="table-responsive">
          <div className="datatables">
            {/* {hasData ? ( */}
            <Table
              records={tests?.data || []}
              columns={getColumns({ refetch })}
              totalRecords={tests?.total || 0}
              onPageChange={handlePageChange}
              onSortStatusChange={handleSortChange}
              filters={queryData}
            />
            {/* ) : (
              <NoTestHistory onClick={() => setShow(true)} />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreparatoryTestList;

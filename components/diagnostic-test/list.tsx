'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { ListHeader, Table } from '@/components/common';
import { DEFAULT_QUERY } from '@/constants';
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

export const DiagnosticTestList = ({ retake }: { retake: string }) => {
  const [search, setSearch] = useState<any>('');
  const [queryData, setQueryData] = useState<TQueryData>(defaultQuery);
  const [show, setShow] = useState(false);
  const { hasPermission } = usePermissions();
  const user = useSelector((state: IRootState) => state.auth);

  const userId = user.user?.user.id;
  const courseId = useCourseId(state => {
    return state.courseId;
  });
  const { data: tests, refetch } = useQuery(
    [FETCH_ALL_TEST_KEY, userId, queryData, courseId],
    () =>
      getAllTests(
        {
          user_id: userId?.toString() as string,
          type: 'DIAGNOSTIC',
          course_id: courseId,
        },
        queryData,
      ),
    {
      enabled: !!userId && !!courseId,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess(data) {},
    },
  );

  useEffect(() => {
    if (retake === 'true') {
      setShow(true);
    }
  }, [retake]);

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
      <ListHeader
        title="Diagnostic Tests"
        onSearch={handleSearch}
        onAddNew={() => setShow(true)}
        search={search}
        showAdd={isAdd}
        addText="Start Test"
      />

      <div className="relative mt-5 overflow-hidden rounded-lg border-0 p-0">
        <div className="table-responsive">
          <div className="datatables">
            <Table
              records={tests?.data || []}
              columns={getColumns({ refetch })}
              key={tests?.data || ''}
              totalRecords={tests?.total || 0}
              onPageChange={handlePageChange}
              onSortStatusChange={handleSortChange}
              filters={queryData}
            />
          </div>
          <TestModal show={show} setShow={setShow} />
        </div>
      </div>
    </div>
  );
};

export default DiagnosticTestList;

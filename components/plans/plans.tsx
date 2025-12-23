'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Input,
  Textarea,
  ErrorMessage,
  ListHeader,
  Table,
} from '@/components/common';
import { addCategorySchema } from '@/validations';
import { showDeleteConfirmation, showMessage } from '@/utils';
import {
  fetchCategorySingle,
  editCategoryRequest,
  fetchCategories,
  FETCH_CATEGORIES_KEY,
  FETCH_COURSES_KEY,
  fetchCourses,
  deleteCourseRequest,
  FETCH_PLANS_KEY,
  fetchPlans,
  fetchCourseSingle,
} from '@/client/endpoints';
import { LINKS, DEFAULT_QUERY } from '@/constants';
import ImageSelect, { ImageProps } from '../plan-pricing/image-select';
import SelectInput from '../plan-pricing/inputSelect';
import { TQueryData } from '@/types/common';
import { getColumns } from './utils';
import { useContainerLoader } from '@/hooks/loader';

const defaultQuery = DEFAULT_QUERY;

export const PlanCourseForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const courseId = id;

  const [search, setSearch] = useState<string>('');
  const [queryData, setQueryData] = useState<TQueryData>(defaultQuery);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Fetch courses

  const { data: courseData, isLoading } = useQuery(
    ['course', courseId],
    () => fetchCourseSingle(courseId as string),
    { enabled: !!courseId, retry: 0 },
  );

  const { data: plans, refetch } = useQuery(
    [FETCH_PLANS_KEY, queryData],
    () => fetchPlans({ ...queryData, id: courseId as string }),
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
  const { mutate: deleteCourse } = useMutation(deleteCourseRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
      setSelectedRows([]);
    },
  });

  const deleteConfirmation = async () => {
    const data = await showDeleteConfirmation(
      'Do you want to move the selected courses to trash?',
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

  return (
    <div className="pt-5">
      <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
        <ListHeader
          title="Plans"
          onSearch={handleSearch}
          onAddNew={() => router.push(LINKS.plans.add(id as string))}
          search={search}
          showTrash={false}
          onShowTrash={() => router.push(LINKS.courses.trash)}
          selectedRows={selectedRows}
          onMoveToTrash={deleteConfirmation}
        />
        <div className="relative mt-5 overflow-hidden rounded-lg border-0 p-0">
          <div className="table-responsive">
            <div className="datatables">
              <Table
                records={plans?.data || []}
                columns={getColumns({ refetch })}
                totalRecords={plans?.total || 0}
                onPageChange={handlePageChange}
                onSortStatusChange={handleSortChange}
                filters={queryData}
                onRowSelection={handleRowSelection}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCourseForm;

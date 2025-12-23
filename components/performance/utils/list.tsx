'use client';
import {
  FETCH_STUDENT_PERFORMANCE_REPORT_KEY,
  fetchStudentPerformaceReport,
} from '@/client/endpoints/student';
import Loader from '@/components/common/Loader';
import IconSearch from '@/components/icon/icon-search';
import {
  ItemOfAnalysis,
  SubjectForAnalysics,
} from '@/components/test/components/utils/list';
import { useCourseId, useSession } from '@/hooks';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const ReportList = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<SubjectForAnalysics[]>([]);
  const course_id = useCourseId(state => state.courseId);
  const session = useSession();
  const { isLoading } = useQuery(
    [FETCH_STUDENT_PERFORMANCE_REPORT_KEY, course_id],
    () => fetchStudentPerformaceReport(course_id as string),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      enabled: !!course_id,
      retry: 0,
      onSuccess(data) {
        console.log('data :>> ', data);
        if (data && data.length >= 0) {
          const filteredData =
            data?.filter((subject: SubjectForAnalysics) =>
              subject.name.toLowerCase().includes(search.toLowerCase()),
            ) || [];
          setData(filteredData);
        }
      },
    },
  );

  return (
    <div className="mt-[32px] min-h-[51vh]">
      <div className="relative rounded-lg border-0 p-0">
        <div className="absolute -top-20 right-0 z-10">
          <div className="relative z-10 rounded-lg">
            <input
              type="text"
              placeholder="Search..."
              className="peer form-input min-h-[30px] py-[10px] ltr:pr-11 rtl:pl-11"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
              <IconSearch className="mx-auto" />
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <div className="datatables">
            {isLoading ? (
              <Loader />
            ) : data?.length ? (
              <table>
                <thead>
                  <tr>
                    <th className="!pl-12 text-left">Subjects</th>
                    {data[0].total_subject_questions ? (
                      <th className="text-center">Usage</th>
                    ) : (
                      <th className="text-center">Total Question</th>
                    )}

                    <th className="text-center">CORRECT Q</th>
                    <th className="text-center">INCORRECT Q</th>
                    <th className="text-center">OMITTED Q</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((subject: SubjectForAnalysics, i: number) => (
                    <ItemOfAnalysis subject={subject} key={i} search={search} />
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="flex h-[30vh] w-full items-center justify-center">
                {' '}
                No results for "{search}"
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportList;

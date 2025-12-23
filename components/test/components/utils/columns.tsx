import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { deleteUserRequest } from '@/client/endpoints';
import { showDeleteConfirmation, showMessage } from '@/utils';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { FETCH_TEST_REPORT_KEY, getTestReport } from '@/client/endpoints/test';
import { setFinalResult } from '@/store/testSlice';
import ResultIcon from '@/components/icon/result-icon';

type TProps = {
  refetch?: () => void;
};

export const getColumns = ({ refetch }: TProps) => {
  const router = useRouter();
  const { mutate: deleteUser } = useMutation(deleteUserRequest, {
    onSuccess: res => {
      //   refetch();
      showMessage(res.data.message);
    },
  });

  const dispatch = useDispatch();
  const [testId, setTestId] = useState('');
  const {} = useQuery(
    [FETCH_TEST_REPORT_KEY, testId],
    () => getTestReport({ test_id: testId }),
    {
      refetchOnWindowFocus: false,
      enabled: !!testId,
      onSuccess(data) {
        dispatch(setFinalResult(data.data.data));
        router.push(`/portal/diagnostic-test/result`);
      },
    },
  );

  const cols = [
    // {
    //   accessor: 'percentage',
    //   title: 'Percentage',
    //   sortable: true,
    //   render: (row: any) => (
    //     <p className="py-1 text-base text-secondary">{row.percentage}</p>
    //   ),
    // },
    {
      accessor: '_id',
      title: 'Test Id',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row._id}</p>
      ),
    },
    {
      accessor: 'corrected_questions',
      title: 'Correct',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">
          {row.corrected_questions}
        </p>
      ),
    },
    {
      accessor: 'wrong_questions',
      title: 'Incorrect',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row.wrong_questions}</p>
      ),
    },
    {
      accessor: 'skipped_questions',
      title: 'Skipped',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">
          {row?.skipped_questions}
        </p>
      ),
    },
    {
      accessor: 'total_questions',
      title: 'Total Question',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row.total_questions}</p>
      ),
    },
    {
      accessor: 'createdAt',
      title: 'Date',
      sortable: true,
      render: (row: any) => {
        return (
          <p className="text-base text-secondary">
            {dayjs(row?.createdAt).format('D MMM YYYY | h:mm A')}
          </p>
        );
      },
    },
    {
      accessor: 'status',
      title: 'Status',
      sortable: true,
      // render: (row: any) => {
      //   return (
      //     <p className="text-base text-secondary">
      //       {dayjs(row?.createdAt).format('D MMM YYYY | h:mm A')}
      //     </p>
      //   );
      // },
    },
    {
      accessor: 'submitted_at',
      title: 'Submitted at',
      sortable: true,
      render: (row: any) => {
        return (
          <p className="text-base text-secondary">
            {dayjs(row?.submitted_at).format('D MMM YYYY | h:mm A')}
          </p>
        );
      },
    },
    {
      accessor: 'actions',
      title: 'Actions',
      render: (row: any) => {
        return (
          <div
            onClick={() => {
              setTestId(row._id);
            }}
            className="flex items-center justify-center gap-4">
            <div className="cursor-pointer">
              <ResultIcon />
            </div>
          </div>
        );
      },
    },
  ] as Array<any>;

  return cols;
};

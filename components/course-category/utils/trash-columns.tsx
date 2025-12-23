import { useMutation } from 'react-query';
import { Badge } from '@/components/common';
import { useDateFormatter } from '@/hooks';
import {
  deleteUserForeverRequest,
  restoreUserRequest,
} from '@/client/endpoints';
import { showDeleteConfirmation, showMessage } from '@/utils';

type TProps = {
  refetch: () => void;
};

export const getTrashColumns = ({ refetch }: TProps) => {
  const { formatListDate, formatListTime } = useDateFormatter();

  const { mutate: deleteUser } = useMutation(deleteUserForeverRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
    },
  });

  const { mutate: restoreUser } = useMutation(restoreUserRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
    },
  });

  const deleteConfirmation = async (id: number) => {
    const data = await showDeleteConfirmation(
      'Do you want to delete this user?',
    );
    if (data?.isConfirmed) {
      deleteUser([id as number]);
    }
  };

  const restoreConfirmation = async (id: number) => {
    const data = await showDeleteConfirmation(
      'Do you want to restore this user?',
    );
    if (data?.isConfirmed) {
      restoreUser([id as number]);
    }
  };

  const cols = [
    {
      accessor: 'full_name',
      title: 'Name',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row.full_name}</p>
      ),
    },
    {
      accessor: 'email',
      title: 'Email',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row.email}</p>
      ),
    },
    {
      accessor: 'contact_number',
      title: 'Contact',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row.contact_number}</p>
      ),
    },
    {
      accessor: 'address',
      title: 'Address',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row.address}</p>
      ),
    },
    {
      accessor: 'status',
      title: 'Status',
      sortable: true,
      render: (row: any) => {
        return (
          <>
            {row?.status == 'active' ? (
              <Badge type="success" message="Active" />
            ) : row.status == 'pending' ? (
              <Badge type="warning" message="Pending" />
            ) : (
              <Badge type="danger" message="Inactive" />
            )}
          </>
        );
      },
    },
    {
      accessor: 'createdAt',
      title: 'Created',
      sortable: true,
      render: (row: any) => {
        return (
          <p className="text-base text-secondary">
            {formatListDate(row.createdAt)}
          </p>
        );
      },
    },
    {
      accessor: 'actions',
      title: 'Actions',
      render: (row: any) => {
        return (
          <div className="flex items-center gap-4">
            <button
              className="btn btn-success btn-sm"
              onClick={() => restoreConfirmation(row.id)}>
              Restore
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteConfirmation(row.id)}>
              Delete Forever
            </button>
          </div>
        );
      },
    },
  ] as Array<any>;

  return cols;
};

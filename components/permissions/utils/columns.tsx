import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { Badge } from '@/components/common';
import { useDateFormatter } from '@/hooks';
import { deletePermissionRequest } from '@/client/endpoints';
import { LINKS } from '@/constants';
import { showDeleteConfirmation, showMessage } from '@/utils';
import { DeleteIcon, EditIcon } from '@/components/common/icons/Icons';

type TProps = {
  refetch: () => void;
};

export const getColumns = ({ refetch }: TProps) => {
  const router = useRouter();
  const { formatListDate, formatListTime } = useDateFormatter();

  // Delete Permission Mutation
  const { mutate: deletePermission } = useMutation(deletePermissionRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
    },
  });

  const deleteConfirmation = async (id: string) => {
    const data = await showDeleteConfirmation(
      'Do you want to move this permission to trash?',
    );
    if (data?.isConfirmed) {
      deletePermission([id]);
    }
  };

  const cols = [
    {
      accessor: 'name',
      title: 'Permission Name',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row.name}</p>
      ),
    },
    {
      accessor: 'description',
      title: 'Description',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row.description}</p>
      ),
    },
    {
      accessor: 'status',
      title: 'Status',
      sortable: true,
      render: (row: any) => {
        return (
          <>
            {row?.active ? (
              <Badge type="success" message="Active" />
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
            <EditIcon
              onClick={() => router.push(LINKS.permissions.edit(row._id))}
            />
            <DeleteIcon onClick={() => deleteConfirmation(row._id)} />
          </div>
        );
      },
    },
  ] as Array<any>;

  return cols;
};

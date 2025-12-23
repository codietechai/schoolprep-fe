import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { Badge } from '@/components/common';
import { useDateFormatter, useSession, usePermissions } from '@/hooks';
import { deleteUserRequest } from '@/client/endpoints';
import { LINKS } from '@/constants';
import { showDeleteConfirmation, showMessage } from '@/utils';
import { DeleteIcon, EditIcon } from '@/components/common/icons/Icons';

type TProps = {
  refetch: () => void;
};

export const getColumns = ({ refetch }: TProps) => {
  const router = useRouter();
  const { formatListDate, formatListTime } = useDateFormatter();
  const { session } = useSession();

  const { hasPermission } = usePermissions();
  const isUpdate = hasPermission('subject', 'update');
  const isDelete = hasPermission('subject', 'delete');

  const { mutate: deleteUser } = useMutation(deleteUserRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
    },
  });

  const deleteConfirmation = async (id: number) => {
    const data = await showDeleteConfirmation(
      'Do you want to move this user to trash?',
    );
    if (data?.isConfirmed) {
      deleteUser([id as number]);
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
      accessor: 'role.name',
      title: 'Role',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row?.role?.name}</p>
      ),
    },

    {
      accessor: 'status',
      title: 'Status',
      sortable: true,
      render: (row: any) => {
        return (
          <>
            {row?.status == 'ACTIVE' ? (
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
      title: 'Actionasds',
      render: (row: any) => {
        return (
          <div className="flex items-center gap-4">
            {isUpdate && (
              <EditIcon
                onClick={() => router.push(LINKS.users.edit(row._id))}
              />
            )}
            {isDelete && (
              <DeleteIcon onClick={() => deleteConfirmation(row._id)} />
            )}
          </div>
        );
      },
    },
  ] as Array<any>;

  return cols;
};

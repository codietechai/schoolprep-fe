import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { Badge } from '@/components/common';
import { useDateFormatter, useSession } from '@/hooks';
import { deleteAdminRequest } from '@/client/endpoints';
import { LINKS } from '@/constants';
import IconPencil from '@/components/icon/icon-pencil';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import { showDeleteConfirmation, showMessage } from '@/utils';
import { DeleteIcon, EditIcon } from '@/components/common/icons/Icons';

type TProps = {
  refetch: () => void;
};

export const getColumns = ({ refetch }: TProps) => {
  const router = useRouter();
  const { session } = useSession();
  const { formatListDate, formatListTime } = useDateFormatter();

  const { mutate: deleteAdmin } = useMutation(deleteAdminRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
    },
  });

  const deleteConfirmation = async (id: number) => {
    const data = await showDeleteConfirmation(
      'Do you want to move this admin user to trash?',
    );
    if (data?.isConfirmed) {
      deleteAdmin([id as number]);
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
      accessor: 'active',
      title: 'Status',
      sortable: true,
      render: (row: any) => {
        return (
          <>
            {row?.active == 1 ? (
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
            <EditIcon onClick={() => router.push(LINKS.admins.edit(row._id))} />
            {session && session?.user?.id && session?.user?.id !== row._id ? (
              <DeleteIcon onClick={() => deleteConfirmation(row._id)} />
            ) : null}
          </div>
        );
      },
    },
  ] as Array<any>;

  return cols;
};

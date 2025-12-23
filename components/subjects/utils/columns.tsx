import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { Badge } from '@/components/common';
import { useDateFormatter, usePermissions } from '@/hooks';
import { deleteSubjectRequest } from '@/client/endpoints';
import { LINKS } from '@/constants';
import { showDeleteConfirmation, showMessage } from '@/utils';
import { DeleteIcon, EditIcon } from '@/components/common/icons/Icons';

type TProps = {
  refetch: () => void;
};

export const getColumns = ({ refetch }: TProps) => {
  const router = useRouter();
  const { formatListDate } = useDateFormatter();

  const { hasPermission } = usePermissions();
  const isUpdate = hasPermission('subject', 'update');
  const isRead = hasPermission('subject', 'read');
  const isDelete = hasPermission('subject', 'delete');

  // Delete Subject Mutation
  const { mutate: deleteSubject } = useMutation(deleteSubjectRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
    },
  });

  const deleteConfirmation = async (id: string) => {
    const data = await showDeleteConfirmation(
      'Do you want to move this subject to trash?',
    );
    if (data?.isConfirmed) {
      deleteSubject([id]);
    }
  };

  const cols = [
    {
      accessor: 'name',
      title: 'Subject Name',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row.name}</p>
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
            {isRead && (
              <p
                className="cursor-pointer underline hover:no-underline"
                onClick={() => router.push(LINKS.subjects.topic(row._id))}>
                Topics
              </p>
            )}
            {isUpdate && (
              <EditIcon
                onClick={() => router.push(LINKS.subjects.edit(row._id))}
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

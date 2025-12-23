import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { Badge } from '@/components/common';
import { useDateFormatter, usePermissions } from '@/hooks';
import { deleteCategoryRequest } from '@/client/endpoints';
import { LINKS } from '@/constants';
import { showDeleteConfirmation, showMessage } from '@/utils';
import { DeleteIcon, EditIcon } from '@/components/common/icons/Icons';

type TProps = {
  refetch: () => void;
};

export const getColumns = ({ refetch }: TProps) => {
  const router = useRouter();
  const { formatListDate, formatListTime } = useDateFormatter();

  const { hasPermission } = usePermissions();
  const isUpdate = hasPermission('course_category', 'update');
  const isDelete = hasPermission('course_category', 'delete');

  // Delete Course Category Mutation
  const { mutate: deleteCourseCategory } = useMutation(deleteCategoryRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
    },
  });

  // Confirmation dialog for deletion
  const deleteConfirmation = async (id: string) => {
    const data = await showDeleteConfirmation(
      'Do you want to move this course category to trash?',
    );
    if (data?.isConfirmed) {
      deleteCourseCategory([id]);
    }
  };

  const cols = [
    {
      accessor: 'name',
      title: 'Category Name',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row.name}</p>
      ),
    },

    {
      accessor: 'active',
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
            {isUpdate && (
              <EditIcon
                onClick={() => router.push(LINKS.courseCategory.edit(row._id))}
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

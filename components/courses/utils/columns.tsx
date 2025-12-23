import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { Badge } from '@/components/common';
import { useDateFormatter, usePermissions } from '@/hooks';
import { deleteCourseRequest, deleteRoleRequest } from '@/client/endpoints'; // Can be replaced with `deleteCourseRequest` for courses
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
  const isUpdate = hasPermission('course', 'update');
  const isDelete = hasPermission('course', 'delete');

  const { mutate: deleteCourse } = useMutation(deleteCourseRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
    },
  });

  const deleteConfirmation = async (id: string) => {
    const data = await showDeleteConfirmation(
      'Do you want to move this course to trash?',
    );
    if (data?.isConfirmed) {
      deleteCourse([id]);
    }
  };

  const cols = [
    {
      accessor: 'name',
      title: 'Course Name',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row.name}</p>
      ),
    },

    {
      accessor: 'active',
      title: 'Status',
      sortable: true,
      render: (row: any) => (
        <>
          {row?.active ? (
            <Badge type="success" message="Active" />
          ) : (
            <Badge type="danger" message="Inactive" />
          )}
        </>
      ),
    },
    {
      accessor: 'createdAt',
      title: 'Date',
      sortable: true,
      render: (row: any) => (
        <p className="text-base text-secondary">
          {formatListDate(row.createdAt)}
        </p>
      ),
    },
    {
      accessor: 'actions',
      title: 'Actions',
      render: (row: any) => (
        <div className="flex items-center gap-4">
          <span
            className="cursor-pointer"
            onClick={() => router.push(LINKS.courseDiagnostic.route(row._id))}>
            <p>Diagnostic Test</p>
          </span>
          <span
            className="cursor-pointer"
            onClick={() => router.push(LINKS.plans.route(row._id))}>
            <p>Plans</p>
          </span>

          {isUpdate && (
            <EditIcon
              onClick={() => router.push(LINKS.courses.edit(row._id))}
            />
          )}
          {isDelete && (
            <DeleteIcon onClick={() => deleteConfirmation(row._id)} />
          )}
        </div>
      ),
    },
  ] as Array<any>;

  return cols;
};

import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { Badge } from '@/components/common';
import { useDateFormatter } from '@/hooks';
import { deletePlanRequest } from '@/client/endpoints'; // Can be replaced with `deleteCourseRequest` for courses
import { LINKS } from '@/constants';
import IconPencil from '@/components/icon/icon-pencil';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import { showDeleteConfirmation, showMessage } from '@/utils';
import { DeleteIcon, EditIcon } from '@/components/common/icons/Icons';

// Define the function to handle columns for the Course schema
type TProps = {
  refetch: () => void;
};

export const getColumns = ({ refetch }: TProps) => {
  const router = useRouter();
  const { formatListDate, formatListTime } = useDateFormatter();

  // Mutate function for deleting a course (adapt this to course deletion)
  const { mutate: deletePlan } = useMutation(deletePlanRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
    },
  });

  // Delete confirmation for courses
  const deleteConfirmation = async (id: string) => {
    const data = await showDeleteConfirmation(
      'Do you want to move this Plan to trash?',
    );
    if (data?.isConfirmed) {
      deletePlan([id]);
    }
  };

  const cols = [
    {
      accessor: 'name',
      title: 'Plan Name',
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
      title: 'Created',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row.question_text}</p>
      ),
    },
    {
      accessor: 'actions',
      title: 'Actions',
      render: (row: any) => {
        return (
          <div className="flex items-center gap-4">
            <EditIcon
              onClick={() => router.push(LINKS.plans.edit(row._id, row.course))}
            />
            <DeleteIcon onClick={() => deleteConfirmation(row._id)} />
          </div>
        );
      },
    },
  ] as Array<any>;

  return cols;
};

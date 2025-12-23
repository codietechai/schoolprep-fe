import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { useDateFormatter, usePermissions } from '@/hooks';
import { deleteQuestionRequest } from '@/client/endpoints'; // Can be replaced with `deleteCourseRequest` for courses
import { LINKS } from '@/constants';
import { showDeleteConfirmation, showMessage } from '@/utils';
import { DeleteIcon, EditIcon } from '@/components/common/icons/Icons';

// Define the function to handle columns for the Course schema
type TProps = {
  refetch: () => void;
};

export const getColumns = ({ refetch }: TProps) => {
  const router = useRouter();
  const { formatListDate, formatListTime } = useDateFormatter();

  const { hasPermission } = usePermissions();
  const isUpdate = hasPermission('question', 'update');
  const isDelete = hasPermission('question', 'delete');

  const { mutate: deleteQuestion } = useMutation(deleteQuestionRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data.message);
    },
  });

  // Delete confirmation for courses
  const deleteConfirmation = async (id: string) => {
    const data = await showDeleteConfirmation(
      'Do you want to move this questions to trash?',
    );
    if (data?.isConfirmed) {
      deleteQuestion([id]);
    }
  };

  const cols = [
    {
      accessor: 'question_text',
      title: 'Question Name',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row.question_text}</p>
      ),
    },

    {
      accessor: 'createdAt',
      title: 'Created',
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
          {isUpdate && (
            <EditIcon
              onClick={() => router.push(LINKS.questions.edit(row._id))}
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

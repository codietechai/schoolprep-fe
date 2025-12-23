import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { Badge } from '@/components/common';
import { useDateFormatter } from '@/hooks';
import { deleteCategoryRequest } from '@/client/endpoints';
import { LINKS } from '@/constants';
import IconPencil from '@/components/icon/icon-pencil';

type TProps = {
  refetch: () => void;
};

export const getColumns = ({ refetch }: TProps) => {
  const router = useRouter();
  const { formatListDate, formatListTime } = useDateFormatter();

  const cols = [
    {
      accessor: 'email',
      title: 'Contact Email',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row.email}</p>
      ),
    },
    {
      accessor: 'phone',
      title: 'Contact Phone',
      sortable: true,
      render: (row: any) => (
        <p className="py-1 text-base text-secondary">{row.phone}</p>
      ),
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
            <span
              className="cursor-pointer"
              onClick={() => router.push(LINKS.contacts.view(row._id))}>
              <IconPencil />
            </span>
          </div>
        );
      },
    },
  ] as Array<any>;

  return cols;
};

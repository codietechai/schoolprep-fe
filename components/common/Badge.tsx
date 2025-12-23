'use client';
import React from 'react';

type TProps = {
  type:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark';
  message: React.ReactNode;
};

// const getClassName = (text: string) => {
//   let cls = '';
//   if (text === 'primary') {
//     cls = 'bg-primary';
//   } else if (text === 'success') {
//     cls = 'bg-success';
//   } else if (text === 'danger') {
//     cls = 'bg-danger';
//   } else if (text === 'warning') {
//     cls = 'bg-warning';
//   } else if (text === 'info') {
//     cls = 'bg-info';
//   } else if (text === 'dark') {
//     cls = 'bg-dark';
//   } else if (text === 'secondary') {
//     cls = 'bg-secondary';
//   } else {
//     cls = 'bg-primary';
//   }
//   return cls;
// };

export const Badge = ({ type, message }: TProps) => {
  return (
    // <span className={`badge ${getClassName(type)} capitalize`}>{message}</span>
    <div className="flex items-center gap-1">
      <svg
        width="9"
        height="8"
        viewBox="0 0 9 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="4.3335"
          cy="4"
          r="4"
          fill={
            type === 'success'
              ? '#2EAF40'
              : type === 'warning'
              ? '#FFA500'
              : '#E41B1F'
          }
        />
      </svg>
      <span className="ml-1 text-sm leading-[24px] text-secondary">
        {message}
      </span>
    </div>
  );
};

export function StatusBadge({ status }: { status?: string }) {
  if (status === 'active') {
    return <Badge type="success" message="Active" />;
  } else if (status === 'pending') {
    return <Badge type="warning" message="Pending" />;
  } else if (status === 'inactive') {
    return <Badge type="danger" message="Inactive" />;
  } else {
    return <Badge type="info" message={status} />;
  }
}

import React from 'react';

const DashboardContainerSkeleton = () => {
  return (
    <div className="min-h-[190px] w-full rounded-2xl border border-border-light px-6 py-6">
      <div className="flex h-full animate-pulse flex-col items-center justify-between">
        <div className="h-5 w-[60%] rounded-full bg-gray-100"></div>

        <div className="size-24 rounded-full bg-gray-100"></div>
      </div>
    </div>
  );
};

export { DashboardContainerSkeleton };

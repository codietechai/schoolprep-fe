import ReportList from '@/components/performance/utils/list';
import React from 'react';

const page = () => {
  return (
    <div className="dashboard-panel">
      <div>
        <p className=" page-header">Report</p>
      </div>
      <div>
        <ReportList />
      </div>
    </div>
  );
};

export default page;

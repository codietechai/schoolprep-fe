import TestModal from '@/components/preparatory-test/test-modal';
import React from 'react';

const page = () => {
  return (
    <div className="dashboard-panel">
      <h2 className="text-2xl font-bold leading-[36px] text-black">
        Create Test for Preparation
      </h2>

      <div className="relative mt-5 overflow-hidden rounded-lg border-0 p-0">
        <div className="table-responsive">
          <div className="datatables">
            <TestModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

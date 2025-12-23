import DiagnosticTestList from '@/components/diagnostic-test/list';
import LocationBoard from '@/components/locationboard';
import React, { useState } from 'react';
// import { subjects } from '../preparatory-test/page';

const page = ({ searchParams }: { searchParams: { retake?: string } }) => {
  const retake = searchParams.retake;
  return (
    // <div>
    //   <div className="dashboard-panel">
    //     <div className="">
    //       <h2 className="page-header mb-8">Diagnostic test</h2>
    //       <NoTestHistory onClick={() => setShow(true)} />
    //     </div>
    //
    //   </div>
    // </div>
    <div className="app-panel">
      <LocationBoard />
      <DiagnosticTestList retake={retake as string} />
    </div>
  );
};

export default page;

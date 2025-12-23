import React from 'react';
import LocationBoard from '@/components/locationboard';
import { PreparatoryTestList } from '@/components/preparatory-test/list';

const page = () => {
  return (
    <div className="app-panel">
      <LocationBoard />
      <PreparatoryTestList />
    </div>
  );
};

export default page;

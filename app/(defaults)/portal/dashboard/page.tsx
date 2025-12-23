import ComponentsAnalytics from '@/components/dashboard/analytics';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Analytics Dashboard',
};

const Analytics = () => {
  return <ComponentsAnalytics heading="Dashboard" />;
};

export default Analytics;

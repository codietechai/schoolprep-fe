import Button from '@/components/common/button';
import NoTest from '@/components/icon/no-test-icon';
import React from 'react';

const NoTestHistory = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="flex w-[504px] flex-col items-center justify-center text-center text-secondary">
        <NoTest />
        <h2 className="mt-4 font-bold">No tests attempted yet</h2>
        <p className="mt-2">
          You haven’t taken any tests yet! Start your journey by attempting your
          first diagnostic test and track your progress.
        </p>
        <Button
          type="secondary"
          text="Start test"
          onClick={onClick}
          className="mt-6"
        />
      </div>
    </div>
  );
};

export default NoTestHistory;

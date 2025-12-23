import QuestionContainer from '@/components/test/question-container';
import React from 'react';

const page = () => {
  return (
    <div className="text-base text-secondary">
      <QuestionContainer testType="DIAGNOSTIC" />
    </div>
  );
};

export default page;

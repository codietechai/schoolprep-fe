export const TestModeDetail = () => (
  <div className="absolute left-[120px] z-30 flex w-[400px] gap-4 rounded-xl bg-white p-5 text-sm shadow-md">
    <span className="font-semibold">Tutor</span>
    <span>
      Shows the correct answer and explanation after you answer each question
    </span>
  </div>
);

export const RequiredFieldsDetail = () => (
  <div className="absolute bottom-[100%] z-30 w-[430px] rounded-xl bg-white p-5 text-sm shadow-md">
    <p className="mb-3 font-semibold">
      Please fill the mandatory fields before proceeding
    </p>
    <div className="mb-2 flex items-center gap-2">
      <span className="h-1 w-1 rounded-full bg-secondary"></span>Please enter
      No. of Questions.
    </div>
    <div className="flex items-center gap-2">
      <span className="h-1 w-1 rounded-full bg-secondary"></span>Please select
      Duration.
    </div>
  </div>
);

export const QuestionModeDetail = () => (
  <div className="absolute left-[160px] z-30 w-[400px] rounded-xl bg-white p-5 text-sm shadow-md">
    <div className="flex gap-4 border-b border-b-border-light pb-3">
      <span className="font-semibold">Unused</span>
      <span>Selects questions from a set of new/unseen questions</span>
    </div>
    <div className="flex gap-4 border-b border-b-border-light py-3">
      <span className="font-semibold">Correct</span>
      <span>Selects questions that were previously answered correctly</span>
    </div>
    <div className="flex gap-4 border-b border-b-border-light py-3">
      <span className="font-semibold">Incorrect</span>
      <span>Selects questions that were previously answered incorrectly</span>
    </div>
    <div className="flex gap-4 py-3">
      <span className="font-semibold">Skipped</span>
      <span>Selects questions that were omitted previously</span>
    </div>
  </div>
);

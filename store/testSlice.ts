import { TOption, TQuestion } from '@/components/test/question-container';
import { TTopics } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

export interface TProgress {
  question: TQuestion;
  selected_option: TOption | null;
  time_taken?: { previous_time_in_seconds: number };
  _id: string;
}

export interface TResult {
  _id: string;
  user_id: string;
  type: string;
  skipped_questions: number;
  corrected_questions: number;
  duration_of_exam: number;
  wrong_questions: number;
  createdAt: string;
  submitted_at: string;
  questions: TQuestion[];
  topics: TTopics[];
  tutor: boolean;
  question_mode: string;
  total_questions: number;
  course_id: string;
  total_time: number;
  status: string;
  progress: {
    question: TQuestion;
    selected_option: string | null;
    time_taken: { previous_time_in_seconds: number };
    _id: string;
  }[];
}

interface Test {
  test: {
    _id: string;
    user_id: string;
    type: 'DIAGNOSTIC' | 'PREPARATORY';
    duration_of_exam: number;
    questions: TQuestion[];
    topics: string[]; // ObjectId of topics
    current_question_no: number;
    tutor: boolean;
    status: string;
    course_id: string;
    question_mode: string[];
    remaining_time: number;
    // question_mode: ['CORRECT', 'INCORRECT', 'SKIPPED', 'UNUSED'];
    total_questions: number;
    createdAt: string;
    submittedAt: string;
    progress: TProgress[];
    bookmark_questions: string[];
  };
  result: TResult | null;
}

const initialState: Test = {
  test: {
    _id: '',
    user_id: '',
    type: 'DIAGNOSTIC',
    course_id: '',
    duration_of_exam: 1.5,
    questions: [],
    topics: [],
    status: '',
    current_question_no: 1,
    tutor: false,
    question_mode: [],
    total_questions: 0,
    remaining_time: 1.5,
    createdAt: '',
    bookmark_questions: [],
    submittedAt: '',
    progress: [],
  },
  result: null,
};

const testSlice = createSlice({
  name: 'test',
  initialState: initialState,
  reducers: {
    createTest(state, { payload }) {
      state.test = payload;
    },
    submitAnswer(state, { payload }) {
      state.test.progress = payload;
    },
    deleteTest(state) {
      state.test = initialState.test;
    },
    updateTime(state, { payload }) {
      state.test.submittedAt = payload;
    },
    addToBookMark(state, { payload }) {
      state.test.bookmark_questions.push(payload);
    },
    removeFromBookMark(state, { payload }) {
      state.test.bookmark_questions = state.test.bookmark_questions.filter(
        item => item !== payload,
      );
    },
    setQuestionNumber(state, { payload }) {
      state.test.current_question_no = payload;
    },
    setTestTimeVariables(state, { payload }) {
      state.test.submittedAt = payload;
    },
    setFinalResult(state, { payload }) {
      state.result = payload;
    },
  },
});

export const {
  createTest,
  submitAnswer,
  setTestTimeVariables,
  deleteTest,
  updateTime,
  setQuestionNumber,
  addToBookMark,
  removeFromBookMark,
  setFinalResult,
} = testSlice.actions;

export default testSlice.reducer;

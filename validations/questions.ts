import * as yup from 'yup';

export const addQuestionSchema = yup.object().shape({
  question_text: yup.string().required('Question is required'),
  explanation_text: yup.string().required('Answer Explanation  is required'),
  course_id: yup.string().required('Course is required'),
  subject_id: yup.string().required('Subject is required'),
  difficulty_level: yup.string().required('Difficulty level is required'),
  topic_id: yup.string().required('Topic is required'),
  is_diagnostic: yup.boolean().required('Diagnostic Status is required'),
  is_preparatory: yup.boolean().required('Preparatory Status is required'),
  is_real_exam: yup.boolean().required('Exam Status is required'),
});

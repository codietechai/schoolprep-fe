'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCourseQuestions } from "@/client/endpoints"; 

const ExamPage = () => {
    const searchParams = useSearchParams();
    const course = searchParams.get('course');
    const mode = searchParams.get('mode');

    const [questions, setQuestions] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [quizComplete, setQuizComplete] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false); // State to manage explanation visibility

    useEffect(() => {
        if (course && mode) {
            const payload = {
                course_id: course,
                size: 10, // Adjust based on your requirements
                skip: 0,  // Adjust based on your pagination
                search: '', // Adjust if needed
            };

            const fetchQuestions = async () => {
                setLoading(true);
                setError('');
                try {
                    const data = await fetchCourseQuestions(payload);
                    setQuestions(data);
                } catch (err) {
                    setError('Failed to load questions');
                } finally {
                    setLoading(false);
                }
            };

            fetchQuestions();
        }
    }, [course, mode]);

    const handleOptionChange = (option: string) => {
        const updatedSelectedOptions = [...selectedOptions];
        updatedSelectedOptions[currentQuestionIndex] = option;
        setSelectedOptions(updatedSelectedOptions);
    };

    const handleSubmitAndNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setShowExplanation(false); // Reset explanation visibility when moving to the next question
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizComplete(true);
            // Count correct answers
            let correctCount = 0;
            selectedOptions.forEach((option, index) => {
                const question: any = questions[index];
                const selectedOption = question.options.find((opt: any) => opt.text === option);
                if (selectedOption && selectedOption.isCorrect) {
                    correctCount++;
                }
            });
            setCorrectAnswersCount(correctCount);
        }
    };

    const previousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setShowExplanation(false); // Reset explanation visibility
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            <div className="p-4 bg-white rounded-lg shadow-lg mb-2">
                <div className="grid gap-2 lg:grid-cols-2">
                    <p>Course ID: {course}</p>
                    <p>Mode: {mode}</p>
                </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
                {loading && <p>Loading questions...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {quizComplete ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Exam Completed</h2>
                        <p>You answered {correctAnswersCount} out of {questions.length} questions correctly.</p>
                        <div className="mt-4">
                            {questions.map((question: any, index: number) => (
                                <div key={index} className="mb-4">
                                    <p className="font-semibold">{question.questionText}</p>
                                    <div>
                                        {question.options.map((option: any, optionIndex: number) => {
                                            const selected = selectedOptions[index] === option.text;
                                            return (
                                                <div
                                                    key={optionIndex}
                                                    className={`p-2 ${selected ? (option.isCorrect ? 'bg-green-100' : 'bg-red-100') : ''} border`}
                                                >
                                                    {option.text} {selected && option.isCorrect && <span className="text-green-600">Correct</span>}
                                                    {selected && !option.isCorrect && <span className="text-red-600">Incorrect</span>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="font-semibold">{currentQuestion?.questionText}</p>
                        <div>
                            {currentQuestion?.options.map((option: any, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionChange(option.text)}
                                    className="p-2 border mb-2"
                                >
                                    {option.text}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4">
                            <button onClick={previousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
                            <button onClick={handleSubmitAndNext}>
                                {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExamPage;
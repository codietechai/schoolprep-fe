import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation"; // Import from next/navigation
import { FETCH_COURSES_KEY, fetchCourses } from "@/client/endpoints";
import { InputSelect } from "./common";
import { useForm } from "react-hook-form";

const ExamModal = () => {
    const router = useRouter(); // Initialize router from next/navigation
    const [courses, setCourses] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
    const [selectedMode, setSelectedMode] = useState<"practice" | "exam" | null>(null);

    const { data: fetchedCourses } = useQuery(
        [FETCH_COURSES_KEY],
        () =>
            fetchCourses({ size: 1000, skip: 0, search: '', sorting: 'name ASC' }),
        {
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            retry: 0,
        }
    );

    useEffect(() => {
        if (fetchedCourses) {
            setCourses(fetchedCourses?.data || []);
        }
    }, [fetchedCourses]);

    const openModal = () => {
        setIsModalOpen(true);
        setSelectedCourse(null);
        setSelectedMode(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
        setSelectedMode(null);
    };

    const handleCourseChange = (course: any) => {
        setSelectedCourse(course?.value || null); // Update state with selected course value
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<any>({
        mode: 'onBlur',
    });

    return (
        <div>
            <button className="btn btn-primary" onClick={openModal}>
                Start Exam
            </button>

            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-lg shadow-lg p-6"
                        style={{ height: 700, width: 700 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4">Exam Instructions</h2>
                        <p>Read the instructions carefully before starting the exam.</p>
                        <div className="mt-6 mb-6">
                            <InputSelect
                                label="Course"
                                control={control}
                                onChange={handleCourseChange}
                                name="course_id"
                                options={courses.map(category => ({
                                    value: category._id,
                                    label: category.name,
                                }))}
                                errorText={errors.course_id?.message as string}
                            />
                        </div>
                        <p>Practice tests are learning tools that help you practice answering questions in preparation to take a standardized exam. You can take the practice test as many times as you like in various modes.</p>

                        {selectedCourse && (
                            <>
                                <div className="mt-4">
                                    <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                                        Choose test mode to begin Exam
                                    </h1>
                                </div>
                                <div className="grid grid-cols-2 gap-6 mt-4">
                                    {/* Practice Mode */}
                                    <div
                                        onClick={() => setSelectedMode("practice")}
                                        className={`border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer ${selectedMode === "practice" ? "border-blue-500 bg-blue-50" : ""}`}
                                    >
                                        <div className="flex items-center mb-4">
                                            <h3 className="text-lg font-bold">Practice Mode</h3>
                                        </div>
                                        <p className="text-sm mb-4">
                                            Practice answering questions in a low-stakes environment and review
                                            each answer before moving on to the next question.
                                        </p>
                                    </div>

                                    {/* Exam Mode */}
                                    <div
                                        onClick={() => setSelectedMode("exam")}
                                        className={`border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer ${selectedMode === "exam" ? "border-blue-500 bg-blue-50" : ""}`}
                                    >
                                        <div className="flex items-center mb-4">
                                            <h3 className="text-lg font-bold">Exam Mode</h3>
                                        </div>
                                        <p className="text-sm mb-4">
                                            Simulate a standardized test by completing your practice test within
                                            the time limit and achieving a passing score.
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="mt-6 flex justify-end space-x-4">
                            <button className="btn" onClick={closeModal}>
                                Cancel
                            </button>

                            {selectedMode && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        closeModal();
                                        const targetRoute = `/portal/exam?course=${selectedCourse}&mode=${selectedMode}`;
                                        router.push(targetRoute); 
                                    }}
                                >
                                    Start Exam
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamModal;

import React from 'react';
import Accordian from '../../components/common/Accordian';

const faqs = [
  'What is the eligibility criteria for nursing exams?',
  'What is the exam format and duration?',
  'How can I register for the exam?',
  'Which subjects are covered in the syllabus?',
  'Are there any recommended study materials?',
  'Can I reschedule or retake the exam?',
  'What is the passing score for the exam?',
];

const FrequentQuestions = () => {
  return (
    <div className="res-padding">
      <div className="responsive max-w-[1280px]">
        <h2 className="heading mb-10 text-center text-black">
          Frequently asked questions (FAQs)
        </h2>
        <div className="space-y-4">
          {faqs.map((_, i) => (
            <Accordian
              key={i}
              question={_}
              answer={
                <div>
                  <p className="">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Error, assumenda sequi! Minus earum vero magnam veniam illo,
                    nostrum id rem perspiciatis necessitatibus? Officiis
                    maiores, ratione vitae delectus sapiente ad consequuntur?
                  </p>
                  <p className="">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dignissimos, saepe perferendis at atque quaerat consectetur
                    doloremque vitae laboriosam voluptates adipisci minus
                    nostrum! Nihil, quasi! Perferendis vel odit sint ipsa culpa
                    sunt repudiandae nulla fugiat ex corrupti dicta provident
                    vero iste porro quidem rem optio dolor omnis voluptatum
                    explicabo, itaque maxime.
                  </p>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrequentQuestions;

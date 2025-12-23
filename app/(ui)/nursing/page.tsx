import Button from '@/components/userui/components/common/Button';
import Image from 'next/image';
import React from 'react';
import img from '@/components/userui/components/images/pharmacy/svg.webp';
import Review from '@/components/userui/screen/home/review';
import Educators from '@/components/userui/screen/home/educators';
import Impact from '@/components/userui/screen/home/impact';
import FrequentQuestions from '@/components/userui/screen/home/frequent-questions';
import AccessPrivateQuestions from '@/components/userui/screen/home/access-practice-questions';
import Subscription from '@/components/userui/screen/home/subscription';
import { Metadata } from 'next';
import ChooseUs from '@/components/userui/screen/nursing/choose-us';

export const metadata: Metadata = {
  title: {
    template: '%s | Test Prep',
    default: 'Nursing Program',
  },
  description: 'kdkdk ddk ddkkd',
  openGraph: {
    title: 'Test Prep - Nursing Courses',
    description: 'Prepare for your exams with the best resources and tools.',
    url: '/nursing',
    siteName: 'Test Prep',
    images: [
      {
        url: 'https://weblianz.com/images/og-image-all.jpg',
        width: 1200,
        height: 630,
        alt: 'Test Prep Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

const page = () => {
  return (
    <div>
      <section className="responsive max-w-[1280px] space-y-20 pb-[60px] pt-[88px] lg:pb-[120px]">
        <div className="flex flex-col items-center gap-10 text-center">
          <h1 className="main-head max-w-[848px]">
            Conquer the <span className="text-[#4B70F5]">NCLEX-RN</span> with
            Ease and Assurance
          </h1>
          <p className="text-base text-black sm:text-xl lg:text-2xl lg:leading-9">
            Our mission is to revolutionize medical education by equipping
            students and instructors with cutting-edge tools backed by
            educational research. We understand the complexity of building a
            strong foundation in healthcare knowledge and the obstacles learners
            face in achieving mastery.{' '}
          </p>
          <Button text="Sign up" className="bg-[#4B70F5] text-white" />
        </div>
        <Image src={img} alt="img" />
      </section>
      <ChooseUs />
      <div className="bg-background">
        <Review />
      </div>
      <Educators />
      <Impact />
      <Subscription />
      <FrequentQuestions />
      <AccessPrivateQuestions />
    </div>
  );
};

export default page;

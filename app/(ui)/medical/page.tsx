import Button from '@/components/userui/components/common/Button';
import img from '@/components/userui/components/images/medical/svg.webp';
import HeaderSection from '@/components/userui/layout/common/HeaderSection';
import PersonalizedMedicalPrograms from '@/components/userui/screen/explore/PersonalizedMedicalPrograms';
import AccessPrivateQuestions from '@/components/userui/screen/home/access-practice-questions';
import Educators from '@/components/userui/screen/home/educators';
import FrequentQuestions from '@/components/userui/screen/home/frequent-questions';
import Impact from '@/components/userui/screen/home/impact';
import Review from '@/components/userui/screen/home/review';
import Subscription from '@/components/userui/screen/home/subscription';
import { Metadata } from 'next';
import mainImg from '@/components/userui/components/images/medical/image.webp';
import Image from 'next/image';
import React from 'react';

export const metadata: Metadata = {
  title: {
    template: '%s | Test Prep',
    default: 'Medical Program',
  },
  description: 'kdkdk ddk ddkkd',
  openGraph: {
    title: 'Test Prep - Medical Courses',
    description: 'Prepare for your exams with the best resources and tools.',
    url: '/medical',
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
      <div className="main overflow-hidden text-[#253650]">
        <section
          id="home"
          className="responsive relative flex max-w-[1280px] items-center gap-8 py-10 md:py-20 xl:py-56">
          <div className="">
            <h2 className="mb-2 text-center text-sm font-normal md:text-lg lg:text-left lg:text-[24px] lg:leading-[36px]">
              Begin your medical career with confidence.
            </h2>
            <HeaderSection
              head={
                <span>
                  Explore <span className="text-[#4B70F5]">OnLine</span> Medical
                  Programs.
                </span>
              }
              text="Learn from top-tier instructors and take the first step toward becoming an exceptional nurse."
              footer={
                <Button
                  text="Start now"
                  className="w-[159px] bg-[#4B70F5] text-white"
                />
              }
            />
          </div>
          <div className="absolute -right-14 top-20 hidden xl:block ">
            <Image src={mainImg} alt="img" className="h-auto max-w-[605px]" />
          </div>
        </section>
        <PersonalizedMedicalPrograms />
        <div className="res-padding">
          <Image src={img} alt="img" className="m-auto max-w-[1280px]" />
        </div>
        <Review />
        <div className="bg-[#111A38]">
          <Educators background="dark" />
        </div>
        <div className="mt-[60px] lg:mt-[120px]">
          <Impact />
        </div>
        <Subscription />
        <FrequentQuestions />
        <AccessPrivateQuestions />
      </div>
    </div>
  );
};

export default page;

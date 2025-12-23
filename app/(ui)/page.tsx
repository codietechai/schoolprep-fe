import React from 'react';
import Button from '@/components/userui/components/common/Button';
import FeaturedCourses from '@/components/userui/screen/home/featured-courses';
import ChooseUs from '@/components/userui/screen/home/choose-us';
import Review from '@/components/userui/screen/home/review';
import Educators from '@/components/userui/screen/home/educators';
import Impact from '@/components/userui/screen/home/impact';
import FrequentQuestions from '@/components/userui/screen/home/frequent-questions';
import { Metadata } from 'next';
import { BadgesIcon } from '@/components/userui/components/icons/icon';
import AccessPrivateQuestions from '@/components/userui/screen/home/access-practice-questions';
import HeaderSection from '@/components/userui/layout/common/HeaderSection';
import Image from 'next/image';
import img from '@/components/userui/components/images/home/main.webp';

export const metadata: Metadata = {
  title: {
    template: '%s | Test Prep',
    default: 'Home',
  },
  description: 'kdkdk ddk ddkkd',
  openGraph: {
    title: 'Test Prep - Ace Your Exams',
    description: 'Prepare for your exams with the best resources and tools.',
    url: '/',
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

const HomePage = () => {
  return (
    <div>
      <div className="main overflow-hidden">
        <section
          id="home"
          className="responsive relative flex max-w-[1280px] items-center gap-8 py-10 md:py-20 xl:py-56">
          <div className="">
            <div className="mb-8 flex w-fit flex-wrap items-center justify-center gap-2 rounded-full bg-[#F2F2F2] px-3 py-2">
              <p className="text-sm text-black opacity-80">
                Trusted by <span className="font-bold">350K+ </span>
                professionals
              </p>
              <BadgesIcon />
            </div>
            <HeaderSection
              head={
                <span>
                  Master <span className="text-[#4B70F5]">Nursing</span> with
                  trusted questions
                </span>
              }
              text="Master essential skills faster with tailored practice questions and detailed answer explanations. Start your journey to nursing success!"
              footer={
                <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:justify-start">
                  <Button
                    text="Buy now"
                    className="w-[165px] bg-[#4B70F5] text-white"
                  />
                  <Button
                    text="Learn more"
                    className="w-[165px] text-[#4B70F5] hover:bg-[#4B70F5] hover:text-white"
                  />
                </div>
              }
            />
          </div>

          <div className="absolute -right-36 top-12 hidden xl:block ">
            <Image src={img} alt="img" className="h-auto w-[775px]" />
          </div>
        </section>
        <FeaturedCourses />
        <ChooseUs />
        <div className="bg-background">
          <Review />
        </div>
        <Educators />
        <Impact />
        <FrequentQuestions />
        <AccessPrivateQuestions />
      </div>
    </div>
  );
};
export default HomePage;

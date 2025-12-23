import Button from '@/components/userui/components/common/Button';
import Image from 'next/image';
import React from 'react';
import img2 from '@/components/userui/components/images/pharmacy/image.webp';
import Preparation from '@/components/userui/screen/pharmacy/Preparation';
import Review from '@/components/userui/screen/home/review';
import Educators from '@/components/userui/screen/home/educators';
import Subscription from '@/components/userui/screen/home/subscription';
import FrequentQuestions from '@/components/userui/screen/home/frequent-questions';
import HeaderSection from '@/components/userui/layout/common/HeaderSection';
import Rewarding from '@/components/userui/screen/pharmacy/Rewarding';
import PharmacyImpact from '@/components/userui/screen/pharmacy/PharmacyImpact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Test Prep',
    default: 'Pharmacy Program',
  },
  description: 'kdkdk ddk ddkkd',
  openGraph: {
    title: 'Test Prep - Pharmacy Courses',
    description: 'Prepare for your exams with the best resources and tools.',
    url: '/pharmacy',
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
      <section
        id="home"
        className="responsive relative flex max-w-[1280px] flex-col items-center gap-5 py-10 sm:flex-row sm:gap-14 xl:py-20">
        <Image
          src={img2}
          alt="img"
          className="w-52 rounded-2xl sm:w-64 lg:w-96 xl:w-[515px]"
        />
        <HeaderSection
          head={
            <span>
              Explore <span className="text-[#4B70F5]">Pharmacy</span> Programs.
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
      </section>
      <Preparation />
      <Rewarding />
      <Review />
      <div className="mb-[60px] lg:mb-[120px]">
        <PharmacyImpact />
      </div>
      <div className="bg-[#111A38]">
        <Educators background="dark" />
      </div>
      <Subscription />
      <FrequentQuestions />
    </div>
  );
};

export default page;

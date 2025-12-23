import Image, { StaticImageData } from 'next/image';
import img from '@/components/userui/components/images/about-us/image.webp';
import React from 'react';
import Educators from '@/components/userui/screen/home/educators';
import Impact from '@/components/userui/screen/home/impact';
import AccessPrivateQuestions from '@/components/userui/screen/home/access-practice-questions';
import HeaderSection from '@/components/userui/layout/common/HeaderSection';
import Button from '@/components/userui/components/common/Button';
import CoreValues from '@/components/userui/screen/about-us/core-values';
import { Metadata } from 'next';

// const data = [
//   {
//     title: 'Our Purpose',
//     description:
//       'At our company, our goal is to empower students and educators with advanced learning solutions grounded in the science of education. We recognize the challenges that come with mastering the extensive foundational knowledge required for excellence in healthcare. To address these demands, we believe it’s time to rethink how medical education is delivered on a global scale.',
//   },
//   {
//     title: 'Our Approach',
//     description:
//       'To meet this need, we’ve developed an innovative digital platform that redefines medical education. Accessible, adaptable, and tailored to individual learning styles, our solution is designed to support both students and faculty with cutting-edge technology, robust assessment tools, and real-time progress tracking. Every feature is crafted with the needs of the academic community in mind.',
//   },
//   {
//     title: 'Our Expertise',
//     description:
//       'Our diverse team includes over 250 experienced physicians and educators from world-renowned institutions like Harvard, Johns Hopkins, and University College London. With their expertise, we ensure the highest standards of teaching quality. A dedicated advisory board of esteemed educators helps guide our content strategy, ensuring every resource meets the evolving needs of medical learners.',
//   },
//   {
//     title: 'Our Global Reach',
//     description:
//       'Our resources are trusted by over 500,000 learners and educators spanning 175+ countries. Join us in transforming medical education and shaping the healthcare professionals of tomorrow.',
//   },
// ];

export const metadata: Metadata = {
  title: {
    template: '%s | Test Prep',
    default: 'About Us',
  },
  description: 'kdkdk ddk ddkkd',
  openGraph: {
    title: 'Test Prep - About Us',
    description:
      'Learn how to prepare for your exams with the best resources and tools.',
    url: '/about-us',
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
    <div className="main overflow-hidden text-[#253650]">
      <section
        id="home"
        className="responsive relative flex max-w-[1280px] flex-col items-center gap-5 py-10 sm:flex-row sm:gap-14 xl:py-20">
        <Image
          src={img}
          alt="img"
          className="w-52 rounded-2xl sm:w-64 lg:w-96 xl:w-[515px]"
        />
        <HeaderSection
          head={<span>Pioneers in Lifelong Learning</span>}
          text="Our company is committed to transforming education. With a wide range of innovative programs and solutions, we empower students and partners to achieve greater success at a faster pace."
          footer={
            <Button
              text="Start now"
              className="w-[159px] bg-[#4B70F5] text-white"
            />
          }
        />
      </section>
      <CoreValues />
      <div className="res-padding mx-auto flex max-w-[1280px] justify-center">
        <div className="mx-4 grid grid-cols-1 gap-[26px] sm:grid-cols-2 lg:mx-0 lg:grid-cols-4">
          <div className="flex max-w-[301px] flex-col items-center gap-1 rounded-2xl border border-border-light px-4 py-6 md:gap-4 lg:gap-6 lg:px-8 lg:py-12">
            <h2 className="text-[28px] font-bold leading-[28px] text-[#4B70F5] sm:text-[40px] lg:text-[64px] lg:leading-[48px]">
              9k+
            </h2>
            <p className="tertiary-text">Teachers</p>
          </div>
          <div className="flex max-w-[301px] flex-col items-center gap-1 rounded-2xl border border-border px-4 py-6 md:gap-4 lg:gap-6 lg:px-8 lg:py-12">
            <h2 className="text-[28px] font-bold leading-[28px] text-[#4B70F5] sm:text-[40px] lg:text-[64px] lg:leading-[48px]">
              1M
            </h2>
            <p className="tertiary-text">Students</p>
          </div>
          <div className="flex max-w-[301px] flex-col items-center gap-1 rounded-2xl border border-border px-4 py-8 md:gap-4 lg:gap-6 lg:px-8 lg:py-12">
            <h2 className="text-[28px] font-bold leading-[28px] text-[#4B70F5] sm:text-[40px] lg:text-[64px] lg:leading-[48px]">
              10
            </h2>
            <p className="tertiary-text">Countries </p>
          </div>
          <div className="flex max-w-[301px] flex-col items-center gap-1 rounded-2xl border border-border px-4 py-6 md:gap-4 lg:gap-6 lg:px-8 lg:py-12">
            <h2 className="text-[28px] font-bold leading-[28px] text-[#4B70F5] sm:text-[40px] lg:text-[64px] lg:leading-[48px]">
              2500
            </h2>
            <p className="tertiary-text">Educational partners</p>
          </div>
        </div>
      </div>
      <Educators />
      <div className="res-padding">
        <Impact />
      </div>
      <AccessPrivateQuestions />
    </div>
  );
};

export default page;

// const Profile = ({
//   image,
//   name,
//   department,
// }: {
//   image: StaticImageData;
//   name: string;
//   department: string;
// }) => (
//   <div className="mx-auto max-w-[400px]">
//     <Image src={image} alt="img" height={410} className="rounded-t-2xl" />
//     <div className="space-y-2 rounded-b-2xl bg-white px-8 py-6">
//       <p className="secondary-text font-bold">{name}</p>
//       <p className="font-[300]">{department}</p>
//     </div>
//   </div>
// );

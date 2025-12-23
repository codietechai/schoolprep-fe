import Button from '@/components/userui/components/common/Button';
import Input from '@/components/userui/components/common/Input';
import {
  CallIcon,
  ChatIcon,
  VisitIcon,
} from '@/components/userui/components/icons/contact-icons';
import Footer from '@/components/userui/layout/footer';
import FrequentQuestions from '@/components/userui/screen/home/frequent-questions';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    template: '%s | Test Prep',
    default: 'Contact Us',
  },
  description: 'kdkdk ddk ddkkd',
  openGraph: {
    title: 'Test Prep - Contact Us',
    description:
      'Contact us to prepare for your exams with the best resources and tools.',
    url: '/contact-us',
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
  const data = [
    {
      icon: <ChatIcon />,
      head: 'Chat to us',
      text: 'Our team is here to help.',
      contact: 'hi@email.com',
    },
    {
      icon: <VisitIcon />,
      head: 'Visit us',
      text: 'Come say hello at our office HQ',
      contact: 'hi@email.com',
    },
    {
      icon: <CallIcon />,
      head: 'Call us',
      text: 'Mon -Fri from 8am to 5pm',
      contact: '+1(555) 000-0000',
    },
  ];
  return (
    <div className=" text-[#253650]">
      <div className="responsive max-w-[1280px] pb-[60px] lg:pb-[120px]">
        <div className="res-padding text-center">
          <h1 className="main-head mb-2">Contact our team</h1>
          <p className="tertiary-text text-[#000]">
            Let us know how we can help.
          </p>
        </div>
        <div className="flex flex-col-reverse justify-center gap-10 lg:flex-row">
          <div className="flex flex-col items-center gap-8 md:flex-row lg:flex-col">
            {data.map((item, i) => (
              <div
                className="w-full rounded-xl border border-border px-4 py-4 sm:w-[431px] lg:px-8 lg:pb-12 lg:pt-[36.83px]"
                key={i}>
                <div className="mb-4 lg:mb-12">{item.icon}</div>
                <div className="">
                  <h3 className="text-[18px] font-bold leading-[20px] text-black lg:text-[24px] lg:leading-[26px]">
                    {item.head}
                  </h3>
                  <p className="mb-2 text-[16px] leading-[26px]">{item.text}</p>
                  <p className="text-[16px] font-[500] leading-[26px]">
                    {item.contact}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto w-full rounded-[24px] bg-background p-8 sm:p-16 lg:w-[809px]">
            <form className="flex flex-col gap-6">
              <h2 className="mb-4 text-[24px] font-[300] leading-[30px] text-black sm:w-[362px] sm:text-[28px] sm:leading-[40px] lg:text-[38px] lg:leading-[50px]">
                Get in touch with an expert. Talk with sales.
              </h2>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-[400] text-[#253650]">
                  Full name*
                </label>
                <Input />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-[400] text-[#253650]">
                  Phone number*
                </label>
                <Input />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-[400] text-[#253650]">
                  Email*
                </label>
                <Input />
              </div>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="" className="font-[400] text-[#253650]">
                  Description*
                </label>
                <textarea
                  name=""
                  id=""
                  className="h-[175px] w-full rounded-[8px] border border-border bg-white px-4 py-[13.5px]"></textarea>
              </div>
              <Button text="Submit" className="mt-2 bg-[#4B70F5] text-white" />
            </form>
          </div>
        </div>
      </div>
      <div className="bg-background">
        <FrequentQuestions />
      </div>
    </div>
  );
};

export default page;

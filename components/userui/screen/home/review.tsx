'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  ColonIcon,
  LeftIcon,
  RightIcon,
} from '@/components/userui/components/icons/icon';
import img from '../../components/images/home/image.webp';

const comment = [
  {
    comment:
      'The practice questions provided were exactly what I needed to pass my nursing exam. The detailed explanations helped me understand each concept thoroughly. Highly recommend to anyone preparing for their exams!',
    user: {
      name: 'Emily Johnson',
      image: img,
      destination: 'DNP, CRNA',
    },
  },
  {
    comment:
      'The ok report questions provided were exactly what I needed to pass my nursing exam. The detailed explanations helped me understand each concept thoroughly. Highly recommend to anyone preparing for their exams!',
    user: {
      name: 'Johnson',
      image: img,
      destination: 'DNP, CRNA',
    },
  },
  {
    comment:
      'The detailed explanations helped me understand each concept thoroughly. Highly recommend to anyone preparing for their exams!',
    user: {
      name: 'Emily',
      image: img,
      destination: 'DNP, CRNA',
    },
  },
];
const Review = () => {
  const screenWidth = window.innerWidth;
  let width = 63;
  if (screenWidth < 800) {
    width = 40;
  }
  const [count, setCount] = useState(0);
  return (
    <div className="responsive res-padding max-w-[1280px]">
      <div className="space-y-12">
        <div className="flex justify-between">
          <ColonIcon width={width} />
          <div className="flex gap-4">
            <div
              onClick={() => {
                if (count !== 0) {
                  setCount(count - 1);
                }
              }}
              className={`${
                count === 0
                  ? 'cursor-not-allowed bg-gray-100'
                  : 'cursor-pointer bg-white'
              } flex h-11 w-11 items-center justify-center rounded-full border border-[#e6e7e7]`}>
              <LeftIcon />
            </div>
            <div
              onClick={() => {
                if (comment.length - 1 !== count) {
                  setCount(count + 1);
                }
              }}
              className={`${
                comment.length - 1 === count
                  ? 'cursor-not-allowed bg-gray-100'
                  : 'cursor-pointer bg-white'
              } flex h-11 w-11 items-center justify-center rounded-full border border-[#e6e7e7]`}>
              <RightIcon />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <p className="max-w-[829px] text-[20px] font-[300] leading-[34px] text-black sm:text-[28px] lg:w-[829px] lg:text-[38px] lg:leading-[57.6px]">
            {comment[count].comment}
          </p>
          <div className="flex items-center gap-4 self-end">
            <div className="">
              <Image
                src={comment[count].user.image}
                alt="img"
                className="h-14 w-14 rounded-full"
              />
            </div>
            <div className="">
              <p className="text-black">{comment[count].user.name}</p>
              <p className="text-black">{comment[count].user.destination}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;

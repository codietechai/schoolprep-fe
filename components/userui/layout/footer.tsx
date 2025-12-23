import React from 'react';
import Button from '../components/common/Button';
import {
  AppStoreIcon,
  FaceBookIcon,
  InstagramIcon,
  LinkedInIcon,
  PlaystoreIcon,
  XIcon,
} from '../components/icons/icon';
import Image from 'next/image';
import img from '../components/images/footer/box.svg';
import Link from 'next/link';

const data = [
  {
    heading: 'Nursing',
    data: [
      { text: 'NCLEX-RN Step 1', link: '/nursing' },
      { text: 'NCLEX-RN Step 2', link: '/nursing' },
      { text: 'NCLEX-RN Step 3', link: '/nursing' },
    ],
  },
  {
    heading: 'Medical',
    data: [
      { text: 'USMLE Step 1', link: '/medical' },
      { text: 'USMLE Step 2', link: '/medical' },
      { text: 'USMLE Step 3', link: '/medical' },
    ],
  },
  {
    heading: 'Pharmacy',
    data: [
      { text: 'USMLE Step 1', link: '/pharmacy' },
      { text: 'USMLE Step 2', link: '/pharmacy' },
      { text: 'USMLE Step 3', link: '/pharmacy' },
    ],
  },
  {
    heading: 'Resources',
    data: [
      { text: 'About', link: '/about-us' },
      { text: 'Write for us', link: '/contact-us' },
    ],
  },
];
const Footer = () => {
  return (
    <div className="m-auto max-w-[1280px] px-4 pt-[60px] md:px-10 lg:pt-[120px] xl:px-0">
      <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-start lg:gap-[62px]">
        <p className="primary-text">
          Take charge of your career growth assess your skills today
        </p>
        <Button text="Buy Now" className="bg-[#4B70F5] text-white" />
      </div>
      <div className="footer-col-top mt-[100px] border-b border-b-[#e6e6e7]"></div>
      <div className="footer-col mb-[100px] mt-[100px] flex flex-col items-center gap-5 lg:flex-row lg:justify-between">
        <div className="space-y-[38px]">
          <Image src={img} alt="box" />
          <div className="flex gap-2">
            <LinkedInIcon />
            <InstagramIcon />
            <FaceBookIcon />
            <XIcon />
          </div>
        </div>
        <div className="footer-menu-col flex flex-col items-center gap-5 lg:flex-row lg:gap-[100px]">
          {data.map((item, i) => (
            <div
              className="space-y-5 text-center text-black lg:text-left"
              key={i}>
              <h3 className="text-base font-extrabold">{item.heading} </h3>
              <div className="space-y-[11.5px]">
                {item.data.map((item, i) => (
                  <Link
                    href={item.link}
                    className="block text-sm leading-[22px]"
                    key={i}>
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-[18px]">
          <AppStoreIcon />
          <PlaystoreIcon />
        </div>
      </div>
      <div className="space-y-4 text-xs leading-[22px] text-[#7f7f7f]">
        <p className="">
          At [Your Institution Name], we are committed to transforming aspiring
          individuals into world-class nursing professionals. Our mission is to
          nurture a culture of excellence, compassion, and innovation within the
          healthcare sector. With cutting-edge facilities, a curriculum designed
          by leading healthcare experts, and an unwavering focus on practical
          learning, we prepare students to tackle real-world challenges with
          confidence and skill. Our institution has been a trusted name in
          nursing education for years, fostering not just careers but a lifelong
          dedication to patient care and wellbeing.
        </p>
        <p className="">
          Choosing the right institution is the first step toward a successful
          career in nursing. At [Your Institution Name], we offer an unmatched
          blend of academic rigor and hands-on training. Our programs are
          designed to cater to both beginners and experienced professionals
          seeking to enhance their expertise. With over 10,000 graduates
          successfully placed in reputed healthcare organizations worldwide, we
          pride ourselves on our high job placement rates and industry
          recognition. Our faculty comprises seasoned professionals who bring a
          wealth of knowledge and practical insights to the classroom. We also
          provide state-of-the-art simulation labs, internships at leading
          hospitals, and a supportive learning environment that ensures our
          students achieve their fullest potential.
        </p>
        <p className="">
          Your journey toward a fulfilling career in nursing starts here.
          Whether you have questions about our courses, admission requirements,
          or available financial aid options, our dedicated team is ready to
          assist you. At [Your Institution Name], we believe in making quality
          education accessible to everyone. Reach out to us via phone, email, or
          visit our campus for a tour. Don’t miss the opportunity to be part of
          a community that is shaping the future of healthcare. Together, let’s
          build a healthier tomorrow!
        </p>
      </div>
      <div className="footer-gradient mt-10 h-[1px] w-full"></div>
      <div className="flex flex-col items-center justify-between gap-4  py-10 text-sm text-black md:flex-row">
        <div className="flex gap-6">
          <Link
            href={'/privacy-policy'}
            className="text-[14px] leading-[22px] text-black">
            Privacy Policy
          </Link>
          <Link
            href={'/terms-of-service'}
            className="text-[14px] leading-[22px] text-black">
            Terms of Service
          </Link>
          <Link
            href={'/cookie-policy'}
            className="text-[14px] leading-[22px] text-black">
            Cookie Policy
          </Link>
        </div>
        <p className="text-[14px] leading-[22px] text-[#818286]">
          © 2024. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

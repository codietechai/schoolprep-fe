import React from 'react';
import Item from '../../components/screen/home/featured-courses/Item';
import img1 from '@/components/userui/components/images/home/featured-courses/image1.webp';
import img2 from '@/components/userui/components/images/home/featured-courses/image2.webp';
import img3 from '@/components/userui/components/images/home/featured-courses/image3.webp';

const FeaturedCourses = () => {
  return (
    <section
      id="featured-courses"
      className="res-padding flex items-center justify-center space-y-[70px] bg-background">
      <div className="">
        <div className="m-auto mb-[40px] max-w-[1600px] space-y-4 px-4 text-center lg:mb-[70px] lg:px-0">
          <h2 className="heading">
            Discover <span className="text-[#4B70F5]">Featured Courses</span>{' '}
            for  Learning, Growth, & Success.
          </h2>
          <p className="sub-head">
            We elevate your craft with precise skill development, helping you
            stay ahead in your career.
          </p>
        </div>
        <div className="mx-4 grid w-fit max-w-[1280px] grid-cols-1 gap-10 md:mx-auto lg:mx-8 lg:grid-cols-3 xl:mx-0">
          <Item
            img={img1}
            head="Nursing"
            price="$2199"
            text="NCLEX-RN prep with our practice tests and exams."
          />
          <Item
            img={img2}
            head="Medical"
            price="$2199"
            text="Comprehensive USMLE prep with our practice tests and mock exams."
          />
          <Item
            img={img3}
            head="Nursing"
            price="$2199"
            text="NCLEX-RN prep with our practice tests and exams."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;

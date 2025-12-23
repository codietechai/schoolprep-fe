'use client';
import React, { useEffect } from 'react';
import Item from '../../components/screen/home/educators/Item';
import img1 from '@/components/userui/components/images/home/educators/image1.webp';
import img2 from '@/components/userui/components/images/home/educators/image2.webp';
import img3 from '@/components/userui/components/images/home/educators/image3.webp';

const data = [
  {
    name: 'Emily Carter',
    profession: 'Associate Professor of Nursing',
    img: img1,
  },
  {
    name: 'James Mitchell',
    profession: 'Clinical Nursing Instructor',
    img: img2,
  },
  {
    name: 'James Mitchell',
    profession: 'Clinical Nursing Instructor',
    img: img3,
  },
];

const Educators = ({ background }: { background?: 'dark' | 'light' }) => {
  return (
    <div className="">
      <div
        className={`res-padding ${background === 'dark' ? 'text-white' : ''}`}>
        <div className="m-auto mb-[40px] max-w-[1600px] space-y-4 px-4 text-center md:px-10 lg:mb-[70px]">
          <h2 className="heading">
            Top-notch educators provide you with all the knowledge you need to
            succeed.
          </h2>
          <p className="sub-head">Expert educators equip you for success.</p>
        </div>
        <div className=" lg:hidden">
          <div className="carousel carousel-center w-full space-x-4 p-4">
            {data.map((item, i) => (
              <div className="carousel-item w-60 sm:w-72" key={i}>
                <Item
                  img={item.img}
                  name={item.name}
                  profession={item.profession}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mx-4 hidden max-w-[1280px] grid-cols-3 gap-[100px] px-5 md:mx-auto lg:grid">
          {data.map((item, i) => (
            <Item
              img={item.img}
              name={item.name}
              profession={item.profession}
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Educators;

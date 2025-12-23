import React from 'react';
import Button from '../../../common/Button';
import Image, { StaticImageData } from 'next/image';
import SmallBtn from '../../../common/smallBtn';

const Item = ({
  head,
  text,
  price,
  onClick,
  img,
}: {
  head: string;
  text: string;
  price: string;
  onClick?: () => void;
  img: StaticImageData;
}) => {
  return (
    <div className="m-auto max-w-[500px] rounded-2xl">
      <Image src={img} alt="imf" className="rounded-t-2xl" />
      <div className="space-y-4 rounded-b-2xl bg-white px-4 py-4 sm:px-8 sm:py-6">
        <div className=" text-[#253650]">
          <p className="secondary-text mb-2 font-bold">{head}</p>
          <p className="">{text}</p>
        </div>
        <p className="font-bold text-[#253650]">{price}</p>
        <SmallBtn text="Learn more" type="secondary" className="w-full" />
      </div>
    </div>
  );
};

export default Item;

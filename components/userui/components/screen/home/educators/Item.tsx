import Image, { StaticImageData } from 'next/image';
import React from 'react';

const Item = ({
  name,
  profession,
  img,
}: {
  name: string;
  profession: string;
  img: StaticImageData;
}) => {
  return (
    <div className="m-auto min-w-[250px] space-y-6">
      <Image src={img} alt="img" height={473.474} width={383.49} />
      <div className="space-y-2 text-center">
        <p className="text-base font-[600] sm:text-[18px] sm:leading-[22px] lg:text-[22px] lg:leading-[22px]">
          {name}
        </p>
        <p className="text-base font-[300]">{profession}</p>
      </div>
    </div>
  );
};

export default Item;

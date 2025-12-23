import React from 'react';
import Button from '../../components/common/Button';
import { ListIcon } from '../../components/icons/icon';
import SmallBtn from '../../components/common/smallBtn';

const data = [
  {
    period: '1 Month',
    price: 30.0,
    features: [
      'Diagnostic tests',
      'Preparatory tests',
      'Subject wise performance tracking',
      'Detailed explanation',
    ],
  },
  {
    price: 90,
    period: '3 Month',
    features: [
      'Diagnostic tests',
      'Preparatory tests',
      'Subject wise performance tracking',
      'Detailed explanation',
    ],
    isPopular: true,
  },
  {
    price: 30.0,
    period: '12 Month',
    features: [
      'Diagnostic tests',
      'Preparatory tests',
      'Subject wise performance tracking',
      'Detailed explanation',
    ],
  },
];

const Subscription = () => {
  return (
    <div className="res-padding mx-4 grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-3 xl:mx-auto">
      {data.map((item, i) => (
        <Plan
          period={item.period}
          isPopular={item.isPopular}
          key={i}
          features={item.features}
          price={item.price}
        />
      ))}
    </div>
  );
};

const Plan = ({
  period,
  isPopular,
  features,
  price,
}: {
  period: string;
  isPopular?: boolean;
  features: string[];
  price: number;
}) => (
  <div
    className={`relative mx-auto max-w-[500px] space-y-8 rounded-2xl px-9 py-12 ${
      isPopular ? 'border-4 border-[#4B70F5]' : 'border border-border'
    }`}>
    <div className="">
      <h2
        className={`secondary-text mb-1 font-bold leading-[32px]  ${
          isPopular ? 'text-[#4B70F5]' : 'text-black'
        }`}>
        3 Month
      </h2>
      <p className="">
        Enjoy the first 7 days free, followed by a subscription of $75.00 every
        3 months
      </p>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-3xl text-border line-through lg:text-[38px]  lg:leading-[36px]">
        ${price}.00
      </span>
      <span className="rounded-full bg-[#4B70F5] px-4 py-[6px] text-white">
        30% OFF
      </span>
    </div>
    <div className="flex items-end gap-2">
      <span
        className="text-[40px] font-bold leading-[34px] text-black lg:text-[64px] lg:leading-[48px]
      ">
        {(price * 70) / 100}.00
      </span>
      <span className="text-3xl font-bold text-border lg:text-[38px] lg:leading-[36px]">
        /mo
      </span>
    </div>
    <div className="border-b border-b-border"></div>
    <div className="space-y-2">
      {features.map((item, i) => (
        <div className="flex items-center gap-1" key={i}>
          <ListIcon />
          <span className="">{item}</span>
        </div>
      ))}
    </div>
    <SmallBtn
      text="START YOUR FREE TRAIL"
      type="secondary"
      className="w-full"
      style={{ lineHeight: '16px' }}
    />
    {isPopular ? (
      <div className="absolute -top-9 right-8 rounded-b-[4px] bg-[#4B70F5] px-4 py-[6px] text-white">
        Popular
      </div>
    ) : null}
  </div>
);
export default Subscription;

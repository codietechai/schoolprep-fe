'use client';
import React, { useEffect, useRef, useState } from 'react';
import { DownTriangleIcon } from '../icons/icon';
import Link from 'next/link';

const Dropdown = ({
  trigger,
  data,
  open,
  setOpen,
}: {
  trigger: string;
  data: { text: string; link: string }[];
  open: string;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="relative inline-block text-left">
      <div>
        <div
          role="button"
          className="nav-item flex items-center gap-[10px]"
          onClick={() => {
            if (open === trigger) setOpen('');
            else setOpen(trigger);
          }}>
          <span className="">{trigger}</span>
          <div className={open === trigger ? `rotate-180` : ''}>
            <DownTriangleIcon />
          </div>
        </div>
      </div>

      {open === trigger && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}>
          <div className="py-1" role="none">
            {data.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                role="menuitem"
                onClick={() => setOpen('')}>
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

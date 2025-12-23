'use client';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import NavbarIcon from '../components/common/responsive-navbat/navbar-icon';
import Dropdown from '../components/common/Dropdown';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';

const Navbar = () => {
  const [open, setOpen] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const userSession = useSelector((state: IRootState) => state.auth);
  const isLoggedIn = userSession?.user?.user?.id;
  // Disable clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpen('');
        event.stopPropagation();
        event.preventDefault();
      }
    };

    if (open) {
      document.addEventListener('click', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [open]);
  return (
    <div className="border-b border-b-[#E5E5E5] px-4 py-6 text-[#253650] xl:px-0">
      <div className="m-auto flex max-w-[1280px] items-center justify-between">
        <div className="">
          <Link href={'/'} className="text-[28px] font-bold leading-7">
            Logo
          </Link>
        </div>
        <div className="hidden items-center gap-[21px] lg:flex">
          <div className="flex gap-5" ref={modalRef}>
            <Dropdown
              trigger="Nursing"
              data={[{ text: 'Course Detail', link: '/nursing' }]}
              open={open}
              setOpen={setOpen}
            />
            <Dropdown
              trigger="Medical"
              data={[{ text: 'Course Detail', link: '/medical' }]}
              open={open}
              setOpen={setOpen}
            />
            <Dropdown
              trigger="Pharmacy"
              data={[{ text: 'Course Detail', link: '/pharmacy' }]}
              open={open}
              setOpen={setOpen}
            />
            <Link href={'/about-us'} className="nav-item">
              About
            </Link>
            <Link href={'/contact-us'} className="nav-item">
              Write for us
            </Link>
          </div>
          {isLoggedIn ? (
            <a
              className={`rounded-lg border border-[#4B70F5] px-4 py-3 text-base leading-[16px] text-[#4B70F5] hover:bg-[#4b70f5] hover:text-white`}
              href={'/portal/dashboard'}>
              Dashboard
            </a>
          ) : (
            <a
              className={`rounded-lg border border-[#4B70F5] px-4 py-3 text-base leading-[16px] text-[#4B70F5] hover:bg-[#4b70f5] hover:text-white`}
              href={'/auth/signin'}>
              LOGIN
            </a>
          )}
        </div>
        <NavbarIcon isLoggedIn={!!isLoggedIn} />
      </div>
    </div>
  );
};

export default Navbar;

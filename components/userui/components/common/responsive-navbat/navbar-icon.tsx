'use client';
import { AnimatePresence, Variants, motion } from 'motion/react';
import React, { useState } from 'react';
// import { IoHomeSharp } from "react-icons/io5";
// import { MdMiscellaneousServices } from "react-icons/md";
import { useRouter } from 'next/navigation';
import IconAward from '@/components/icon/icon-award';
import { DownTriangleIcon } from '../../icons/icon';
// import { FaChessKing } from "react-icons/fa";
// import { IoMdContact } from "react-icons/io";

const NavbarIcon = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [open, setOpen] = useState('');
  const router = useRouter();
  const navbarData = [
    {
      id: 2,
      content: 'Nursing',
      icon: <IconAward />,
      subMenu: [
        {
          content: 'Course Detail',
          icon: <IconAward />,
          onClick: () => router.push('/nursing'),
        },
        {
          content: 'Course Detail',
          icon: <IconAward />,
          onClick: () => router.push('/nursing'),
        },
        {
          content: 'Course Detail',
          icon: <IconAward />,
          onClick: () => router.push('/nursing'),
        },
      ],
    },
    {
      id: 3,
      content: 'Medical',
      icon: <IconAward />,
      // onClick: () => router.push('/medical'),
      subMenu: [
        {
          content: 'Course Detail',
          icon: <IconAward />,
          onClick: () => router.push('/medical'),
        },
      ],
    },
    {
      id: 4,
      content: 'Pharmacy',
      icon: <IconAward />,
      // onClick: () => router.push('/pharmacy'),
      subMenu: [
        {
          content: 'Course Detail',
          icon: <IconAward />,
          onClick: () => router.push('/pharmacy'),
        },
      ],
    },
    {
      id: 5,
      content: 'About Us',
      icon: <IconAward />,
      onClick: () => router.push('/about-us'),
    },
    {
      id: 6,
      content: 'Write for us',
      icon: <IconAward />,
      onClick: () => router.push('/contact-us'),
    },
    {
      id: 7,
      content: isLoggedIn ? 'Dashboard' : 'Login',
      icon: <IconAward />,
      onClick: () =>
        router.push(isLoggedIn ? '/portal/dashboard' : '/auth/signin'),
    },
  ];
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => {
    setNavOpen(!navOpen);
    setOpen('');
  };

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: 'circle(20px at calc(100% - 42px) 43px)',
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };
  const Path = (props: any) => (
    <motion.path
      fill="transparent"
      strokeWidth="2"
      stroke="#000000"
      strokeLinecap="round"
      {...props}
    />
  );
  return (
    <>
      <AnimatePresence>
        <motion.nav
          className={`z-20 lg:hidden  ${
            navOpen ? 'fixed right-0 top-0' : 'absolute right-0 top-0'
          }`}
          initial={false}
          animate={navOpen ? 'open' : 'closed'}>
          <motion.div
            variants={sidebar}
            className="absolute right-0 z-30 h-screen w-80 bg-[#4B70F5] bg-opacity-10 bg-clip-padding backdrop-blur-lg backdrop-filter"
          />
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={toggleNav}
            className="absolute right-[30px] top-[35px] z-50 ">
            <svg width="23" height="23" viewBox="0 0 23 23">
              <Path
                variants={{
                  closed: { d: 'M 2 2.5 L 20 2.5' },
                  open: { d: 'M 3 16.5 L 17 2.5' },
                }}
              />
              <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
              />
              <Path
                variants={{
                  closed: { d: 'M 2 16.346 L 20 16.346' },
                  open: { d: 'M 3 2.5 L 17 16.346' },
                }}
              />
            </svg>
          </motion.button>
          <motion.ul
            variants={{
              open: {
                transition: { staggerChildren: 0.07, delayChildren: 0.2 },
              },
              closed: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 },
              },
            }}
            className={`absolute right-24 top-10 z-40 h-screen pt-10 lg:hidden`}
            style={{ pointerEvents: navOpen ? 'auto' : 'none' }}>
            {navbarData.map(item => (
              <Item
                item={item}
                key={item.id}
                toggleNav={toggleNav}
                open={open}
                setOpen={setOpen}
              />
              // <motion.li
              //   key={item.id}
              //   variants={liVariants}
              //   whileHover={{ scale: 1.1 }}
              //   whileTap={{ scale: 0.95 }}
              //   onClick={() => {
              //     if (item.onClick) {
              //       item.onClick();
              //     }
              //   }}
              //   className="">
              //   <div className="flex cursor-pointer items-center gap-5 px-2 py-5 text-xl text-black">
              //     <span
              //       onClick={toggleNav}
              //       className="rounded-full bg-white p-2">
              //       {item.icon}
              //     </span>{' '}
              //     <span onClick={toggleNav} className="text-[#253650]">
              //       {item.content}
              //     </span>
              //   </div>
              // </motion.li>
            ))}
          </motion.ul>
        </motion.nav>
      </AnimatePresence>
    </>
  );
};

export default NavbarIcon;

const Item = ({
  item,
  toggleNav,
  open,
  setOpen,
}: {
  item: any;
  toggleNav: () => void;
  open: string;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const liVariants: Variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };
  return (
    <div className="">
      <motion.li
        variants={liVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (item.onClick) {
            item.onClick();
            toggleNav();
          }
          if (item.subMenu) {
            setOpen(item.content);
          }
        }}
        className="">
        <div className="flex cursor-pointer items-center gap-5 px-2 py-3 text-xl text-black">
          <span
            // onClick={toggleNav}
            className="rounded-full bg-white p-2">
            {item.icon}
          </span>{' '}
          <span className="text-[#253650]">{item.content}</span>
          {item?.subMenu && (
            <div className={open === item.content ? 'rotate-180' : ''}>
              <DownTriangleIcon />
            </div>
          )}
        </div>
      </motion.li>
      {open === item.content &&
        item?.subMenu.map((subItem: any, i: number) => (
          <p
            key={i}
            onClick={() => {
              subItem.onClick();
              toggleNav();
            }}
            className="cursor-pointer pb-2 pl-20 hover:text-black">
            {subItem.content}
          </p>
        ))}
    </div>
  );
};

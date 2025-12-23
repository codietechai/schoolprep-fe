'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from 'react-query';
import Image from 'next/image';
import Link from 'next/link';
import { IRootState } from '@/store';
import { toggleSidebar } from '@/store/themeConfigSlice';
import Dropdown from '@/components/dropdown';
import IconMenu from '@/components/icon/icon-menu';
import IconUser from '@/components/icon/icon-user';
import IconLogout from '@/components/icon/icon-logout';
import { usePathname, useRouter } from 'next/navigation';
import { useCourseId, useSession } from '@/hooks';
import ExamModal from '../startexam';
import {
  FETCH_COURSES_KEY,
  fetchCourses,
  logoutRequest,
  TAddCourse,
} from '@/client/endpoints';
import { useForm } from 'react-hook-form';
import { TQueryData } from '@/types';
import { DEFAULT_QUERY } from '@/constants';
import { clsx } from '@mantine/core';
import Select, { components } from 'react-select';
import { showDeleteConfirmation } from '@/utils';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { logout, session } = useSession();
  const [queryData, setQueryData] = useState<TQueryData>(DEFAULT_QUERY);
  const [selectedCourse, setSelectedCourse] = useState<{}>('');
  const {
    control,
    formState: { errors },
  } = useForm();
  const params = usePathname();

  const { data: courses, refetch } = useQuery(
    [FETCH_COURSES_KEY, queryData],
    () => fetchCourses(queryData),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: res => {
      },
    },
  );

  const { mutate: logoutUser } = useMutation(logoutRequest, {
    onSuccess: res => {
      logout();
    },
    onError: err => {},
  });

  useEffect(() => {
    const selector = document.querySelector(
      'ul.horizontal-menu a[href="' + window.location.pathname + '"]',
    );
    if (selector) {
      const all: any = document.querySelectorAll(
        'ul.horizontal-menu .nav-link.active',
      );
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove('active');
      }

      let allLinks = document.querySelectorAll('ul.horizontal-menu a.active');
      for (let i = 0; i < allLinks.length; i++) {
        const element = allLinks[i];
        element?.classList.remove('active');
      }
      selector?.classList.add('active');

      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele?.classList.add('active');
          });
        }
      }
    }
  }, [pathname]);

  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  const handleLogout = () => {
    logoutUser();
  };

  useEffect(() => {
    if (courses?.data && courses?.data?.length > 0) {
      const data: { value: string; label: string }[] = courses?.data.map(
        (item: { _id: string; name: string }) => {
          return { value: item?._id, label: item?.name };
        },
      );
      setSelectedCourse(data[0]);
      useCourseId.getState().setCourseId(data[0].value);
    }
  }, [courses?.data]);

  return (
    <header
    // className={`z-40 ${
    //   themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''
    // }`}
    >
      <div className="">
        <div className="relative flex w-full items-center px-5 py-6 dark:bg-black">
          <div className="horizontal-logo flex items-center justify-between lg:hidden ltr:mr-2 rtl:ml-2">
            <Link href="/" className="main-logo flex shrink-0 items-center">
              {/* <img
                className="inline w-8 ltr:-ml-1 rtl:-mr-1"
                src="/assets/images/logo.svg"
                alt="logo"
              /> */}
              <span className="hidden align-middle text-2xl  font-semibold  transition-all duration-300 dark:text-white-light md:inline ltr:ml-1.5 rtl:mr-1.5">
                Logo
              </span>
            </Link>
            <button
              type="button"
              className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden ltr:ml-2 rtl:mr-2"
              onClick={() => dispatch(toggleSidebar())}>
              <IconMenu className="h-5 w-5" />
            </button>
          </div>
          {session?.user?.role?.name === 'Student' ? (
            <div className="">
              <Select
                onChange={async (option: any) => {
                  const data = await showDeleteConfirmation(
                    'Changing course will refresh the changes which are not saved yet, do you still want to change course?',
                  );
                  if (data?.isConfirmed) {
                    setSelectedCourse(option);
                    useCourseId.getState().setCourseId(option.value);
                    // router.push(`?courseId=${option.value}`);
                  }
                }}
                value={selectedCourse}
                options={
                  courses?.data
                    ? courses?.data.map(
                        (item: { _id: string; name: string }) => {
                          return { value: item?._id, label: item?.name };
                        },
                      )
                    : []
                }
                // value={courses?.data.find(option => option?.value === value)}
                classNames={{
                  control: (state: any) =>
                    clsx(
                      'hover:!border-[#BBBFD1] text-[#838AA9] !border-border',
                      'hover:focus-within:!border-[#a93030] focus-within:!border-[#2B3E9B] focus-within:text-[#151F4E]',
                      'text-sm font-semibold !rounded-[6px] border-[1px] p-[3px]',
                      'w-[198px]',
                    ),
                  indicatorSeparator: () => 'hidden',
                  indicatorsContainer: () => 'cursor-pointer',
                  menu: () => '!bg-[#F3F4F9]',
                  singleValue: () => '!text-[currentColor]',
                  option: (state: any) => {
                    return clsx(
                      '!text-[#151F4E] hover:!bg-[#2B3E9B] hover:!text-white !bg-transparent',
                    );
                  },
                }}
              />
            </div>
          ) : (
            <h2 className="text-2xl font-semibold">
              Hi, {session?.user?.role?.name}
            </h2>
          )}
          <div className="flex items-center space-x-1.5 dark:text-[#d0d2d6] sm:flex-1 lg:space-x-2 ltr:ml-auto ltr:sm:ml-0 rtl:mr-auto rtl:space-x-reverse sm:rtl:mr-0">
            <div className="sm:ltr:mr-auto sm:rtl:ml-auto"></div>
            {/* {session?.user?.role?.name === 'Student' ? (
              <div>
                <ExamModal />
              </div>
            ) : null} */}

            {/* <span className="cursor-pointer">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_811_560)">
                  <path
                    d="M16.25 29.125C17.6938 29.125 18.875 27.9438 18.875 26.5H13.625C13.625 27.9438 14.8062 29.125 16.25 29.125ZM24.125 21.25V14.6875C24.125 10.6581 21.9856 7.285 18.2188 6.3925V5.5C18.2188 4.41063 17.3394 3.53125 16.25 3.53125C15.1606 3.53125 14.2812 4.41063 14.2812 5.5V6.3925C10.5275 7.285 8.375 10.645 8.375 14.6875V21.25L5.75 23.875V25.1875H26.75V23.875L24.125 21.25ZM21.5 22.5625H11V14.6875C11 11.4325 12.9819 8.78125 16.25 8.78125C19.5181 8.78125 21.5 11.4325 21.5 14.6875V22.5625Z"
                    fill="#7C8696"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_811_560">
                    <rect
                      width="31.5"
                      height="31.5"
                      fill="white"
                      transform="translate(0.5 0.25)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span> */}
            <div
              className="dropdown header-dropdown flex shrink-0"
              style={{ marginLeft: 20 }}>
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="relative group block"
                button={
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_811_565)">
                      <path
                        d="M16 7.99375C17.5225 7.99375 18.7563 9.2275 18.7563 10.75C18.7563 12.2725 17.5225 13.5063 16 13.5063C14.4775 13.5063 13.2437 12.2725 13.2437 10.75C13.2437 9.2275 14.4775 7.99375 16 7.99375ZM16 19.8062C19.8981 19.8062 24.0063 21.7225 24.0063 22.5625V24.0063H7.99375V22.5625C7.99375 21.7225 12.1019 19.8062 16 19.8062ZM16 5.5C13.0994 5.5 10.75 7.84938 10.75 10.75C10.75 13.6506 13.0994 16 16 16C18.9006 16 21.25 13.6506 21.25 10.75C21.25 7.84938 18.9006 5.5 16 5.5ZM16 17.3125C12.4956 17.3125 5.5 19.0712 5.5 22.5625V26.5H26.5V22.5625C26.5 19.0712 19.5044 17.3125 16 17.3125Z"
                        fill="#7C8696"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_811_565">
                        <rect
                          width="31.5"
                          height="31.5"
                          fill="white"
                          transform="translate(0.25 0.25)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                }>
                <ul className="w-[310px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      <Image
                        src="/assets/images/default-user.jpg"
                        alt="img"
                        className="rounded-full"
                        height={40}
                        width={40}
                      />
                      <div className="truncate ltr:pl-4 rtl:pr-4">
                        <h4 className="text-base">
                          {session?.user.full_name ?? ''}
                        </h4>
                        <p
                          title={
                            (session?.user?.email?.length as number) > 22
                              ? session?.user?.email
                              : ''
                          }
                          className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                          {session?.user?.email.slice(0, 22) ?? ''}{' '}
                          {(session?.user?.email?.length as number) > 22 &&
                            '...'}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link href="/portal/profile" className="dark:hover:text-white">
                      <IconUser className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                      Profile
                    </Link>
                  </li>
                  <li className="border-t border-white-light dark:border-white-light/10">
                    <span
                      className="flex cursor-pointer !py-3 px-4 text-danger"
                      onClick={handleLogout}>
                      <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90 ltr:mr-2 rtl:ml-2" />
                      Sign Out
                    </span>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

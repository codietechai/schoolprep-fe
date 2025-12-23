'use client';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { useLayoutEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCourseSingle } from '@/client/endpoints';
import { LINKS } from '@/constants';

export default function CourseCrumb({
  locationBoardData,
}: {
  locationBoardData?: {
    name: string;
    link: string;
  }[];
}) {
  const [data, setData] = useState<
    {
      name: string;
      link: string;
    }[]
  >(locationBoardData || []);
  const { id, courseid } = useParams();
  const pathname = usePathname();

  const { data: courseData } = useQuery(
    ['course', courseid ? courseid : id],
    () => fetchCourseSingle(courseid ? (courseid as string) : (id as string)),
    {
      enabled: courseid || id ? true : false,
      retry: 0,
      refetchOnWindowFocus: false,
    },
  );

  useLayoutEffect(() => {
    if (locationBoardData) return;
    let pathName = window.location.pathname;
    let pathNameArr = pathName.split('/');
    id && pathNameArr.pop();

    let d = [
      {
        name: 'Courses',
        link: LINKS.courses.route,
      },
      {
        name: courseData && courseData?.name ? `${courseData?.name} plans` : '',
        link:
          !pathname?.includes('add') && !pathname?.includes('edit')
            ? ''
            : LINKS.plans.route(
                courseid ? (courseid as string) : (id as string),
              ),
      },
    ];

    if (pathname?.includes('add')) {
      d.push({
        name: 'Add',
        link: '',
      });
    } else if (pathname?.includes('edit')) {
      d.push({
        name: 'Edit',
        link: '',
      });
    }

    setData(d);
  }, [locationBoardData, courseData]);

  return (
    <ul className="mb-5 flex space-x-2 rtl:space-x-reverse">
      {data.map((item, index) => (
        <>
          {index !== 0 && <span>/</span>}
          <li key={index}>
            {item.link ? (
              <Link
                href={item.link}
                className="capitalize text-primary hover:underline">
                {item.name}
              </Link>
            ) : (
              <span className="capitalize">{item.name}</span>
            )}
          </li>
        </>
      ))}
    </ul>
  );
}

import { TrashList } from "@/components/admins";
import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { LINKS } from "@/constants";

export const metadata: Metadata = {
  title: "Admins",
};

const Admins = () => {
  return (
    <div className='app-panel'>
      <ul className="flex space-x-2 rtl:space-x-reverse mb-4">
        <li>
          <Link
            href={LINKS.admins.route}
            className="text-primary hover:underline"
          >
            Admins
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Trash</span>
        </li>
      </ul>
      <TrashList />
    </div>
  );
};

export default Admins;

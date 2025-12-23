import { EditForm } from "@/components/admins";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { LINKS } from "@/constants";

export const metadata: Metadata = {
  title: "Edit Admin",
};

const EditAdmin = () => {
  return (
    <div className='app-panel'>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link
            href={LINKS.admins.route}
            className="text-primary hover:underline"
          >
            Admins
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Edit</span>
        </li>
      </ul>
      <EditForm />
    </div>
  );
};

export default EditAdmin;

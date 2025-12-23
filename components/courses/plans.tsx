'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Textarea, ErrorMessage } from '@/components/common';
import { addCategorySchema } from '@/validations';
import { showDeleteConfirmation, showMessage } from '@/utils';
import {
  fetchCategorySingle,
  editCategoryRequest,
  fetchCategories,
  FETCH_CATEGORIES_KEY,
} from '@/client/endpoints';
import { LINKS, DEFAULT_QUERY } from '@/constants';
import ImageSelect, { ImageProps } from '../plan-pricing/image-select';
import SelectInput from '../plan-pricing/inputSelect';

type TEditCategory = {
  name: string;
  description?: string;
  active: string;
  image?: string;
  image_data?: string;
};

export const PlanCourseForm = () => {
  const { id } = useParams();
  const router = useRouter();




  const plans = [
    {
      id: "starter",
      title: "Starter",
      price: "$50",
      features: [
        "10 signals per month",
        "3 algorithms can be used",
        "5 charts",
        "2 active charts",
        "No additional signals",
      ],
    },
    {
      id: "professional",
      title: "Professional",
      price: "$100",
      features: [
        "25 signals per month",
        "5 algorithms can be used",
        "10 charts",
        "5 active charts",
        "No additional signals",
      ],
    },
    {
      id: "premium",
      title: "Premium",
      price: "$150",
      features: [
        "100 signals per month",
        "100 algorithms can be used",
        "20 charts",
        "20 active charts",
        "Additional signals add-ons",
      ],
    },
  ];
  return (
    <div className="pt-5">
      <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
        <h6 className="mb-5 text-lg font-bold">Plans </h6>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold my-6">Plan Pricing</h1>
          <div className="flex flex-wrap gap-6 justify-center">
            {plans.map((plan) => (
              <div
                key={plan.title}
                className="border rounded-lg shadow-lg p-6 w-80 bg-white"
              >
                <div className="flex items-center mb-4">
                  <span className="text-green-600 font-semibold px-2 py-1 bg-green-100 rounded-full">
                    Active
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
                <p className="text-3xl text-blue-600 font-bold mb-4">
                  {plan.price} <span className="text-sm">/ monthly</span>
                </p>
                <ul className="mb-4 text-gray-600">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="mb-1">
                      → {feature}
                    </li>
                  ))}
                </ul>
                <button
                  // onClick={() => router.push(`/courses/plan/${plan.id}`)}
                  onClick={() => router.push(LINKS.courses.edit(plan.id))}
                  className="w-full text-blue-500 border rounded-md py-2 hover:bg-blue-500 hover:text-white transition"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlanCourseForm;

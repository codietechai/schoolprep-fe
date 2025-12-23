'use client';
import React, { useEffect } from 'react';
import InputField from './input-field';
import ToggleInput from './toggle-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { planSchema } from '@/validations/plan-pricing';
import { useMutation, useQuery } from 'react-query';
import {
  ADD_PLAN_KEY,
  addPlanRequest,
  editPlanRequest,
} from '@/client/endpoints';
import { AlgorithmProps } from '@/types';
import { DevTool } from '@hookform/devtools';
import { useParams, useRouter } from 'next/navigation';
import { useContainerLoader } from '@/hooks';
import { showMessage } from '@/utils';
import { TQueryData } from '@/types';
import SelectInput from './inputSelect';
import { DEFAULT_QUERY } from '@/constants';

export default function PricingForm() {
  const defaultQuery: TQueryData = DEFAULT_QUERY;
  interface OptionProps {
    value: string;
    label: string;
  }

  const [options, setOptions] = React.useState<OptionProps[]>([]);

  const { id } = useParams();
  const router = useRouter();
  const { setShowLoader } = useContainerLoader();

  const plan = null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: plan as any,
    resolver: yupResolver(planSchema),
  });

  const { mutate: addNewPlan } = useMutation(addPlanRequest, {
    onSuccess: res => {
      router.push('/plan-pricing');
      showMessage(res.data.message);
    },
    onSettled: () => {
      setShowLoader(false);
    },
  });

  const { mutate: editAlgorithm } = useMutation(editPlanRequest, {
    onSuccess: res => {
      router.push('/plan-pricing');
      showMessage(res.data.message);
    },
    onSettled: () => {
      setShowLoader(false);
    },
  });

  const onSubmit = (data: any) => {
    setShowLoader(true);
    // if (plan && plan?.id) {
    //   editAlgorithm({
    //     ...data,
    //     id: plan?.id,
    //   });
    // } else {
    //   addNewPlan(data);
    // }
  };

  // useEffect(() => {
  //   if (plan && plan?.id) {
  //     const ids = plan?.algorithmIds?.map(value => value.toString());
  //     reset({
  //       ...plan,
  //       algorithmIds: ids,
  //     });
  //   }
  // }, [plan]);

  return (
    <div className="w-full  rounded-lg  bg-white  p-4">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <InputField
            label="Plan Name"
            placeholder="Enter Plan Name"
            type="text"
            register={register('name')}
            error={errors.name?.message}
          />
          <InputField
            label="Amount"
            placeholder="Enter Amout"
            type="text"
            starting="$"
            register={register('amount')}
            error={errors.amount?.message}
          />

          <SelectInput
            control={control}
            label="Plan Duration"
            name="duration"
            options={[{ value: 'monthly', label: 'Monthly' }]}
            errorText={errors.duration?.message as string}
          />

          <InputField
            label="Signals Available"
            placeholder="Enter no."
            type="text"
            register={register('signal_allowed')}
            error={errors.signal_allowed?.message}
          />

          <InputField
            label="Signals Available For Free Trial"
            placeholder="Enter no."
            type="text"
            register={register('signal_allowed_for_free_trial')}
            error={errors.signal_allowed_for_free_trial?.message}
          />

          <InputField
            label="Algorithm can be used"
            placeholder="unlimited"
            type="text"
            register={register('algorithm_allowed')}
            error={errors.algorithm_allowed?.message}
          />
          <InputField
            label="No of charts available"
            placeholder="Enter no."
            type="text"
            register={register('chart_allowed')}
            error={errors.chart_allowed?.message}
          />
          <InputField
            label="No of active charts available"
            placeholder="Enter no."
            type="text"
            register={register('active_chart_allowed')}
            error={errors.active_chart_allowed?.message}
          />

          <SelectInput
            control={control}
            label="Avaliable Algorithms"
            name="algorithmIds"
            options={options}
            isMulti
            errorText={errors.algorithmIds?.message as string}
          />

          <SelectInput
            label="Status"
            control={control}
            name="status"
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
            errorText={errors.status?.message as string}
          />
          <ToggleInput
            label="Additional signals"
            register={register('additional_signal_allowed')}
            error={errors.additional_signal_allowed?.message}
          />
          <ToggleInput
            label="Signal rollover allowed"
            register={register('is_rollover_allowed')}
            error={errors.is_rollover_allowed?.message}
          />
          <InputField
            label="Paypal Trial Plan Id"
            type="text"
            register={register('paypal_trial_id')}
            error={errors.paypal_trial_id?.message}
          />
          <InputField
            label="Paypal Premium Plan Id"
            type="text"
            register={register('paypal_regular_id')}
            error={errors.paypal_regular_id?.message}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-6">
          {id ? 'Save' : 'Add'}
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

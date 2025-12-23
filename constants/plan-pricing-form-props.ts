export interface PlanPricingFormProps {
  name: string;
  amount: string;
  duration: string;
  signal_allowed: string;
  algorithm_allowed: string;
  chart_allowed: string;
  active_chart_allowed: string;
  additional_signal_allowed: boolean;
  is_rollover_allowed: boolean;
  status: string;
  algorithmIds: string[];
  paypal_plan_id?: string;
}

export interface PlanProps extends PlanPricingFormProps {
  id: string;
}

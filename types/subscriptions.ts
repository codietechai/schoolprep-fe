export type TSubscription = {
  id: number;
  user_id: number;
  plan_id: number;
  card_id: number;
  active: string;
  type: string;
  total: string;
  plan_name: string;
  time_limit: string;
  time_type: string;
  plan_amount: string;
  plan_details: string;
  expiry_date: Date;
  subscribed_at: Date;
  unsubscribed_at: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

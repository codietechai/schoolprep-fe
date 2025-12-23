export type TTopics = {
  _id: string;
  title: string;
  status: number;
  description: string;
  icon?: string;
  subject?: any;
  questions: string[];
};

export type TAddTopics = {
  id: number;
  title: string;
  description: string;
  status: number | string;
  icon?: string;
  icon_data?: string;
  parent_topic?: string;
};

export type TEditTopics = {
  id?: string;
  title: string;
  description: string;
  status: number | string;
  icon: string;
  icon_data: string;
  parent_topic?: string;
};

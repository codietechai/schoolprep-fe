export type TAlgorithm = {
  id: number;
  name: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
};

export type AlgorithmProps = {
  id?: number;
  name: string;
  uri?: string;
  description: string;
  image?: string;
  imageData?: string;
  otherImages?: string[];
  otherImagesData?: string[];
  categoryIds: string[] | number[];
  status: string;
  removeImageIds?: number[];
  deletedAt?: Date;
  indicator_id: any;
  stop_loss_start: string;
  stop_loss_end: string;
  stop_loss_step: string;
  stop_loss_default: string;
  take_profit_start: string;
  take_profit_end: string;
  take_profit_step: string;
  take_profit_default: string;
  is_short_long_term: string;
  indicator_labels?: string;
};


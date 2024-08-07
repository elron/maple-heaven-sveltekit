import { PriceName } from "../enums/price-label.enum";

export type Item = {
  task_id: string;
  client_thumbprint: string;
  search_item_timestamp: Date;
  search_item: string;
  search_results: number;
  search_results_captured: number;
  sum_bundle: number;
  num_outlier: number;
  percent_complete: number;
  n_owled: number;
} & Record<keyof typeof PriceName, number>
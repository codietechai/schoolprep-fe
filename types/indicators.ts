export type TIndicator = {
    id?: number;
    name: string;
    time_period_start: string;
    time_period_end: string;
    time_period_step: string;
    time_period_default: string;
    overbought_threshold_start: string;
    overbought_threshold_end: string;
    overbought_threshold_step: string;
    overbought_threshold_default: string;
    oversold_threshold_start: string;
    oversold_threshold_end: string;
    oversold_threshold_step: string;
    oversold_threshold_default: string;
    intervals: any;
    default_interval: string;
    createdAt?: Date;
    updatedAt?: Date;
}
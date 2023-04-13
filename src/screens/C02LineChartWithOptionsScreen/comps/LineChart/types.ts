import { ScaleTime } from 'd3';

export type TimeSeriesDatum = { date: Date; value: number };
export type TimeSeries = {
  data: TimeSeriesDatum[];
};

export type AxisOptions<Scale, Value> = {
  enabled?: boolean;

  x?: number;
  y?: number;

  lineColor?: string;
  lineWidth?: number;

  showTicks?: boolean;
  ticks?: Date[] | ((scale: Scale) => Date[]);

  tickLength?: number;
  tickWidth?: number;
  tickColor?: string;

  tickLabelSize?: number;
  tickLabelFont?: string;
  tickLabelColor?: string;
  tickLabelFormatter?: (value: Value) => string;
};
export type TimeAxisOptions = AxisOptions<
  ScaleTime<number, number, never>,
  Date
>;

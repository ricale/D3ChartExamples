import { ScaleLinear, ScaleTime } from 'd3';
import { FontWeight } from 'react-native-svg';

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
  ticks?: Value[] | ((scale: Scale) => Value[]);

  tickLength?: number;
  tickWidth?: number;
  tickColor?: string;

  tickLabelSize?: number;
  tickLabelFont?: string;
  tickLabelWeight?: FontWeight;
  tickLabelColor?: string;
  tickLabelFormatter?: (value: Value) => string;
};
export type TimeAxisOptions = AxisOptions<
  ScaleTime<number, number, never>,
  Date
>;
export type LinearAxisOptions = AxisOptions<
  ScaleLinear<number, number, never>,
  number
>;

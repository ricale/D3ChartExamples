import { ScaleLinear, ScaleTime } from 'd3';
import { FontWeight } from 'react-native-svg';

export type TimeSeriesDatum = { date: Date; value: number };
export type TimeSeries = {
  name?: string;
  color?: string;
  lineWidth?: number;
  visible?: boolean;
  data: TimeSeriesDatum[];
};

export type SelectedItem = TimeSeriesDatum & { seriesIndex: number };

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

  showGridLines?: boolean;
  gridLineWidth?: number;
  gridLineColor?: string;
};
export type TimeAxisOptions = AxisOptions<
  ScaleTime<number, number, never>,
  Date
>;
export type LinearAxisOptions = AxisOptions<
  ScaleLinear<number, number, never>,
  number
>;

export type LinesOptions = {
  colors?: string[];
  lineWidth?: number;
};

export type PaneOptions = {
  margin?: number;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
};

export type LegendOptions = {
  enabled?: boolean;

  position?: 'bottom' | 'top' | 'left' | 'right';
  direction?: 'row' | 'column';
  align?: 'center' | 'flex-start' | 'flex-end';

  width?: number;
  height?: number;

  itemPadding?: number;
  itemPaddingTop?: number;
  itemPaddingLeft?: number;
  itemPaddingRight?: number;
  itemPaddingBottom?: number;

  itemGap?: number;
  itemNotVisibleColor?: string;

  itemRectWidth?: number;
  itemRectHeight?: number;
  itemRectBorderRadius?: number;

  itemLabelSize?: number;
  itemLabelFont?: string;
  itemLabelWeight?:
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  itemLabelColor?: string;
  itemLabelFormatter?: (series: TimeSeries, idx: number) => string;
};

import { ScaleLinear, ScaleTime } from 'd3';

type FontWeight =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

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
  ticks?: Value[] | ((scale: Scale) => Value[]) | number;

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

  animatable?: boolean;
  animDuration?: number;
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
  animatable?: boolean;
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
  itemLabelWeight?: FontWeight;
  itemLabelColor?: string;
  itemLabelFormatter?: (series: TimeSeries, idx: number) => string;
};

export type SelectionOptions = {
  enabled?: boolean;

  lineColor?: string;
  lineWidth?: number;

  dot?: {
    enabled?: boolean;

    color?: string | ((seriesColor: string) => string);
    radius?: number;
    borderColor?: string | ((seriesColor: string) => string);
    borderWidth?: number;
  };

  tooltip?: {
    enabled?: boolean;

    padding?: number;
    paddingTop?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingBottom?: number;

    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;

    titleFormatter?: (items: SelectedItem[]) => string;
    titleSize?: number;
    titleFont?: string;
    titleWeight?: FontWeight;
    titleColor?: string;

    itemCircleRadius?: number;
    itemCircleColor?: string | ((seriesColor: string) => string);

    itemNameFormatter?: (item: SelectedItem, series: TimeSeries[]) => string;
    itemNameSize?: number;
    itemNameFont?: string;
    itemNameWeight?: FontWeight;
    itemNameColor?: string | ((seriesColor: string) => string);

    itemValueFormatter?: (item: SelectedItem) => string;
    itemValueSize?: number;
    itemValueFont?: string;
    itemValueWeight?: FontWeight;
    itemValueColor?: string | ((seriesColor: string) => string);

    titleHeight?: number;
    itemHeight?: number;
    itemCircleNameGap?: number;
    itemNameValueGap?: number;
  };
};

import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { View, ViewProps } from 'react-native';
import { Svg, SvgProps } from 'react-native-svg';
import { useImmer } from 'use-immer';

import PaneBoundary from 'utils/PaneBoundary';

import {
  TimeSeries,
  TimeAxisOptions,
  LinearAxisOptions,
  LinesOptions,
  PaneOptions,
  LegendOptions,
} from './types';
import getTimeScale from './getTimeScale';
import getLinearScale from './getLinearScale';
import LineChartBody from './LineChartBody';
import { DEFAULT_X_AXIS_HEIGHT, DEFAULT_Y_AXIS_WIDTH } from './constants';
import Legend, { LegendProps } from './Legend';

const DEFAULT_MARGIN = 4;

type UpdatePaneBoundaryOptions = {
  containerWidth?: number;
  svgHeight?: number;
  legendWidth?: number;
};

type LineChartProps = {
  series: TimeSeries[];
  width?: string | number;
  height?: string | number;
  xAxisOptions?: TimeAxisOptions;
  yAxisOptions?: LinearAxisOptions;
  linesOptions?: LinesOptions;
  paneOptions?: PaneOptions;
  legendOptions?: LegendOptions;
};
function LineChart({
  series,
  width = '100%',
  height = 200,
  xAxisOptions,
  yAxisOptions,
  linesOptions,
  paneOptions = {},
  legendOptions,
}: LineChartProps) {
  const sizeRef = useRef({
    legendWidth: 0,
    containerWidth: 0,
    svgHeight: 0,
  });
  const [state, setState] = useImmer({
    svgWidth: 0,
    paneBoundary: new PaneBoundary({ x1: 0, x2: 0, y1: 0, y2: 0 }),
    series: [] as TimeSeries[],
  });

  const updateSizes = ({
    containerWidth,
    svgHeight,
    legendWidth,
  }: UpdatePaneBoundaryOptions = {}) => {
    if (containerWidth !== undefined) {
      sizeRef.current.containerWidth = containerWidth;
    }
    if (legendWidth !== undefined) {
      sizeRef.current.legendWidth = legendWidth;
    }
    if (svgHeight !== undefined) {
      sizeRef.current.svgHeight = svgHeight;
    }

    updatePaneBoundary();
  };

  const updatePaneBoundary = () => {
    if (
      sizeRef.current.containerWidth === 0 ||
      sizeRef.current.legendWidth === 0
    ) {
      return;
    }

    const horizontalLegend =
      legendOptions?.enabled !== false &&
      (legendOptions?.position === 'left' ||
        legendOptions?.position === 'right');

    const svgWidth = horizontalLegend
      ? sizeRef.current.containerWidth - sizeRef.current.legendWidth
      : sizeRef.current.containerWidth;

    setState(dr => {
      dr.svgWidth = svgWidth;

      const { margin, marginTop, marginLeft, marginRight, marginBottom } =
        paneOptions || {};

      dr.paneBoundary = new PaneBoundary({
        x1: marginLeft ?? margin ?? DEFAULT_Y_AXIS_WIDTH,
        x2: dr.svgWidth - (marginRight ?? margin ?? DEFAULT_MARGIN),
        y1:
          sizeRef.current.svgHeight -
          (marginBottom ?? margin ?? DEFAULT_X_AXIS_HEIGHT),
        y2: marginTop ?? margin ?? DEFAULT_MARGIN,
      });
    });
  };

  useEffect(() => {
    updatePaneBoundary();
  }, [
    paneOptions?.margin,
    paneOptions?.marginTop,
    paneOptions?.marginLeft,
    paneOptions?.marginRight,
    paneOptions?.marginBottom,
    legendOptions?.enabled,
    legendOptions?.position,
  ]);

  const onContainerLayout: ViewProps['onLayout'] = evt => {
    updateSizes({ containerWidth: evt.nativeEvent.layout.width });
  };

  const onLayout: SvgProps['onLayout'] = evt => {
    updateSizes({ svgHeight: evt.nativeEvent.layout.height });
  };

  const onLayoutLegend: LegendProps['onLayout'] = evt => {
    updateSizes({ legendWidth: evt.nativeEvent.layout.width });
  };

  useEffect(() => {
    setState(dr => {
      dr.series = series.map(sr => ({
        ...sr,
        visible: sr.visible ?? true,
      }));
    });
  }, [series]);

  const xScale = getTimeScale(state.series, state.paneBoundary.xs);
  const yScale = getLinearScale(state.series, state.paneBoundary.ys);
  const lineFunc =
    !xScale || !yScale
      ? null
      : d3
          .line<TimeSeries['data'][0]>()
          .defined(dt => !isNaN(dt.value))
          .x(dt => xScale(dt.date))
          .y(dt => yScale(dt.value));

  const loaded = xScale !== null && yScale !== null && lineFunc !== null;

  const onClickLegendItem = (sr: TimeSeries, idx: number) => {
    setState(dr => {
      dr.series = dr.series.map((sr, i) =>
        i !== idx ? sr : { ...sr, visible: !sr.visible }
      );
    });
  };

  return (
    <View
      style={{
        flexDirection:
          legendOptions?.position === 'top'
            ? 'column-reverse'
            : legendOptions?.position === 'right'
            ? 'row'
            : legendOptions?.position === 'left'
            ? 'row-reverse'
            : 'column',
        width: width,
      }}
      onLayout={onContainerLayout}
    >
      <Svg width={state.svgWidth} height={height} onLayout={onLayout}>
        {loaded && (
          <LineChartBody
            series={state.series}
            xScale={xScale}
            yScale={yScale}
            lineFunc={lineFunc}
            paneBoundary={state.paneBoundary}
            xAxisOptions={xAxisOptions}
            yAxisOptions={yAxisOptions}
            linesOptions={linesOptions}
          />
        )}
      </Svg>
      <Legend
        series={state.series}
        linesOptions={linesOptions}
        onClickItem={onClickLegendItem}
        onLayout={onLayoutLegend}
        {...legendOptions}
      />
    </View>
  );
}

export default LineChart;

import { useEffect, useRef } from 'react';
import { useImmer } from 'use-immer';
import PaneBoundary from 'utils/PaneBoundary';
import { LegendOptions, PaneOptions } from './types';
import { DEFAULT_X_AXIS_HEIGHT, DEFAULT_Y_AXIS_WIDTH } from './constants';

const DEFAULT_MARGIN = 4;

type UseChartSizeState = {
  svgWidth: number;
  paneBoundary: PaneBoundary;
};

type SizeUpdater = (options?: {
  containerWidth?: number;
  svgHeight?: number;
  legendWidth?: number;
}) => void;

type UseChartSizeReturns = [UseChartSizeState, SizeUpdater];

function useChartSize(
  paneOptions?: PaneOptions,
  legendOptions?: LegendOptions
): UseChartSizeReturns {
  const sizeRef = useRef({
    legendWidth: 0,
    containerWidth: 0,
    svgHeight: 0,
  });
  const [state, setState] = useImmer<UseChartSizeState>({
    svgWidth: 0,
    paneBoundary: new PaneBoundary({ x1: 0, x2: 0, y1: 0, y2: 0 }),
  });

  const updateSize: SizeUpdater = ({
    containerWidth,
    svgHeight,
    legendWidth,
  } = {}) => {
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

  return [state, updateSize];
}

export default useChartSize;

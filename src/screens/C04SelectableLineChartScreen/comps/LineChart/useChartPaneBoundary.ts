import { useEffect, useRef } from 'react';
import { useImmer } from 'use-immer';

import PaneBoundary from 'utils/PaneBoundary';

import { LegendOptions, PaneOptions } from './types';
import { DEFAULT_X_AXIS_HEIGHT, DEFAULT_Y_AXIS_WIDTH } from './constants';

const DEFAULT_MARGIN = 4;

type SvgSizeUpdater = (options: { width: number; height: number }) => void;

type UseChartSizeReturns = [PaneBoundary, SvgSizeUpdater];

function useChartPaneBoundary(
  paneOptions?: PaneOptions,
  legendOptions?: LegendOptions
): UseChartSizeReturns {
  const sizeRef = useRef({
    svgWidth: 0,
    svgHeight: 0,
  });
  const [state, setState] = useImmer({
    paneBoundary: new PaneBoundary({ x1: 0, x2: 0, y1: 0, y2: 0 }),
  });

  const updateSvgSize: SvgSizeUpdater = ({ width, height }) => {
    sizeRef.current.svgWidth = width;
    sizeRef.current.svgHeight = height;

    updatePaneBoundary();
  };

  const updatePaneBoundary = () => {
    if (sizeRef.current.svgWidth === 0) {
      return;
    }

    setState(dr => {
      const { margin, marginTop, marginLeft, marginRight, marginBottom } =
        paneOptions || {};

      dr.paneBoundary = new PaneBoundary({
        x1: marginLeft ?? margin ?? DEFAULT_Y_AXIS_WIDTH,
        x2:
          sizeRef.current.svgWidth - (marginRight ?? margin ?? DEFAULT_MARGIN),
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

  return [state.paneBoundary, updateSvgSize];
}

export default useChartPaneBoundary;

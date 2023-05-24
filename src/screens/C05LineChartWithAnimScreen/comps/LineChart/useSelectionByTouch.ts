import { useCallback, useEffect, useRef } from 'react';
import { ViewProps } from 'react-native';
import { useImmer } from 'use-immer';

import PaneBoundary from 'utils/PaneBoundary';

import findItemsByCoord from './findItemsByCoord';
import { SelectedItem, TimeSeries } from './types';
import getTimeScale from './getTimeScale';

const MIN_TOUCH_DURATION = 100;

type OnTouchStart = NonNullable<ViewProps['onTouchStart']>;
type OnTouchMove = NonNullable<ViewProps['onTouchMove']>;
type OnTouchEnd = NonNullable<ViewProps['onTouchEnd']>;

type UseSelectionByTouchState = {
  touchedX: number;
  selected: null | (SelectedItem | null)[];
};
type UseSelectionByTouchReturns = [
  UseSelectionByTouchState['selected'],
  {
    onTouchStart: OnTouchStart;
    onTouchMove: OnTouchMove;
    onTouchEnd: OnTouchEnd;
  }
];

function useSelectionByTouch(
  series: TimeSeries[],
  xScale: ReturnType<typeof getTimeScale>,
  paneBoundary: PaneBoundary
): UseSelectionByTouchReturns {
  const touchRef = useRef({
    touched: false,
    touchStartTimestamp: 0,
  });

  const [state, setState] = useImmer<UseSelectionByTouchState>({
    touchedX: 0,
    selected: null,
  });

  useEffect(() => {
    if (touchRef.current.touched) {
      const selected = findItemsByCoord({
        series: series,
        range: paneBoundary.xs,
        scale: xScale,
        x: state.touchedX,
      });

      setState(dr => {
        dr.selected = selected;
      });
    }
  }, [series]);

  const onTouchStart = useCallback<OnTouchStart>(() => {
    touchRef.current.touchStartTimestamp = new Date().getTime();
  }, []);

  const onTouchMove = useCallback<OnTouchMove>(
    evt => {
      const now = new Date().getTime();
      if (
        touchRef.current.touched &&
        touchRef.current.touchStartTimestamp + MIN_TOUCH_DURATION > now
      ) {
        return;
      }

      const { touches } = evt.nativeEvent;
      const selected = findItemsByCoord({
        series: series,
        range: paneBoundary.xs,
        scale: xScale,
        x: touches[0].locationX,
      });

      setState(dr => {
        dr.touchedX = touches[0].locationX;
        dr.selected = selected;
      });
    },
    [series, paneBoundary]
  );
  const onTouchEnd = useCallback<OnTouchEnd>(evt => {
    const now = new Date().getTime();

    if (
      touchRef.current.touched &&
      touchRef.current.touchStartTimestamp + MIN_TOUCH_DURATION > now
    ) {
      touchRef.current.touched = false;
      setState(dr => {
        dr.touchedX = 0;
        dr.selected = null;
      });
    } else {
      touchRef.current.touched = true;
    }
  }, []);

  return [state.selected, { onTouchStart, onTouchMove, onTouchEnd }];
}

export default useSelectionByTouch;

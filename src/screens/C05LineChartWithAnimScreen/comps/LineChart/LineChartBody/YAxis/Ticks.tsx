import { useEffect } from 'react';
import { ScaleLinear } from 'd3';
import { useImmer } from 'use-immer';

import { LinearAxisOptions } from '../../types';
import Tick from './Tick';

const DEFAULT_TICK_LENGTH = 6;

type TicksProps = Pick<
  LinearAxisOptions,
  | 'tickLength'
  | 'tickColor'
  | 'tickWidth'
  | 'tickLabelColor'
  | 'tickLabelSize'
  | 'tickLabelFont'
  | 'tickLabelWeight'
  | 'tickLabelFormatter'
> & {
  scale: ScaleLinear<number, number, never>;
  ticks: number[];
  enabled?: LinearAxisOptions['showTicks'];
  duration?: number;
};

function Ticks({
  scale,
  ticks,
  enabled = true,
  tickLength = DEFAULT_TICK_LENGTH,
  tickWidth = 1,
  tickColor = 'black',
  tickLabelColor = 'black',
  tickLabelSize,
  tickLabelFont,
  tickLabelWeight,
  tickLabelFormatter = val => `${val}`,
  duration = 300,
}: TicksProps) {
  const [state, setState] = useImmer({
    ticks: [] as { value: number; old: boolean }[],
  });

  useEffect(() => {
    setState(dr => {
      dr.ticks = [
        ...dr.ticks
          .filter(it => !ticks.includes(it.value))
          .map(it => ({ ...it, old: true })),
        ...ticks.map(value => ({ value, old: false })),
      ];
    });
    setTimeout(() => {
      setState(dr => {
        dr.ticks = dr.ticks.filter(it => !it.old);
      });
    }, duration);
  }, [ticks]);

  if (!enabled) {
    return null;
  }
  return (
    <>
      {state.ticks.map(({ value, old }) => (
        <Tick
          key={`${value}`}
          x={-tickLength}
          y={scale(value)}
          lineColor={tickColor}
          lineWidth={tickWidth}
          labelColor={tickLabelColor}
          labelSize={tickLabelSize}
          labelFont={tickLabelFont}
          labelWeight={tickLabelWeight}
          label={tickLabelFormatter(value)}
          visible={!old}
          duration={duration}
        />
      ))}
    </>
  );
}

export default Ticks;

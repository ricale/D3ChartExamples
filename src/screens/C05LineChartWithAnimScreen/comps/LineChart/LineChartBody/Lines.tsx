import { Line as D3Line } from 'd3';
import { G } from 'react-native-svg';

import { LinesOptions, TimeSeries } from '../types';
import { DEFAULT_COLORS } from '../constants';
import Path, { PathProps } from '../Path';

type LinesProps = LinesOptions & {
  series: TimeSeries[];
  lineFunc: D3Line<TimeSeries['data'][0]>;
  initialPrevD?: PathProps['initialPrevD'];
};
function Lines({
  series,
  lineFunc,
  initialPrevD,
  colors = DEFAULT_COLORS,
  lineWidth = 1,
  animatable = true,
}: LinesProps) {
  return (
    <G>
      {series.map((sr, i) => (
        <Path
          key={i}
          d={!sr.visible ? undefined : lineFunc(sr.data) ?? undefined}
          stroke={sr.color ?? colors[i % colors.length]}
          strokeLinecap="round"
          fill="transparent"
          strokeWidth={sr.lineWidth ?? lineWidth}
          initialPrevD={initialPrevD}
          visible={sr.visible}
          animated={animatable}
        />
      ))}
    </G>
  );
}

export default Lines;

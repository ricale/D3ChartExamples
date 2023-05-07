import { Line as D3Line } from 'd3';
import { G, Path } from 'react-native-svg';

import { LinesOptions, TimeSeries } from '../types';
import { DEFAULT_COLORS } from '../constants';

type LinesProps = LinesOptions & {
  series: TimeSeries[];
  lineFunc: D3Line<TimeSeries['data'][0]>;
};
function Lines({
  series,
  lineFunc,
  colors = DEFAULT_COLORS,
  lineWidth = 1,
}: LinesProps) {
  return (
    <G>
      {series.map((sr, i) =>
        !sr.visible ? null : (
          <Path
            key={i}
            d={lineFunc(sr.data) ?? undefined}
            stroke={sr.color ?? colors[i % colors.length]}
            strokeLinecap="round"
            fill="transparent"
            strokeWidth={sr.lineWidth ?? lineWidth}
          />
        )
      )}
    </G>
  );
}

export default Lines;

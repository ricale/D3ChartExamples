import { G, Path } from 'react-native-svg';
import { LinesOptions, TimeSeries } from '../types';
import { DEFAULT_COLORS } from '../constants';

type LinesProps = LinesOptions & {
  series: TimeSeries[];
  lineFunc: d3.Line<TimeSeries['data'][0]>;
};
function Lines({
  series,
  lineFunc,
  colors = DEFAULT_COLORS,
  lineWidth = 1,
}: LinesProps) {
  return (
    <G>
      {series.map((sr, i) => (
        <Path
          key={i}
          d={lineFunc(sr.data) ?? undefined}
          stroke={sr.color ?? colors[i % colors.length]}
          strokeLinecap="round"
          fill="transparent"
          strokeWidth={sr.lineWidth ?? lineWidth}
        />
      ))}
    </G>
  );
}

export default Lines;

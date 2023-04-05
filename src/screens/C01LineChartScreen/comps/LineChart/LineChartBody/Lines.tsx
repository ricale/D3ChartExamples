import { G, Path } from 'react-native-svg';
import { TimeSeries, TimeSeriesDatum } from '../types';

type LinesProps = {
  series: TimeSeries[];
  lineFunc: d3.Line<TimeSeriesDatum>;
};
function Lines({ series, lineFunc }: LinesProps) {
  return (
    <G>
      {series.map((sr, i) => (
        <Path
          key={i}
          d={lineFunc(sr.data) ?? undefined}
          stroke="blue"
          strokeLinecap="round"
          fill="transparent"
          strokeWidth={1}
        />
      ))}
    </G>
  );
}

export default Lines;

import { G, Path } from 'react-native-svg';
import { TimeSeries } from '../types';

type LinesProps = {
  series: TimeSeries[];
  lineFunc: d3.Line<TimeSeries['data'][0]>;
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

import { extent, scaleLinear } from 'd3';
import { TimeSeries } from './types';

function getLinearScale(series: TimeSeries[], range: [number, number]) {
  const visibles = series.filter(sr => sr.visible);

  if (!visibles?.length) {
    return null;
  }
  if (range[0] === 0 && range[1] === 0) {
    return null;
  }

  const allData = visibles.reduce(
    (acc, sr) => [...acc, ...sr.data],
    [] as TimeSeries['data']
  );
  if (!allData.length) {
    return null;
  }

  const domain = extent(allData, dt => dt.value) as [number, number];

  const offsetDelta = 0.2;
  const offset = (domain[1] - domain[0]) * offsetDelta;
  domain[0] -= offset;
  domain[1] += offset;

  const scale = scaleLinear().domain(domain).range(range);

  return scale;
}

export default getLinearScale;

import * as d3 from 'd3';
import { TimeSeries } from './types';

function getLinearScale(series: TimeSeries[], range: [number, number]) {
  if (!series?.length) {
    return null;
  }
  if (range[0] === 0 && range[1] === 0) {
    return null;
  }

  const allData = series.reduce(
    (acc, sr) => [...acc, ...sr.data],
    [] as TimeSeries['data']
  );
  if (!allData.length) {
    return null;
  }

  const domain = d3.extent(allData, dt => dt.value) as [number, number];

  const offsetDelta = 0.2;
  const offset = (domain[1] - domain[0]) * offsetDelta;
  domain[0] -= offset;
  domain[1] += offset;

  const scale = d3.scaleLinear().domain(domain).range(range);

  return scale;
}

export default getLinearScale;

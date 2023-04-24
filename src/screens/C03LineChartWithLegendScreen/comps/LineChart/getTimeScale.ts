import * as d3 from 'd3';
import { TimeSeries } from './types';

function getTimeScale(series: TimeSeries[], range: [number, number]) {
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
  const domain = d3.extent(allData, dt => dt.date) as [Date, Date];
  const scale = d3.scaleTime().domain(domain).range(range);

  return scale;
}

export default getTimeScale;

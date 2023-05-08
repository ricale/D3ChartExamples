import { extent, scaleTime } from 'd3';
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
  const domain = extent(allData, dt => dt.date) as [Date, Date];
  const scale = scaleTime().domain(domain).range(range);

  return scale;
}

export default getTimeScale;

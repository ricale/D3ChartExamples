import { ScaleTime, bisector } from 'd3';
import isSameDay from 'utils/isSameDay';
import { TimeSeries } from './types';

const bisect = bisector<TimeSeries['data'][0], Date>(it => it.date).center;

type FindItemsByCoordOptions = {
  series: TimeSeries[];
  range: [number, number];
  scale: ScaleTime<number, number, never> | null;
  x: number;
};
function findItemsByCoord({
  series,
  range,
  scale,
  x,
}: FindItemsByCoordOptions) {
  if (series.length === 0) {
    return null;
  }
  if (!scale) {
    return null;
  }

  let minDistance = range[1] - range[0];
  let date: Date | undefined = undefined;
  for (let i = 0; i < series.length; i++) {
    const index = bisect(series[i].data, scale.invert(x), 0);
    const found = series[i].data[index];
    if (!found) {
      continue;
    }

    const distance = Math.abs(scale(found.date) - x);
    if (minDistance > distance) {
      minDistance = distance;
      date = found.date;
    }
  }

  if (!date) {
    return null;
  }

  return series.map((sr, i) => {
    if (!sr.visible) {
      return null;
    }
    // FIXME: 데이터가 일별 최대 하나라는 가정으로 작성된 코드
    const found = sr.data.find(item => isSameDay(item.date, date!));
    if (!found) {
      return null;
    }
    return { ...found, seriesIndex: i };
  });
}

export default findItemsByCoord;

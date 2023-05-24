import { ViewProps } from 'react-native';
import { LegendOptions } from '../types';

const getContainerStyle = ({
  position,
  direction,
  align,
  width,
  height,
}: LegendOptions): ViewProps['style'] => {
  if (position === 'right' || position === 'left') {
    return {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: align ?? 'flex-start',
      width,
    };
  }

  if (direction === 'column') {
    return {
      flexDirection: 'column',
      justifyContent: height ? 'flex-start' : 'center',
      alignItems: align ?? 'center',
      flexWrap: height ? 'wrap' : undefined,
      width: width ?? '100%',
      height,
    };
  }

  return {
    flexDirection: 'row',
    justifyContent: align ?? 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: width ?? '100%',
    height,
  };
};

export default getContainerStyle;

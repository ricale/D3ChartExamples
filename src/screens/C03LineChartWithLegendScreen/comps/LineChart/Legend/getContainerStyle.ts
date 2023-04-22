import { ViewProps } from 'react-native';
import { LegendOptions } from '../types';

const getContainerStyle = ({
  position,
  direction,
  align,
}: LegendOptions): ViewProps['style'] => {
  if (position === 'right' || position === 'left') {
    return {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: align ?? 'flex-start',
    };
  }

  if (direction === 'column') {
    return {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: align ?? 'center',
      width: '100%',
    };
  }

  return {
    flexDirection: 'row',
    justifyContent: align ?? 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
  };
};

export default getContainerStyle;

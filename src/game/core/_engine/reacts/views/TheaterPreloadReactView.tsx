import { ViewsProxy } from 'pancake';
import { memo, useEffect, useRef, useState } from 'react';
import { TheaterPreloadReactHTMLView } from '../../htmls/views/TheaterPreloadReactHTMLView';
import OpacityAnimatedReactView from './OpacityAnimatedReactView';
import { TransitionProps } from './bases/ReactViewBase';
import NumberFlow from '@number-flow/react';

const TheaterPreloadReactView = memo(({ ...props }: TransitionProps) => {
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    const view = ViewsProxy.GetView<TheaterPreloadReactHTMLView>(props.viewId);
    const onChangePercent = (percent: number): void => {
      setPercent(Math.round(percent));
    };
    view.onPercentChange.add(onChangePercent);
    return () => {
      view.onPercentChange.remove(onChangePercent);
    };
  }, []);

  return (
    <OpacityAnimatedReactView {...props}>
      <div className='bg-black h-full w-full flex items-end'>
        <div className='flex items-center justify-between p-4 w-full'>
        <h1 className='text-white font-instrument text-[20vh] leading-tight'>
          Loading
        </h1>
        <span className='text-white font-instrument text-[20vh] leading-tight'>
          <NumberFlow willChange={true} value={percent} />%
        </span>
        </div>
      </div>
    </OpacityAnimatedReactView>
  );
});

export default TheaterPreloadReactView;

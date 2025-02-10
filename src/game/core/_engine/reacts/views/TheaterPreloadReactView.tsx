import { ViewsProxy } from 'pancake';
import { memo, useEffect, useRef, useState } from 'react';
import { TheaterPreloadReactHTMLView } from '../../htmls/views/TheaterPreloadReactHTMLView';
import OpacityAnimatedReactView from './OpacityAnimatedReactView';
import { TransitionProps } from './bases/ReactViewBase';
import NumberFlow from '@number-flow/react';

const TheaterPreloadReactView = memo(({ ...props }: TransitionProps) => {
  const [displayPercent, setDisplayPercent] = useState<number>(0);
  const [targetPercent, setTargetPercent] = useState<number>(0);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const allowTransitionRef = useRef<boolean>(false);
  
  useEffect(() => {
    const view = ViewsProxy.GetView<TheaterPreloadReactHTMLView>(props.viewId);
    const originalExecute = view.onFinishTransition.execute;
    view.onFinishTransition.execute = function() {
      if (allowTransitionRef.current) {
        originalExecute.call(view.onFinishTransition);
      }
    };
    
    const onChangePercent = (percent: number): void => {
      const roundedPercent = Math.round(percent);
      setTargetPercent(roundedPercent);
    };

    view.onPercentChange.add(onChangePercent);
    
    return () => {
      view.onPercentChange.remove(onChangePercent);
      view.onFinishTransition.execute = originalExecute;
      allowTransitionRef.current = false;
    };
  }, [props.viewId]);

  useEffect(() => {
    if (displayPercent < targetPercent) {
      animationRef.current = setTimeout(() => {
        setDisplayPercent(prev => prev + 1);
      }, 20);
    } else if (displayPercent === 100 && targetPercent === 100 && !allowTransitionRef.current) {
      allowTransitionRef.current = true;
      const view = ViewsProxy.GetView<TheaterPreloadReactHTMLView>(props.viewId);
      setTimeout(() => {
        view.onFinishTransition.execute();
      }, 100);
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [displayPercent, targetPercent, props.viewId]);

  return (
    <OpacityAnimatedReactView {...props}>
      <div className="bg-black h-full w-full flex items-end">
        <div className="flex items-center justify-between p-4 w-full">
          <h1 className="text-white font-instrument text-[20vh] leading-tight">
            Loading
          </h1>
          <span className="text-white font-instrument text-[20vh] leading-tight">
            <NumberFlow willChange={true} value={displayPercent} />%
          </span>
        </div>
      </div>
    </OpacityAnimatedReactView>
  );
});

export default TheaterPreloadReactView;
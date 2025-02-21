import { useCallback } from 'react';
import ReactViewBase, { TransitionProps } from './bases/ReactViewBase';
import { ViewState } from 'pancake';

export default function OpacityAnimatedReactView({
  ...props
}: TransitionProps) {
  const handleChange = useCallback((target: HTMLElement, value: number) => {
    const translateY = value * 100;
    target.style.opacity = `${value}`;
    target.style.transform = `translateY(${translateY - 100}vh)`;
    target.style.transition = 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)';

    props.handleChange?.(target, value);
  }, []);

  return (
    <ReactViewBase {...props} handleChange={handleChange}>
      <div className='relative w-full h-full will-change-transform'>
        {props.children}
      </div>
    </ReactViewBase>
  );
}

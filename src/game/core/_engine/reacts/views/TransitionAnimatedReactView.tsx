import { useCallback } from 'react';
import ReactViewBase, { TransitionProps } from './bases/ReactViewBase';

export default function TransitionAnimatedReactView({
  ...props
}: TransitionProps) {
  const handleChange = useCallback((target: HTMLElement, value: number) => {
    const translateY = value * 100;
    target.style.transform = `translateY(${translateY - 100}vh)`;
    target.style.transition = 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)';

    props.handleChange?.(target, value);
  }, []);

  return (
    <ReactViewBase {...props} handleChange={handleChange}>
      <div className='will-change-transform bg-white flex items-center justify-center fixed inset-0 z-50'>
        {props.children}
      </div>
    </ReactViewBase>
  );
}
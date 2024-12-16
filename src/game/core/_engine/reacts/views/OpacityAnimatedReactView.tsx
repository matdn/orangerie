import { useCallback } from 'react';
import ReactViewBase, { TransitionProps } from './bases/ReactViewBase';

export default function OpacityAnimatedReactView({...props}: TransitionProps) {

    const handleChange = useCallback((target: HTMLElement, value: number) => {
        target.style.opacity = `${value}`;
        props.handleChange?.(target, value);
    }, []);

    return (
        <ReactViewBase {...props} handleChange={handleChange}>
            {props.children}
        </ReactViewBase>
    )
}
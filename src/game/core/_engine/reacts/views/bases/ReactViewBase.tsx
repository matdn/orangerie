import { ViewState, ViewsProxy } from 'pancake';
import React, { ForwardedRef, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { SuperViewBase } from '../../../../views/bases/SuperViewBase';
import ReactHTMLView from '../../../htmls/views/ReactHTMLView';
import { forwardRef } from 'react';

export interface TransitionProps extends HTMLAttributes<HTMLDivElement> {
  viewId: string;
  children?: React.ReactNode;
  className?: string;
  handleChange?: (target: HTMLElement, value: number) => void;
}

export const ReactViewBase = forwardRef<HTMLDivElement, TransitionProps>(
  ({ viewId, children, className = '', handleChange, ...props }, ref) => {

  const target = useRef<HTMLDivElement>(null);
  const [targetClass, setTargetClass] = useState<string>(
    ViewsProxy.GetView(viewId).viewState
  );

  useEffect(() => {
    const view = ViewsProxy.GetView<ReactHTMLView>(viewId);

    view.setHTMLElement(target.current);

    const onViewStateChange = (
      view: SuperViewBase,
      viewState: ViewState
    ): void => {
      updateState(viewState);
    };

    const updateState = (viewState: ViewState) => {
      if (target.current) setTargetClass(viewState);
    };

    const onTransitionChange = (value: number): void => {
      if (handleChange && target.current) {
        handleChange(target.current, value);
      }
    };

    updateState(view.viewState);
    onTransitionChange(view.value);
    view.onStateChangeAction?.add(onViewStateChange);
    view.onTransitionChangeAction?.add(onTransitionChange);

    return () => {
      view.onStateChangeAction?.delete(onViewStateChange);
      view.onTransitionChangeAction?.remove(onTransitionChange);
    };
  }, []);

  const setRefs = (element: HTMLDivElement | null) => {
    target.current = element;
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  };

  return (
    <div
      {...props}
      id={viewId}
      className={`h-dvh w-screen ${className} ${targetClass}`}
      ref={setRefs}
      key={viewId}
    >
      {children}
    </div>
  );
})

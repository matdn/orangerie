import NumberFlow from '@number-flow/react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ViewsProxy } from 'pancake';
import { memo, useEffect, useRef, useState, useCallback } from 'react';
import { TheaterPreloadReactHTMLView } from '../../htmls/views/TheaterPreloadReactHTMLView';
import ReactViewBase, { TransitionProps } from './bases/ReactViewBase';
import { ViewId } from '../../../../constants/views/ViewId';

const TheaterPreloadReactView = memo(({ ...props }: TransitionProps) => {
  const [displayPercent, setDisplayPercent] = useState<number>(0);
  const [targetPercent, setTargetPercent] = useState<number>(0);
  const allowTransitionRef = useRef<boolean>(false);
  const circleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const handleLeave = useCallback(() => {
    if (wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        y: "-100vh",
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          const view = ViewsProxy.GetView<TheaterPreloadReactHTMLView>(props.viewId);
          view.onFinishTransition.execute();
        }
      });
    }
  }, [props.viewId]);

  useEffect(() => {
    const view = ViewsProxy.GetView<TheaterPreloadReactHTMLView>(props.viewId);
    const originalExecute = view.onFinishTransition.execute;

    view.onFinishTransition.execute = function () {
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
    tl.current = gsap.timeline();

    if (wrapperRef.current) {
      gsap.set(wrapperRef.current, { y: "100vh" });
      tl.current.to(wrapperRef.current, {
        y: 0,
        duration: 1,
        ease: "power2.out"
      });
    }

    tl.current.fromTo(
      containerRef.current,
      {
        autoAlpha: 0,
        y: 15,
        scale: 0.97,
      },
      {
        duration: 0.8,
        autoAlpha: 1,
        y: 0,
        scale: 1,
        ease: "power2.out",
      },
      "-=0.3"
    );

    if (circleRef.current) {
      const radius = circleRef.current.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;

      gsap.set(circleRef.current, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference,
      });
    }

    return () => {
      tl.current?.kill();
    };
  }, []);

  useGSAP(() => {
    if (circleRef.current) {
      const radius = circleRef.current.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      const offset = circumference - (displayPercent / 100) * circumference;

      gsap.to(circleRef.current, {
        strokeDashoffset: offset,
        duration: 0.4,
        ease: "power1.out",
      });
    }
  }, [displayPercent]);

  useEffect(() => {
    let animationId: number;

    const animatePercent = () => {
      if (displayPercent < targetPercent) {
        setDisplayPercent((prev) => {
          const diff = targetPercent - prev;
          const increment = Math.max(1, Math.floor(diff / 10));
          return Math.min(prev + increment, targetPercent);
        });
        animationId = requestAnimationFrame(animatePercent);
      } else if (
        displayPercent === 100 &&
        targetPercent === 100 &&
        !allowTransitionRef.current
      ) {
        allowTransitionRef.current = true;

        gsap.to(containerRef.current, {
          duration: 0.6,
          autoAlpha: 0,
          y: -20,
          scale: 0.95,
          ease: "power2.in",
          onComplete: handleLeave
        });
      }
    };

    animationId = requestAnimationFrame(animatePercent);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [displayPercent, targetPercent, handleLeave]);

  return (
    <ReactViewBase
      className="fixed inset-0 z-[100]"
      {...props}
    >
      <div
        ref={wrapperRef}
        className="page-transition will-change-transform bg-white flex items-center justify-center fixed inset-0 z-50"
      >
        <div
          ref={containerRef}
          className="relative flex flex-col items-center justify-center w-64 h-64"
        >
          <svg className="absolute w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            <circle
              ref={circleRef}
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#333333"
              strokeWidth="2"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-black font-instrument text-5xl">
              <NumberFlow willChange={true} value={displayPercent} />
              <span className="ml-1">%</span>
            </span>
          </div>

          <div className="absolute bottom-0 transform translate-y-16">
            <h1 className="text-black font-instrument text-xl uppercase tracking-wider">
              Loading
            </h1>
          </div>
        </div>
      </div>
    </ReactViewBase>
  );
});

export default TheaterPreloadReactView;
import NumberFlow from '@number-flow/react';
import { gsap } from 'gsap';
import { ViewsProxy } from 'pancake';
import { memo, useEffect, useRef, useState } from 'react';
import { TheaterPreloadReactHTMLView } from '../../htmls/views/TheaterPreloadReactHTMLView';
import ReactViewBase, { TransitionProps } from './bases/ReactViewBase';

const TheaterPreloadReactView = memo(({ ...props }: TransitionProps) => {
  const [displayPercent, setDisplayPercent] = useState<number>(0);
  const [targetPercent, setTargetPercent] = useState<number>(0);
  const allowTransitionRef = useRef<boolean>(false);
  const circleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageTransitionRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Animation d'entrée et initialisation
  useEffect(() => {
    // Masquer la page initialement
    gsap.set('.page-transition', {
      autoAlpha: 0,
      y: '100%'
    });

    // Animation d'entrée de la page
    const enterTl = gsap.timeline();
    
    enterTl.to('.page-transition', {
      duration: 1,
      autoAlpha: 1,
      y: '0%',
      ease: 'power3.out'
    });

    // Timeline pour l'animation du cercle
    tl.current = gsap.timeline({ paused: true });

    // Animation d'entrée du conteneur
    gsap.set(containerRef.current, {
      autoAlpha: 0,
      y: 20,
      scale: 0.95
    });

    gsap.to(containerRef.current, {
      duration: 0.8,
      autoAlpha: 1,
      y: 0,
      scale: 1,
      ease: 'power2.out',
      delay: 0.4, // Délai pour que l'animation commence après l'entrée de la page
    });

    // Configuration du cercle de chargement
    if (circleRef.current) {
      const radius = circleRef.current.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;

      gsap.set(circleRef.current, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference,
      });

      tl.current.to(circleRef.current, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
      });
    }

    return () => {
      if (tl.current) {
        tl.current.kill();
      }
      enterTl.kill();
    };
  }, []);

  // Animation du cercle en fonction du pourcentage
  useEffect(() => {
    if (tl.current && circleRef.current) {
      const radius = circleRef.current.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      const offset = circumference - (displayPercent / 100) * circumference;

      gsap.to(circleRef.current, {
        strokeDashoffset: offset,
        duration: 0.5,
        ease: 'power1.out',
      });

      tl.current.progress(displayPercent / 100);
    }
  }, [displayPercent]);

  // Liaison avec le système de vue
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

  // Animation fluide du pourcentage et animation de sortie
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

        // Animation du conteneur qui disparaît d'abord
        gsap.to(containerRef.current, {
          duration: 0.5,
          autoAlpha: 0,
          y: -30,
          scale: 0.9,
          ease: 'power2.in'
        });

        // Puis animation de sortie de la page entière
        const exitTl = gsap.timeline({
          onComplete: () => {
            const view = ViewsProxy.GetView<TheaterPreloadReactHTMLView>(
              props.viewId
            );
            view.onFinishTransition.execute();
          },
        });

        exitTl.to(
          '.page-transition',
          {
            delay: 0.2,
            duration: 0.8,
            y: '-100%',
            autoAlpha: 0,
            ease: 'power3.inOut',
          },
          0.2
        );
      }
    };

    animationId = requestAnimationFrame(animatePercent);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [displayPercent, targetPercent, props.viewId]);

  return (
    <ReactViewBase
      className='page-transition will-change-transform bg-white flex items-center justify-center'
      {...props}
    >
      <div
        ref={containerRef}
        className='relative flex flex-col items-center justify-center w-64 h-64'
      >
        <svg className='absolute w-full h-full' viewBox='0 0 100 100'>
          <circle
            cx='50'
            cy='50'
            r='45'
            fill='none'
            stroke='#ffffff'
            strokeWidth='1.5'
          />
          <circle
            ref={circleRef}
            cx='50'
            cy='50'
            r='45'
            fill='none'
            stroke='#333333'
            strokeWidth='2'
            strokeLinecap='round'
            transform='rotate(-90 50 50)'
          />
        </svg>

        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='text-black font-instrument text-5xl'>
            <NumberFlow willChange={true} value={displayPercent} />
            <span className='ml-1'>%</span>
          </span>
        </div>

        <div className='absolute bottom-0 transform translate-y-16'>
          <h1 className='text-black font-instrument text-xl uppercase tracking-wider'>
            Loading
          </h1>
        </div>
      </div>
    </ReactViewBase>
  );
});

export default TheaterPreloadReactView;
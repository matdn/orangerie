import NumberFlow from '@number-flow/react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ViewsProxy } from 'pancake';
import { memo, useEffect, useRef, useState, useCallback } from 'react';
import { TheaterPreloadReactHTMLView } from '../../htmls/views/TheaterPreloadReactHTMLView';
import ReactViewBase, { TransitionProps } from './bases/ReactViewBase';

const TheaterPreloadReactView = memo(({ ...props }: TransitionProps) => {
  const [displayPercent, setDisplayPercent] = useState<number>(0);
  const [targetPercent, setTargetPercent] = useState<number>(0);
  const allowTransitionRef = useRef<boolean>(false);
  const circleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const context = useRef<gsap.Context | null>(null);

  const handleChange = useCallback((target: HTMLElement, value: number) => {
    // Applique la transformation avec translateY comme dans TransitionAnimatedReactView
    const translateY = value * 100;
    target.style.transform = `translateY(${translateY - 100}vh)`;
    target.style.transition = 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    
    // Appelle le handleChange du parent si disponible
    props.handleChange?.(target, value);
  }, [props.handleChange]);

  // Fonction pour l'animation d'entrée avec slide
  const handleEnter = useCallback((target: HTMLElement) => {
    target.style.transform = 'translateY(100vh)';
    
    // Force un reflow pour que la transition s'applique
    void target.offsetWidth;
    
    target.style.transition = 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    target.style.transform = 'translateY(0)';
  }, []);

  // Animation d'entrée 
  useEffect(() => {
    // Initialisation du style pour l'entrée
    if (wrapperRef.current) {
      handleEnter(wrapperRef.current);
    }
    
    // Animation du conteneur central avec un délai
    gsap.fromTo(containerRef.current, 
      {
        autoAlpha: 0,
        y: 15,
        scale: 0.97,
      }, 
      {
        duration: 1,
        autoAlpha: 1,
        y: 0,
        scale: 1,
        ease: 'power2.out',
        delay: 0.6, // Légèrement plus de délai pour attendre que le slide soit bien avancé
      }
    );

    // Animation du cercle
    if (circleRef.current) {
      const radius = circleRef.current.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;

      gsap.set(circleRef.current, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference,
      });
    }
  }, [handleEnter]);

  // Mise à jour de l'animation du cercle lorsque le pourcentage change
  useGSAP(() => {
    if (circleRef.current) {
      const radius = circleRef.current.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      const offset = circumference - (displayPercent / 100) * circumference;

      gsap.to(circleRef.current, {
        strokeDashoffset: offset,
        duration: 0.5,
        ease: 'power1.out',
      });
    }
  }, [displayPercent]);

  // Gestion des événements du ViewsProxy
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

  // Animation du pourcentage et logique de sortie
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
        
        // Animation de sortie du conteneur central
        gsap.to(containerRef.current, {
          duration: 0.6,
          autoAlpha: 0,
          y: -20,
          scale: 0.95,
          ease: 'power2.in',
          onComplete: () => {
            // Une fois le conteneur disparu, déclencher la translation de la page entière
            if (wrapperRef.current) {
              handleChange(wrapperRef.current, 1);
              
              // Attente de la fin de l'animation avant d'exécuter onFinishTransition
              setTimeout(() => {
                const view = ViewsProxy.GetView<TheaterPreloadReactHTMLView>(props.viewId);
                view.onFinishTransition.execute();
              }, 1200); // Correspond à la durée de transition dans handleChange
            }
          }
        });
      }
    };

    animationId = requestAnimationFrame(animatePercent);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [displayPercent, targetPercent, props.viewId, handleChange]);

  return (
    <ReactViewBase
      className='fixed inset-0 z-[100]'
      {...props}
      handleChange={handleChange}
    >
      <div 
        ref={wrapperRef}
        className='page-transition will-change-transform bg-white flex items-center justify-center fixed inset-0 z-50'
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
      </div>
    </ReactViewBase>
  );
});

export default TheaterPreloadReactView;
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import NumberFlow from '@number-flow/react';
import { ViewsProxy } from 'pancake';
import { ViewId } from '../../../../constants/views/ViewId';

const PreloadReactView = () => {
  const [displayPercent, setDisplayPercent] = useState(0);
  const [targetPercent, setTargetPercent] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const allowTransitionRef = useRef(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const checkView = () => {
      if (ViewsProxy.IsViewInstanced(ViewId.THREE_LOBBY) && !doneRef.current) {
        doneRef.current = true;
        setTargetPercent(100);
      } else {
        requestAnimationFrame(checkView);
      }
    };

    requestAnimationFrame(checkView);
  }, []);

  // ⏫ Animation d'entrée avec montée de l'écran et fade du loader
  useEffect(() => {
    if (wrapperRef.current && containerRef.current) {
      const tl = gsap.timeline();

      // 1. Start with wrapper below screen
      // gsap.set(wrapperRef.current, { y: '100vh' });
      gsap.set(containerRef.current, { autoAlpha: 0, scale: 0.97 });

      tl.to(wrapperRef.current, {
        y: 0,
        duration: 1,
        ease: 'power2.out',
      });

      // 2. Ensuite fade in + petit scale anim du loader
      tl.to(containerRef.current, {
        duration: 0.8,
        autoAlpha: 1,
        scale: 1,
        ease: 'power2.out',
      }, '-=0.3');
    }

    if (circleRef.current) {
      const radius = circleRef.current.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;

      gsap.set(circleRef.current, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference,
      });
    }
  }, []);

  // 🌀 Animation du compteur + fin quand 100%
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      if (displayPercent < targetPercent) {
        setDisplayPercent((prev) => {
          const diff = targetPercent - prev;
          const increment = Math.max(1, Math.floor(diff / 10));
          return Math.min(prev + increment, targetPercent);
        });
        animationId = requestAnimationFrame(animate);
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
          ease: 'power2.in',
          onComplete: () => {
            gsap.to(wrapperRef.current, {
              y: '-100vh',
              duration: 1,
              ease: 'power2.inOut',
            });
          },
        });
      }

      const radius = circleRef.current?.r.baseVal.value || 0;
      const circumference = radius * 2 * Math.PI;
      const offset = circumference - (displayPercent / 100) * circumference;

      gsap.to(circleRef.current, {
        strokeDashoffset: offset,
        duration: 0.4,
        ease: 'power1.out',
      });
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [displayPercent, targetPercent]);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
    >
      <div
        ref={containerRef}
        className="relative flex flex-col items-center justify-center w-64 h-64"
      >
        <svg className="w-full h-full" viewBox="0 0 100 100">
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
            stroke="#000000"
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
          <h1 className="text-black font-instrument text-2xl uppercase tracking-wider">
            Loading
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PreloadReactView;

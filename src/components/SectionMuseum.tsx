import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const SectionMuseum = ({ children, className = '', id = '' }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const scrollTrigger = {
      markers: true,
      trigger: sectionRef.current,
      start: 'top 30%',
      toggleActions: 'play none none reverse',
    };

    const animateElements = (selector, props) => {
      const elements = contentRef.current.querySelectorAll(selector);
      if (elements.length === 0) return;

      gsap.fromTo(elements, props.from, { ...props.to, scrollTrigger });
    };

    animateElements('.anim-text', {
      from: { opacity: 0, y: 20 },
      to: { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
    });

    animateElements('.anim-long-text', {
      from: { opacity: 0, y: 20 },
      to: { opacity: 1, y: 0, duration: 0.4, stagger: 0.02 },
    });

    animateElements('.glassmorphism', {
      from: { opacity: 0 },
      to: { opacity: 1, duration: 0.4, stagger: 0.4 },
    });

    animateElements('.anim-number', {
      from: { scale: 0 },
      to: { scale: 1, duration: 0.4, ease: 'back.out(1.7)' },
    });

    animateElements('.anim-img', {
      from: { opacity: 0, y: 20, filter: 'blur(10px)' },
      to: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        stagger: 0.02,
      },
    });

    animateElements('.anim-blur', {
      from: { backdropFilter: 'blur(0px)', opacity: 0 },
      to: { backdropFilter: 'blur(10px)', opacity: 1, duration: 0.6 },
    });

    animateElements('.anim-button', {
      from: {
        opacity: 0,
        y: 20,
        filter: 'blur(10px)',
      },
      to: {
        duration: 1.2,
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        ease: 'expo.out',
      },
    });
  }, []);

  return (
    <section ref={sectionRef} id={id}>
      <div
        className={`h-dvh w-screen flex flex-col justify-center items-center gap-8 px-2 ${className}`}
        ref={contentRef}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionMuseum;

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const SectionMuseum = ({ children, className = '', id = '' }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const scrollTrigger = {
      trigger: sectionRef.current,
      start: 'top 20%',
      markers: true,
      toggleActions: 'play none none reverse',
    }

    gsap.fromTo(
      contentRef.current.querySelectorAll('.anim-text'),
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        scrollTrigger
      }
    );
    gsap.fromTo(
      contentRef.current.querySelectorAll('.anim-long-text'),
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.02,
        scrollTrigger
      }
    );
    gsap.fromTo(
      contentRef.current.querySelectorAll('.glassmorphism'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.4,
        stagger: 0.4,
        scrollTrigger
      }
    );
    gsap.fromTo(
      contentRef.current.querySelectorAll('.anim-number'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.4,
        stagger: 0.4,
        scrollTrigger
      }
    );

    gsap.fromTo(
      contentRef.current.querySelectorAll('.anim-img'),
      {
        scaleY: 1,
      },
      {
        scaleY: 0,
        duration: 0.6,
        stagger: 0.02,
        scrollTrigger
      }
    );

  }, []);

  return (
    <section ref={sectionRef} id={id}>
      <div
        className={`h-dvh w-screen flex flex-col justify-center items-center gap-8 ${className}`}
        ref={contentRef}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionMuseum;

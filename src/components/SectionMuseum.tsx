import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionMuseum = ({ children, className = '', id = '' }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const textElements = contentRef.current.querySelectorAll('.anim-text');
      const images = contentRef.current.querySelectorAll('.anim-img');
      const longTextElements = contentRef.current.querySelectorAll('.anim-long-text');
      const numberElements = contentRef.current.querySelectorAll('.anim-number');
      
      const scrollTriggerConfig = {
        trigger: sectionRef.current,
        start: "20% 80%",
        end: "center center",
        toggleActions: "play none none reverse",
      };

      const mainTl = gsap.timeline({
        scrollTrigger: scrollTriggerConfig,
        defaults: {
          ease: "power2.out",
        }
      });

      if (textElements.length > 0) {
        textElements.forEach((element: HTMLElement) => {
          mainTl.fromTo(
            element,
            {
              opacity: 0,
              y: 100,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
            },
            "<+=0.1"
          );
        });
      }

      if (longTextElements.length > 0) {
        mainTl.fromTo(
          longTextElements,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.02,
          },
          "-=0.2"
        );
      }

      if (numberElements.length > 0) {
        mainTl.fromTo(
          numberElements,
          {
            opacity: 0,
            scale: 0,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
          },
          "-=0.2"
        );
      }

      if (images.length > 0) {
        mainTl.fromTo(
          images,
          {
            scaleY: 1,
          },
          {
            scaleY: 0,
            duration: 0.8,
            stagger: 0.2,
          },
          "-=0.2"
        );
      }
    }, sectionRef);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      ctx.revert();
    };
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
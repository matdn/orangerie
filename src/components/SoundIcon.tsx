import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SoundIcon = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);
  const paths = useRef([]);
  
  // Points de départ (état "point")
  const pointPositions = [
    'M2 12h0.01',
    'M6 12h0.01',
    'M10 12h0.01',
    'M14 12h0.01', 
    'M18 12h0.01',
    'M22 12h0.01'
  ];

  // Positions finales (barres sonores)
  const barPositions = [
    'M2 10v3',
    'M6 6v11',
    'M10 3v18',
    'M14 8v7',
    'M18 5v13',
    'M22 10v3'
  ];

  useGSAP(() => {
    // Animation initiale vers les points
    paths.current.forEach((path, i) => {
      gsap.set(path, {
        attr: { d: pointPositions[i] }
      });
    });
  }, []);

  const toggleSound = () => {
    setIsPlaying(!isPlaying);
    
    const tl = gsap.timeline();
    
    paths.current.forEach((path, i) => {
      tl.to(path, {
        attr: { d: isPlaying ? pointPositions[i] : barPositions[i] },
        duration: 0.4,
        ease: "power2.inOut"
      }, i * 0.05);
    });

    if (!isPlaying) {
      // Animation continue des barres
      tl.to(paths.current, {
        duration: 0.6,
        scaleY: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        stagger: {
          each: 0.1,
          repeat: -1
        }
      });
    }
  };

  return (
    <svg
      ref={soundRef}
      className="footer-icon text-white cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={toggleSound}
    >
      {barPositions.map((_, i) => (
        <path
          key={i}
          ref={el => paths.current[i] = el}
        />
      ))}
    </svg>
  );
};

export default SoundIcon;
import { AudioMixerManager, CommonAssetsManager } from '@cooker/common';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { forwardRef, useRef } from 'react';
import { AssetsUtils } from '../game/core/utils/AssetsUtils';
import { SoundId } from '../game/constants/games/SoundId';


interface SoundIconProps {
  className?: string;
  isPlaying?: boolean;
  [key: string]: any;
}

export const SoundIcon = forwardRef<HTMLDivElement, SoundIconProps>(
  ({ className = '', isPlaying = false, ...props }, ref) => {
    const barsRef = useRef<(HTMLDivElement | null)[]>([]);

    const srcSong = AssetsUtils.GetAssetURL('sounds/mainSound.mp3');

    const audioPause = () => {
      AudioMixerManager.GetAudioMixer(SoundId.MAIN_SOUND)
    };
      

    const audioPlay = () => {
      CommonAssetsManager.UpdateSound(SoundId.MAIN_SOUND, {
        src: srcSong,
        volume: 0.25,
        mute: false,
      });
    };

    useGSAP(() => {
      gsap.killTweensOf(barsRef.current);

      if (isPlaying) {
        audioPlay();
        const timeline = gsap.timeline();

        timeline.to(barsRef.current, {
          scaleY: () => gsap.utils.random(2, 20),
          duration: 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          stagger: {
            each: 0.05,
            from: 'center',
          },
        });

        barsRef.current.forEach((bar, index) => {
          gsap.to(bar, {
            scaleY: () => gsap.utils.random(3, 12),
            duration: 0.3 + (index % 3) * 0.1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.05,
          });
        });
      } else {
        audioPause();
        gsap.to(barsRef.current, {
          scaleY: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    }, [isPlaying]);

    return (
      <div
        ref={ref}
        className={`flex items-center justify-center gap-0.5 ${className}`}
        {...props}
      >
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            ref={(el) => (barsRef.current[index] = el)}
            className='w-0.5 h-0.5 bg-white'
          />
        ))}
      </div>
    );
  }
);

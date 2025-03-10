import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { TheatersManager, TheatersProxy, ViewsProxy } from 'pancake';
import React, { useState } from 'react';
import SoundIcon from '../../../../components/SoundIcon';
import { TheaterId } from '../../../constants/theaters/TheaterId';
import { ViewId } from '../../../constants/views/ViewId';
import ReactViewBase, {
  TransitionProps,
} from '../../../core/_engine/reacts/views/bases/ReactViewBase';
import { LobbyThreeTheater } from '../../../theaters/LobbyThreeTheater';
import LobbyThreeView from '../../threes/LobbyThreeView';

gsap.registerPlugin(CustomEase);

const LobbyReactView: React.FC<TransitionProps> = (props) => {
  const [musicIsPlaying, setMusicIsPlaying] = useState(false);
  const [isClickable, setIsClickable] = useState(false);

  const toggleMusic = () => {
    setMusicIsPlaying((prev) => !prev);
  };

  const tl = gsap.timeline();

  const timelineAnimation = () => {
    tl.from(
      '.header-icon',
      {
        duration: 1,
        delay: 1,
        opacity: 0,
        ease: 'power1.out',
      },
      '<'
    );
    tl.from(
      '.main-text',
      {
        duration: 1,
        opacity: 0,
        yPercent: '50',
      },
      '<'
    );
    tl.from(
      '.span-text',
      {
        duration: 1,
        opacity: 0,
        ease: 'power1.out',
      },
      '>0.02'
    );
    tl.from(
      '.button-container',
      {
        duration: 1,
        opacity: 0,
        yPercent: '100',
        ease: 'power1.out',
      },
      '>0.02'
    );
    tl.from(
      '.footer-text',
      {
        duration: 0.5,
        opacity: 0.2,
        yPercent: '100',
        ease: 'power1.out',
      },
      '<'
    );
    setIsClickable(true);
  };

  useGSAP(() => {
    timelineAnimation();
  }, []);

  const showMuseumTheater = () => {
    if (!isClickable) return null;
    ViewsProxy.GetView<LobbyThreeView>(ViewId.THREE_LOBBY).animationStatus(
      true
    );
    tl.to('.header-icon', {
      duration: 1,
      opacity: 0,
      ease: 'power1.out',
    });
    tl.to(
      '.main-text',
      {
        duration: 1,
        opacity: 0,
        y: '50',
        ease: 'power1.out',
      },
      '<'
    );
    tl.to(
      '.span-text',
      {
        duration: 1,
        opacity: 0,
        y: '50',
        ease: 'power1.out',
      },
      '<'
    );
    tl.to(
      '.borderScreen',
      {
        duration: 1,
        opacity: 0,
        ease: 'power1.out',
      },
      '<'
    );
    setTimeout(() => {
      const theater = TheatersProxy.GetTheater<LobbyThreeTheater>(
        TheaterId.LOBBY
      );
      theater.setFogScale(350);
      TheatersManager.HideById(TheaterId.LOBBY);
      TheatersManager.ShowById(TheaterId.MUSEUM);
    }, 2000);
  };

  return (
    <ReactViewBase
      {...props}
      className='fixed inset-0 z-50 w-full flex flex-col'
    >
      <div className='borderScreen'></div>
      <div className='w-full p-8 px-12 flex items-center justify-between'>
        <div className='overflow-hidden'>
          <svg
            className='header-icon'
            width='57'
            height='34'
            viewBox='0 0 57 34'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M2 7.09588V12.0742C19.7697 15.7317 45.0223 19.2064 56 1H31.6161C33.0969 7.90867 31.6161 18.4749 2 7.09588ZM1 25.9565V20.7898C19.36 16.9938 40.6576 14.1044 52 33H7.42597C32.314 24.0586 24.868 16.3611 1 25.9565Z'
              fill='white'
            />
            <path
              d='M2 12.0742H1.5V12.4818L1.8992 12.5639L2 12.0742ZM2 7.09588L2.17933 6.62915L1.5 6.36814V7.09588H2ZM56 1L56.4282 1.25818L56.8853 0.5H56V1ZM31.6161 1V0.5H30.9976L31.1272 1.10479L31.6161 1ZM1 20.7898L0.898764 20.3001L0.5 20.3826V20.7898H1ZM1 25.9565H0.5V26.6965L1.1865 26.4205L1 25.9565ZM52 33V33.5H52.8833L52.4287 32.7427L52 33ZM7.42597 33L7.25691 32.5294L7.42597 33.5V33ZM2.5 12.0742V7.09588H1.5V12.0742H2.5ZM55.5718 0.741821C50.1939 9.66106 41.3145 13.2972 31.4993 14.2383C21.6729 15.1806 10.9808 13.4122 2.1008 11.5845L1.8992 12.5639C10.7889 14.3937 21.6079 16.1914 31.5947 15.2338C41.5926 14.2751 50.8284 10.5453 56.4282 1.25818L55.5718 0.741821ZM31.6161 1.5H56V0.5H31.6161V1.5ZM1.82067 7.56262C9.24599 10.4155 14.9346 11.9037 19.2718 12.412C23.6037 12.9197 26.6358 12.4555 28.7055 11.3465C30.7979 10.2254 31.8469 8.47774 32.2663 6.57488C32.6815 4.69134 32.4823 2.65554 32.105 0.89521L31.1272 1.10479C31.4903 2.7988 31.6612 4.67452 31.2898 6.35961C30.9226 8.02538 30.028 9.50343 28.2332 10.4651C26.4159 11.4389 23.6173 11.9145 19.3882 11.4188C15.1646 10.9239 9.56206 9.46572 2.17933 6.62915L1.82067 7.56262ZM0.5 20.7898V25.9565H1.5V20.7898H0.5ZM52.4287 32.7427C46.6646 23.1401 38.3548 19.0705 29.1955 17.8896C20.0667 16.7127 10.0782 18.4023 0.898764 20.3001L1.10124 21.2794C10.2818 19.3813 20.1221 17.7281 29.0677 18.8814C37.9828 20.0308 45.993 23.9643 51.5713 33.2573L52.4287 32.7427ZM7.42597 33.5H52V32.5H7.42597V33.5ZM1.1865 26.4205C7.1272 24.0322 12.0264 22.7282 15.6392 22.2473C17.4471 22.0066 18.9162 21.9742 20.0248 22.1072C21.1551 22.2428 21.822 22.5398 22.1324 22.8696C22.2762 23.0224 22.3453 23.1831 22.3586 23.36C22.3725 23.5452 22.3274 23.7855 22.1759 24.0884C21.8677 24.705 21.1687 25.4813 19.9772 26.3785C17.6065 28.1638 13.4592 30.3012 7.25691 32.5294L7.59502 33.4706C13.8368 31.2281 18.0917 29.0502 20.5788 27.1773C21.8161 26.2455 22.6598 25.3569 23.0704 24.5356C23.2784 24.1196 23.3867 23.6977 23.3558 23.2852C23.3242 22.8645 23.1503 22.4921 22.8606 22.1843C22.3039 21.5927 21.342 21.2581 20.1439 21.1143C18.924 20.968 17.3651 21.0087 15.5073 21.256C11.7889 21.751 6.8068 23.0832 0.813497 25.4926L1.1865 26.4205Z'
              fill='white'
            />
          </svg>
        </div>
        <button
          className='px-8 py-2 rounded-full bg-white'
          onClick={() => timelineAnimation()}
        >
          <div className='flex items-center gap-8'>
            <span className='text-black text-sm font-light tracking-wide'>
              Restart
            </span>
          </div>
        </button>
      </div>
      <div className='h-full w-full flex flex-col items-center justify-center'>
        <div className='overflow-hidden'>
          <h1 className='main-text font-norman text-9xl text-white'>
            Les Rêveries
          </h1>
        </div>
        <div className='overflow-hidden relative'>
          <h1 className='main-text font-norman text-[10rem] leading-[1.5] text-white'>
            L'Orangerie
          </h1>
          <span className='span-text font-norman absolute top-24 left-40 text-white text-5xl'>
            de
          </span>
        </div>
        <div className='overflow-hidden mt-5'>
          <button
            className={`button-container relative px-8 py-2 rounded-full border border-white backdrop-blur-md bg-white/5 ${isClickable ? 'cursor-pointer' : 'cursor-none'} `}
            onClick={showMuseumTheater}
          >
            <div className='button-content flex items-center gap-8'>
              <span className='text-white/90 text-sm tracking-wide uppercase font-semibold'>
                Explore
              </span>
              <svg
                width='20'
                height='9'
                viewBox='0 0 20 9'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M-1.5299e-07 4.5L19 4.5M19 4.5L13 0.499999M19 4.5L13 8'
                  stroke='white'
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
      <div className='w-full p-8 px-12 flex items-center justify-between'>
        <div className='overflow-hidden'>
          <p className='footer-text text-white/50 uppercase text-[0.8rem] leading-none'>
            Unofficial museum website
          </p>
        </div>
        <div className='overflow-hidden cursor-pointer'>
          <SoundIcon
            isPlaying={musicIsPlaying}
            className='h-6'
            onClick={toggleMusic}
          />
        </div>
      </div>
    </ReactViewBase>
  );
};

export default LobbyReactView;

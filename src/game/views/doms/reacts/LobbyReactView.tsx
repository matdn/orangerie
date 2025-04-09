import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TheatersManager, TheatersProxy, ViewsProxy } from 'pancake';
import React, { useRef, useState } from 'react';
import Button from '../../../../components/Button';
import { TheaterId } from '../../../constants/theaters/TheaterId';
import { ViewId } from '../../../constants/views/ViewId';
import {
  ReactViewBase,
  TransitionProps,
} from '../../../core/_engine/reacts/views/bases/ReactViewBase';
import { LobbyThreeTheater } from '../../../theaters/LobbyThreeTheater';
import LobbyThreeView from '../../threes/LobbyThreeView';
import PreloadReactView from './preloads/PreloadReactView';

const LobbyReactView: React.FC<TransitionProps> = (props) => {
  const [isClickable, setIsClickable] = useState(false);
  const pageTransition = useRef<HTMLDivElement>(null);
  const borderScreen = useRef<HTMLDivElement>(null);
  const mainTextUp = useRef<HTMLHeadingElement>(null);
  const mainTextDown = useRef<HTMLDivElement>(null);
  const buttonContainer = useRef<HTMLDivElement>(null);
  const footerText = useRef<HTMLParagraphElement>(null);
  const creditText = useRef<HTMLDivElement>(null);

  const tl = gsap.timeline({
    onComplete: () => {
      setIsClickable(true);
    },
  });

  const timelineAnimation = () => {
    tl.to(pageTransition.current, {
      yPercent: -100,
      duration: 1,
      delay: 0,
      ease: 'power2.inOut',
    });
    tl.from(
      borderScreen.current,
      {
        duration: 1,
        opacity: 0.4,
        ease: 'power1.out',
      },
      '<'
    );
    tl.from(
      mainTextUp.current,
      {
        delay: 0.5,
        duration: 1.5,
        opacity: 0,
        yPercent: '50',
        ease: 'power1.out',
      },
      '<'
    );
    tl.from(
      mainTextDown.current,
      {
        duration: 1.5,
        opacity: 0,
        yPercent: '50',
        ease: 'power1.out',
      },
      '<'
    );
    tl.from(
      buttonContainer.current,
      {
        duration: 1.2,
        opacity: 0,
        filter: 'blur(10px)',
        ease: 'expo.out',
      },
      '<0.5'
    );
    tl.from(
      footerText.current,
      {
        duration: 1,
        opacity: 0,
        yPercent: '100',
        ease: 'power1.out',
      },
      '<0.2'
    );
    tl.from(
      creditText.current,
      {
        duration: 1,
        opacity: 0,
        yPercent: '100',
        ease: 'power1.out',
      },
      '<0.2'
    );
  };

  useGSAP(() => {
    timelineAnimation();
  }, []);

  const showMuseumTheater = () => {
    if (!isClickable) return null;
    const lobbyView = ViewsProxy.GetView<LobbyThreeView>(ViewId.THREE_LOBBY);
    lobbyView.triggerFogAndZoomOut();
    tl.to(
      mainTextUp.current,
      {
        duration: 1,
        opacity: 0,
        yPercent: '-100',
        ease: 'power1.out',
      },
      '<'
    );
    tl.to(
      mainTextDown.current,
      {
        duration: 1,
        opacity: 0,
        yPercent: '100',
        ease: 'power1.out',
      },
      '<'
    );
    tl.to(
      buttonContainer.current,
      {
        duration: 1,
        opacity: 0,
        yPercent: '100',
        filter: 'blur(10px)',
        ease: 'expo.out',
      },
      '<'
    );
    tl.to(
      footerText.current,
      {
        duration: 1,
        opacity: 0,
        yPercent: '100',
        ease: 'power1.out',
      },
      '<'
    );
    tl.to(
      borderScreen.current,
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
      {/* <PreloadReactView /> */}
      {/* <div
        ref={pageTransition}
        className='fixed inset-0 bg-white w-screen h-dvh page-transition z-[100]'
      ></div> */}
      <div ref={borderScreen} className='borderScreen'></div>
      <div className='w-full px-8 md:px-12 p-8'></div>
      <div className='h-full w-full flex flex-col items-center justify-center'>
        <div className='overflow-hidden'>
          <h1
            ref={mainTextUp}
            className='main-text main-text-up font-norman text-7xl md:text-9xl text-white will-change-transform'
          >
            Les Rêveries
          </h1>
        </div>
        <div className='overflow-hidden relative'>
          <div
            ref={mainTextDown}
            className='main-text main-text-down will-change-transform'
          >
            <h1 className='font-norman text-7xl md:text-[10rem] leading-[1.5] text-white'>
              L'Orangerie
            </h1>
            <span className='font-norman absolute top-10 left-[4.5rem] md:top-24 md:left-40 text-white text-2xl md:text-5xl'>
              de
            </span>
          </div>
        </div>
        <div className='overflow-hidden mt-5 rounded-full'>
          <div ref={buttonContainer}>
            <Button
              title='Explore'
              onClick={showMuseumTheater}
              iconPosition='right'
            />
          </div>
        </div>
      </div>
      <div className='w-full px-8 md:px-12 py-4 md:py-8 flex flex-col md:flex-row items-end md:items-start justify-between gap-2'>
        <div className='overflow-hidden'>
          <p
            ref={footerText}
            className='footer-text will-change-transform text-white/50 uppercase text-[0.8rem] leading-none'
          >
            Unofficial museum website
          </p>
        </div>
        <div className='overflow-hidden pb-1'>
          <div
            className='flex flex-row items-end justify-center gap-1 text-white/50 text-[0.8rem]'
            ref={creditText}
          >
            <a
              href='https://github.com/matdn'
              target='_blank'
              className='font-bold underline-effect'
            >
              MATIS DENE
            </a>
            <p>&</p>
            <a
              href='https://august1.dev/'
              target='_blank'
              className='font-bold underline-effect'
            >
              AUGUSTIN BRIOLON
            </a>
          </div>
        </div>
      </div>
    </ReactViewBase>
  );
};

export default LobbyReactView;

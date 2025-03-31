import { useGSAP } from '@gsap/react';
import { useLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { CornerRightUp, MoveDown, MoveLeft, View } from 'lucide-react';
import { TheatersManager, ViewsManager, ViewsProxy } from 'pancake';
import React, { useEffect, useRef } from 'react';
import Button from '../../../../components/Button';
import SectionMuseum from '../../../../components/SectionMuseum';
import { TextMuseum } from '../../../../components/TextMuseum';
import { TheaterId } from '../../../constants/theaters/TheaterId';
import {
  ReactViewBase,
  TransitionProps,
} from '../../../core/_engine/reacts/views/bases/ReactViewBase';
import { ViewId } from '../../../constants/views/ViewId';

const MuseumReactView: React.FC<TransitionProps> = (props) => {
  const lenis = useLenis();
  const pageTransition = useRef<HTMLDivElement>(null);
  const convertTextToArray = (text: string) => {
    return text.split(' ');
  };

  const scrollToNextSection = (id: string) => {
    lenis.scrollTo(id);
  };

  const backToLobby = () => {
    TheatersManager.HideById(TheaterId.MUSEUM);
    ViewsManager.ShowById(ViewId.THREE_LOBBY);
    TheatersManager.ShowById(TheaterId.LOBBY);
  };

  useEffect(() => {
    const handleScroll = () => {
      const nympheasSection = document.getElementById('nympheas');
      if (!nympheasSection) return;

      const rect = nympheasSection.getBoundingClientRect();
      const isVisible =
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2;

      if (isVisible) {
        console.log('🎥 Passage au mode empties !');
        window.dispatchEvent(new CustomEvent('switchToEmptyMode'));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollMax =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollY / scrollMax;
      window.dispatchEvent(
        new CustomEvent('museumScroll', {
          detail: { progress: scrollProgress },
        })
      );
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useGSAP(() => {
    gsap.to(pageTransition.current, {
      yPercent: -100,
      duration: 1,
      delay: 0.5,
      ease: 'power2.inOut',
    });
  }, []);

  return (
    <ReactViewBase {...props} className='w-screen h-fit z-50 relative'>
      <div
        ref={pageTransition}
        className='fixed inset-0 bg-white w-screen h-dvh page-transition z-[100]'
      ></div>
      <div className='borderScreenMuseum'></div>
      <div className='w-full overflow-y-scroll'>
        <SectionMuseum id='orangerie'>
          <div className='overflow-hidden'>
            <h4 className='anim-text font-instrument-italic text-2xl md:text-3xl'>
              Chapitre 01
            </h4>
          </div>
          <div className='flex flex-col justify-center items-center glassmorphism'>
            <div className='overflow-hidden'>
              <h2 className='anim-text font-nhaasgrotesk-bold uppercase text-5xl md:text-8xl'>
                L'Orangerie
              </h2>
            </div>
            <div className='overflow-hidden'>
              <h3 className='anim-text font-instrument text-2xl md:text-3xl uppercase'>
                à l’origine il y a la serre
              </h3>
            </div>
          </div>
          <button
            className='anim-number bg-white px-1 py-4 rounded-full'
            onClick={() => scrollToNextSection('#construction')}
          >
            <MoveDown strokeWidth={1} size={24} className='animate-bounce' />
          </button>
        </SectionMuseum>

        <SectionMuseum id='construction'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className='overflow-hidden'>
              <h2 className='anim-text font-nhaasgrotesk-bold uppercase text-3xl md:text-5xl'>
                1852
              </h2>
            </div>
            <div className='overflow-hidden'>
              <h4 className='anim-text font-nhaasgrotesk-light text-xl md:text-2xl uppercase'>
                (Construction)
              </h4>
            </div>
          </div>
          <div className='glassmorphism'>
            <h3 className='font-instrument text-2xl md:text-3xl max-w-xs md:max-w-xl text-center'>
              {convertTextToArray(TextMuseum.SECTION_ONE).map((word, index) => (
                <span key={index} className='inline-block overflow-hidden'>
                  <span className='anim-long-text inline-block'>
                    {word}
                    {index !==
                      convertTextToArray(TextMuseum.SECTION_ONE).length - 1 &&
                      '\u00A0'}
                  </span>
                </span>
              ))}
            </h3>
          </div>
        </SectionMuseum>

        <SectionMuseum className='md:!w-[50vw] md:pl-10 md:!items-start'>
          <div className='w-full flex justify-between items-center max-w-xs md:max-w-none'>
            <div className='overflow-hidden'>
              <h2 className='anim-text font-instrument text-3xl md:text-5xl'>
                Le dernier des Orangers
              </h2>
            </div>
            <p className='anim-number bg-black rounded-full  p-2 w-5 h-5 md:p-4 flex items-center justify-center aspect-square font-instrument text-white text-lg md:text-xl'>
              1
            </p>
          </div>

          <div className='glassmorphism max-w-xs md:max-w-none'>
            <h3 className='font-instrument text-2xl md:text-3xl max-w-xl text-center md:text-left text-pretty'>
              {convertTextToArray(TextMuseum.SECTION_TWO).map((word, index) => (
                <span key={index} className='inline-block overflow-hidden'>
                  <span className='anim-long-text inline-block'>
                    {word}
                    {index !==
                      convertTextToArray(TextMuseum.SECTION_TWO).length - 1 &&
                      '\u00A0'}
                  </span>
                </span>
              ))}
            </h3>
          </div>
        </SectionMuseum>

        <SectionMuseum>
          <div className='overflow-hidden'>
            <h4 className='anim-text font-instrument-italic text-2xl md:text-3xl'>
              Chapitre 02
            </h4>
          </div>
          <div className='flex flex-col justify-center items-center glassmorphism max-w-xs md:max-w-none  '>
            <div className='overflow-hidden'>
              <h2 className='anim-text text-center font-nhaasgrotesk-bold uppercase text-5xl md:text-8xl'>
                Claude Monet
              </h2>
            </div>
            <div className='overflow-hidden'>
              <h3 className='anim-text font-instrument text-2xl md:text-3xl uppercase'>
                l'Architecte de la Lumière
              </h3>
            </div>
          </div>
          <button
            className='anim-number bg-white px-1 py-4 rounded-full'
            onClick={() => scrollToNextSection('#impressionniste')}
          >
            <MoveDown strokeWidth={1} size={24} className='animate-bounce' />
          </button>
        </SectionMuseum>

        <SectionMuseum id='impressionniste'>
          <div className='overflow-hidden'>
            <img
              src='assets/images/autoportrait.webp'
              alt='Peinture Autoportrait'
              className='anim-img max-w-xs md:max-w-sm h-auto'
            />
          </div>
          <div className='overflow-hidden'>
            <h4 className='anim-text font-instrument text-3xl md:text-5xl uppercase'>
              Claude Monet
            </h4>
          </div>

          <div className='overflow-hidden'>
            <h3 className='anim-text font-nhaasgrotesk-light text-2xl md:text-3xl max-w-xl text-center'>
              Le père de l'impressionniste
            </h3>
          </div>
        </SectionMuseum>

        <SectionMuseum className='md:!flex-row'>
          <div className='hidden md:flex'>
            <div className='overflow-hidden'>
              <img
                src='assets/images/soleil-levant.webp'
                alt='Peinture Autoportrait'
                className='anim-img max-w-xs md:max-w-sm h-auto'
              />
            </div>
            <p className='anim-number -ml-4 mt-12 z-10 bg-black rounded-full w-5 h-5 p-2 md:p-4 flex items-center justify-center aspect-square font-instrument text-white text-lg md:text-xl'>
              2
            </p>
          </div>

          <div className='flex flex-col justify-center items-center md:items-left gap-4 md:mt-40'>
            <div>
              <div className='overflow-hidden'>
                <h2 className='anim-text font-nhaasgrotesk-bold uppercase text-3xl md:text-5xl'>
                  1874
                </h2>
              </div>
              <div className='overflow-hidden'>
                <h4 className='anim-text font-nhaasgrotesk-light text-xl md:text-2xl uppercase'>
                  Naissance de l'impressionnisme
                </h4>
              </div>
            </div>
            <div className='glassmorphism md:ml-8 max-w-xs md:max-w-none'>
              <h3 className='font-instrument text-2xl md:text-3xl max-w-xl text-left'>
                {convertTextToArray(TextMuseum.SECTION_THREE).map(
                  (word, index) => (
                    <span key={index} className='inline-block overflow-hidden'>
                      <span className='anim-long-text inline-block'>
                        {word}
                        {index !==
                          convertTextToArray(TextMuseum.SECTION_THREE).length -
                          1 && '\u00A0'}
                      </span>
                    </span>
                  )
                )}
              </h3>
            </div>
          </div>
        </SectionMuseum>

        <SectionMuseum id='chapitre-3'>
          <div className='overflow-hidden'>
            <h4 className='anim-text font-instrument-italic text-2xl md:text-3xl'>
              Chapitre 03
            </h4>
          </div>
          <div className='flex flex-col justify-center items-center glassmorphism max-w-xs md:max-w-none'>
            <div className='overflow-hidden'>
              <h2 className='font-nhaasgrotesk-bold uppercase text-5xl md:text-8xl text-center'>
                Les Nymphéas
              </h2>
            </div>
            <div className='overflow-hidden'>
              <h3 className='font-instrument text-2xl md:text-3xl uppercase'>
                l’ultime chef-dœuvre
              </h3>
            </div>
          </div>
          <button
            className='anim-number bg-white px-1 py-4 rounded-full'
            onClick={() => scrollToNextSection('#nympheas')}
          >
            <MoveDown strokeWidth={1} size={24} className='animate-bounce' />
          </button>
        </SectionMuseum>

        <SectionMuseum id='nympheas'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className='overflow-hidden'>
              <h2 className='anim-text font-nhaasgrotesk-bold uppercase text-3xl md:text-5xl text-center'>
                L'ultime chef-d'œuvre
              </h2>
            </div>
            <div className='overflow-hidden'>
              <h4 className='anim-text font-nhaasgrotesk-light text-xl md:text-2xl uppercase'>
                1914-1926
              </h4>
            </div>
          </div>
          <div className='glassmorphism max-w-xs md:max-w-none'>
            <h3 className='font-instrument text-2xl md:text-3xl max-w-xl text-center'>
              {convertTextToArray(TextMuseum.SECTION_FOUR).map(
                (word, index) => (
                  <span key={index} className='inline-block overflow-hidden'>
                    <span className='anim-long-text inline-block'>
                      {word}
                      {index !==
                        convertTextToArray(TextMuseum.SECTION_FOUR).length -
                        1 && '\u00A0'}
                    </span>
                  </span>
                )
              )}
            </h3>
          </div>
        </SectionMuseum>

        <SectionMuseum className='md:!w-[50vw] md:pl-10'>
          <div className='flex flex-col justify-center items-left gap-4 mt-40'>
            <div>
              <div className='overflow-hidden'>
                <h2 className='anim-text font-nhaasgrotesk-bold uppercase text-3xl md:text-5xl'>
                  Matin
                </h2>
              </div>
              <div className='overflow-hidden'>
                <h4 className='anim-text font-nhaasgrotesk-light text-xl md:text-2xl uppercase'>
                  1916-1922
                </h4>
              </div>
            </div>
            <div className='glassmorphism max-w-xs md:max-w-none md:ml-8'>
              <h3 className='font-instrument text-2xl md:text-3xl max-w-xl text-left'>
                {convertTextToArray(TextMuseum.SECTION_FIVE).map(
                  (word, index) => (
                    <span key={index} className='inline-block overflow-hidden'>
                      <span className='anim-long-text inline-block'>
                        {word}
                        {index !==
                          convertTextToArray(TextMuseum.SECTION_FIVE).length -
                          1 && '\u00A0'}
                      </span>
                    </span>
                  )
                )}
              </h3>
            </div>
          </div>
        </SectionMuseum>

        <SectionMuseum className='md:!items-end md:pr-10'>
          <div className='flex flex-col justify-center items-end gap-4 mt-40'>
            <div>
              <div className='overflow-hidden'>
                <h2 className='anim-text font-nhaasgrotesk-bold uppercase text-3xl md:text-5xl'>
                  Les Nuages
                </h2>
              </div>
              <div className='overflow-hidden'>
                <h4 className='anim-text font-nhaasgrotesk-light text-xl md:text-2xl uppercase text-right'>
                  1914-1918
                </h4>
              </div>
            </div>
            <div className='glassmorphism max-w-xs md:max-w-none md:mr-8'>
              <h3 className='font-instrument text-2xl md:text-3xl max-w-xs md:max-w-xl text-right'>
                {convertTextToArray(TextMuseum.SECTION_SIX).map(
                  (word, index) => (
                    <span key={index} className='inline-block overflow-hidden'>
                      <span className='anim-long-text inline-block'>
                        {word}
                        {index !==
                          convertTextToArray(TextMuseum.SECTION_SIX).length -
                          1 && '\u00A0'}
                      </span>
                    </span>
                  )
                )}
              </h3>
            </div>
          </div>
        </SectionMuseum>

        <SectionMuseum className='md:!w-[50vw] md:pl-10'>
          <div className='flex flex-col md:justify-center items-left gap-4 mt-40'>
            <div>
              <div className='overflow-hidden'>
                <h2 className='anim-text font-nhaasgrotesk-bold uppercase text-3xl md:text-5xl'>
                  Soleil couchant
                </h2>
              </div>
              <div className='overflow-hidden'>
                <h4 className='anim-text font-nhaasgrotesk-light text-xl md:text-2xl uppercase'>
                  1915-1921
                </h4>
              </div>
            </div>
            <div className='glassmorphism max-w-xs md:max-w-none md:ml-8'>
              <h3 className='font-instrument text-2xl md:text-3xl max-w-xl text-left'>
                {convertTextToArray(TextMuseum.SECTION_SEVEN).map(
                  (word, index) => (
                    <span key={index} className='inline-block overflow-hidden'>
                      <span className='anim-long-text inline-block'>
                        {word}
                        {index !==
                          convertTextToArray(TextMuseum.SECTION_SEVEN).length -
                          1 && '\u00A0'}
                      </span>
                    </span>
                  )
                )}
              </h3>
            </div>
          </div>
        </SectionMuseum>

        <SectionMuseum className='md:!items-end md:pr-10'>
          <div className='flex flex-col justify-center items-end gap-4 mt-40'>
            <div>
              <div className='overflow-hidden'>
                <h2 className='anim-text font-nhaasgrotesk-bold uppercase text-3xl md:text-5xl'>
                  Reflets verts
                </h2>
              </div>
              <div className='overflow-hidden'>
                <h4 className='anim-text font-nhaasgrotesk-light text-xl md:text-2xl uppercase text-right'>
                  1920-1926
                </h4>
              </div>
            </div>
            <div className='glassmorphism max-w-xs md:max-w-none md:mr-8'>
              <h3 className='font-instrument text-2xl md:text-3xl max-w-xl text-right text-pretty'>
                {convertTextToArray(TextMuseum.SECTION_EIGHT).map(
                  (word, index) => (
                    <span key={index} className='inline-block overflow-hidden'>
                      <span className='anim-long-text inline-block'>
                        {word}
                        {index !==
                          convertTextToArray(TextMuseum.SECTION_EIGHT).length -
                          1 && '\u00A0'}
                      </span>
                    </span>
                  )
                )}
              </h3>
            </div>
          </div>
        </SectionMuseum>

        <SectionMuseum className='relative'>
          <div className='absolute inset-0 -z-10 h-dvh w-screen flex justify-center items-center anim-blur'></div>
          <div className='h-dvh w-screen flex flex-col justify-center items-center gap-12'>
            <div className='overflow-hidden'>
              <h1 className='anim-text font-nhaasgrotesk-bold uppercase text-5xl md:text-8xl text-center'>
                Fin de la visite
              </h1>
            </div>

            <Button
              title='Refaire la visite'
              onClick={() => scrollToNextSection('#orangerie')}
              icon={<CornerRightUp strokeWidth={2.5} size={16} />}
              className='!border-black flex items-center gap-4 !text-black anim-button'
            />

            <div className='flex flex-col items-end justify-center absolute bottom-3 right-3'>
              <p>By </p>
              <a
                href='https://github.com/matdn'
                target='_blank'
                className='font-bold '
              >
                {' '}
                Matis Dene
              </a>
              <a
                href='https://august1.dev/'
                target='_blank'
                className='font-bold '
              >
                Augustin Briolon
              </a>{' '}
            </div>

            <div className='absolute bottom-3 left-3'>
              <button className='anim-number group' onClick={backToLobby}>
                <div className='flex items-center gap-4'>
                  <MoveLeft strokeWidth={1.5} size={16} />
                  <span className='font-bold text-black/90 text-xs tracking-wide uppercase transition-all duration-300 group-hover:-translate-x-1'>
                    Retour à l'accueil
                  </span>
                </div>
              </button>
            </div>
          </div>
        </SectionMuseum>
      </div>
    </ReactViewBase>
  );
};

export default MuseumReactView;

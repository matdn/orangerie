import { useGSAP } from '@gsap/react';
import { useLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { CornerRightUp } from 'lucide-react';
import { TheatersManager } from 'pancake';
import React, { useEffect } from 'react';
import Button from '../../../../components/Button';
import SectionMuseum from '../../../../components/SectionMuseum';
import { TextMuseum } from '../../../../components/TextMuseum';
import { TheaterId } from '../../../constants/theaters/TheaterId';
import {
  ReactViewBase,
  TransitionProps,
} from '../../../core/_engine/reacts/views/bases/ReactViewBase';

const MuseumReactView: React.FC<TransitionProps> = (props) => {
  const lenis = useLenis();
  const convertTextToArray = (text: string) => {
    return text.split(' ');
  };

  const scrollToNextSection = (id: string) => {
    lenis.scrollTo(id);
  };

  const backToLobby = () => {
    TheatersManager.HideById(TheaterId.MUSEUM);
    TheatersManager.ShowById(TheaterId.LOBBY);
  };

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
    gsap.to('.page-transition', {
      yPercent: -100,
      duration: 1,
      delay: 0.5,
      ease: 'power2.inOut',
    });
  }, []);

  return (
    <ReactViewBase {...props} className='w-screen h-fit z-50 relative'>
      <div className='fixed inset-0 bg-white w-screen h-dvh page-transition z-[100]'></div>
      <div className='borderScreenMuseum'></div>
      <div className='w-full overflow-y-scroll'>
        <SectionMuseum id='orangerie'>
          <div className='overflow-hidden'>
            <h4 className='anim-text font-instrument-italic text-3xl'>
              Chapitre 01
            </h4>
          </div>
          <div className='flex flex-col justify-center items-center glassmorphism'>
            <div className='overflow-hidden'>
              <h2 className='anim-text font-nhaasgrotesk-bold uppercase text-8xl'>
                L'Orangerie
              </h2>
            </div>
            <div className='overflow-hidden'>
              <h3 className='anim-text font-instrument text-3xl uppercase'>
                à l’origine il y a la serre
              </h3>
            </div>
          </div>
          <button
            className='anim-number bg-white px-1 py-4 rounded-full'
            onClick={() => scrollToNextSection('#construction')}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='black'
              strokeWidth='1'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='animate-bounce'
            >
              <path d='M8 18L12 22L16 18' />
              <path d='M12 2V22' />
            </svg>
          </button>
        </SectionMuseum>

        <SectionMuseum id='construction'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className='overflow-hidden'>
              <h2 className='anim-text font-nhaasgrotesk-bold uppercase text-5xl'>
                1852
              </h2>
            </div>
            <div className='overflow-hidden'>
              <h4 className='anim-text font-nhaasgrotesk-light text-2xl uppercase'>
                (Construction)
              </h4>
            </div>
          </div>
          <div className='glassmorphism'>
            <h3 className='font-instrument text-3xl max-w-xl text-center'>
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

        <SectionMuseum className='!w-[50vw] pl-10'>
          <div className='w-full flex justify-between items-center'>
            <div className='overflow-hidden'>
              <h2 className='anim-text font-instrument text-5xl'>
                Le dernier des Orangers
              </h2>
            </div>
            <p className='anim-number bg-black rounded-full w-5 h-5 p-4 flex items-center justify-center aspect-square font-instrument text-white text-xl'>
              1
            </p>
          </div>

          <div className='glassmorphism'>
            <h3 className='font-instrument text-3xl max-w-xl text-center'>
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
            <h4 className='anim-text font-instrument-italic text-3xl'>
              Chapitre 02
            </h4>
          </div>
          <div className='flex flex-col justify-center items-center glassmorphism'>
            <div className='overflow-hidden'>
              <h2 className='anim-text font-nhaasgrotesk-bold uppercase text-8xl'>
                Claude Monet
              </h2>
            </div>
            <div className='overflow-hidden'>
              <h3 className='anim-text font-instrument text-3xl uppercase'>
                l'Architecte de la Lumière
              </h3>
            </div>
          </div>
          <button
            className='anim-number bg-white px-1 py-4 rounded-full'
            onClick={() => scrollToNextSection('#impressionniste')}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='black'
              strokeWidth='1'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='animate-bounce'
            >
              <path d='M8 18L12 22L16 18' />
              <path d='M12 2V22' />
            </svg>
          </button>
        </SectionMuseum>

        <SectionMuseum id='impressionniste'>
          <div className='overflow-hidden'>
            <img
              src='assets/images/autoportrait.webp'
              alt='Peinture Autoportrait'
              className='anim-img max-w-sm h-auto'
            />
          </div>
          <div className='overflow-hidden'>
            <h4 className='anim-text font-instrument text-5xl uppercase'>
              Claude Monet
            </h4>
          </div>

          <div className='overflow-hidden'>
            <h3 className='anim-text font-nhaasgrotesk-light text-3xl max-w-xl text-center'>
              Le père de l'impressionniste
            </h3>
          </div>
        </SectionMuseum>

        <SectionMuseum className='!flex-row'>
          <div className='flex'>
            <div className='overflow-hidden'>
              <img
                src='assets/images/soleil-levant.webp'
                alt='Peinture Autoportrait'
                className='anim-img max-w-sm h-auto'
              />
            </div>
            <p className='anim-number -ml-4 mt-12 z-10 bg-black rounded-full w-5 h-5 p-4 flex items-center justify-center aspect-square font-instrument text-white text-xl'>
              2
            </p>
          </div>

          <div className='flex flex-col justify-center items-left gap-4 mt-40'>
            <div>
              <div className='overflow-hidden'>
                <h2 className='anim-text font-nhaasgrotesk-bold uppercase text-5xl'>
                  1874
                </h2>
              </div>
              <div className='overflow-hidden'>
                <h4 className='anim-text font-nhaasgrotesk-light text-2xl uppercase'>
                  Naissance de l'impressionnisme
                </h4>
              </div>
            </div>
            <div className='glassmorphism ml-8'>
              <h3 className='font-instrument text-3xl max-w-xl text-left'>
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

        <SectionMuseum>
          <div className='overflow-hidden'>
            <h4 className='anim-text font-instrument-italic text-3xl'>
              Chapitre 03
            </h4>
          </div>
          <div className='flex flex-col justify-center items-center glassmorphism'>
            <div className='overflow-hidden'>
              <h2 className='font-nhaasgrotesk-bold uppercase text-8xl'>
                Les Nymphéas
              </h2>
            </div>
            <div className='overflow-hidden'>
              <h3 className='font-instrument text-3xl uppercase'>
                l’ultime chef-dœuvre
              </h3>
            </div>
          </div>
          <button
            className='anim-number bg-white px-1 py-4 rounded-full'
            onClick={() => scrollToNextSection('#nympheas')}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='black'
              strokeWidth='1'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='animate-bounce'
            >
              <path d='M8 18L12 22L16 18' />
              <path d='M12 2V22' />
            </svg>
          </button>
        </SectionMuseum>

        <SectionMuseum id='nympheas'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className='overflow-hidden'>
              <h2 className='anim-text font-nhaasgrotesk-bold uppercase text-5xl'>
                L'ultime chef-d'œuvre
              </h2>
            </div>
            <div className='overflow-hidden'>
              <h4 className='anim-text font-nhaasgrotesk-light text-2xl uppercase'>
                1914-1926
              </h4>
            </div>
          </div>
          <div className='glassmorphism'>
            <h3 className='font-instrument text-3xl max-w-xl text-center'>
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
        <SectionMuseum className='!w-[50vw] pl-10'>
          <div className='flex flex-col justify-center items-left gap-4 mt-40'>
            <div>
              <div className='overflow-hidden'>
                <h2 className='anim-text font-nhaasgrotesk-bold uppercase text-5xl'>
                  Matin
                </h2>
              </div>
              <div className='overflow-hidden'>
                <h4 className='anim-text font-nhaasgrotesk-light text-2xl uppercase'>
                  1916-1922
                </h4>
              </div>
            </div>
            <div className='glassmorphism ml-8'>
              <h3 className='font-instrument text-3xl max-w-xl text-left'>
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
        <SectionMuseum className='!items-end pr-10'>
          <div className='flex flex-col justify-center items-end gap-4 mt-40'>
            <div>
              <div className='overflow-hidden'>
                <h2 className='anim-text font-nhaasgrotesk-bold uppercase text-5xl'>
                  Les Nuages
                </h2>
              </div>
              <div className='overflow-hidden'>
                <h4 className='anim-text font-nhaasgrotesk-light text-2xl uppercase'>
                  1914-1918
                </h4>
              </div>
            </div>
            <div className='glassmorphism mr-8'>
              <h3 className='font-instrument text-3xl max-w-xl text-left'>
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
        <SectionMuseum className='!w-[50vw] pl-10'>
          <div className='flex flex-col justify-center items-left gap-4 mt-40'>
            <div>
              <div className='overflow-hidden'>
                <h2 className='anim-text font-nhaasgrotesk-bold uppercase text-5xl'>
                  Soleil couchant
                </h2>
              </div>
              <div className='overflow-hidden'>
                <h4 className='anim-text font-nhaasgrotesk-light text-2xl uppercase'>
                  1915-1921
                </h4>
              </div>
            </div>
            <div className='glassmorphism ml-8'>
              <h3 className='font-instrument text-3xl max-w-xl text-left'>
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
        <SectionMuseum className='!items-end pr-10'>
          <div className='flex flex-col justify-center items-end gap-4 mt-40'>
            <div>
              <div className='overflow-hidden'>
                <h2 className='anim-text font-nhaasgrotesk-bold uppercase text-5xl'>
                  Reflets verts
                </h2>
              </div>
              <div className='overflow-hidden'>
                <h4 className='anim-text font-nhaasgrotesk-light text-2xl uppercase'>
                  1920-1926
                </h4>
              </div>
            </div>
            <div className='glassmorphism mr-8'>
              <h3 className='font-instrument text-3xl max-w-xl text-left'>
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
              <h1 className='anim-text font-nhaasgrotesk-bold uppercase text-8xl'>
                Fin de la visite
              </h1>
            </div>

            <div className='overflow-hidden rounded-full'>
              <Button
                title='Refaire la visite'
                onClick={() => scrollToNextSection('#orangerie')}
                icon={<CornerRightUp strokeWidth={1.5} size={16} />}
              />
            </div>

            <div className='absolute bottom-3 left-3'>
              <button className='anim-number group' onClick={backToLobby}>
                <div className='flex items-center gap-4'>
                  <svg
                    className='transform transition-transform duration-300 group-hover:translate-x-1'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M6 8L2 12L6 16' />
                    <path d='M2 12H22' />
                  </svg>
                  <span className='text-black/90 text-xs tracking-wide uppercase font-semibold transition-all duration-300 group-hover:-translate-x-1'>
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

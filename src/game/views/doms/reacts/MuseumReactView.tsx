import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLenis } from '@studio-freight/react-lenis';
import { MoveDown, MoveLeft } from 'lucide-react';
import { TheatersManager, ViewsManager } from 'pancake';
import React, { useEffect, useRef } from 'react';
import Button from '../../../../components/Button';
import SectionMuseum from '../../../../components/SectionMuseum';
import { TextMuseum } from '../../../../components/TextMuseum';
import { TheaterId } from '../../../constants/theaters/TheaterId.ts';
import { ViewId } from '../../../constants/views/ViewId';
import {
  ReactViewBase,
  TransitionProps,
} from '../../../core/_engine/reacts/views/bases/ReactViewBase';

const MuseumReactView: React.FC<TransitionProps> = (props) => {
  const lenis = useLenis();
  const pageTransition = useRef<HTMLDivElement>(null);
  const pageToLobby = useRef<HTMLDivElement>(null);
  const convertTextToArray = (text: string) => {
    return text.split(' ');
  };

  const scrollToNextSection = (id: string) => {
    lenis.scrollTo(id);
  };

  const backToLobby = () => {
    return new Promise<void>((resolve) => {
      const tl = gsap.timeline({
        onComplete: () => {
          TheatersManager.HideById(TheaterId.MUSEUM);
          ViewsManager.ShowById(ViewId.THREE_LOBBY);
          TheatersManager.ShowById(TheaterId.LOBBY);
          resolve();
        },
      });

      tl.to(pageToLobby.current, {
        yPercent: -100,
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
      });
    });
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
      <div id="awwwards" className="fixed z-[999] top-1/2 -translate-y-1/2 right-0"><a
        href="https://www.awwwards.com/sites/les-reveries-de-lorangerie" target="_blank"><svg width="53.08"
          height="171.358">
          <path className="js-color-bg" fill="black" d="M0 0h53.08v171.358H0z"></path>
          <g className="js-color-text" fill="white">
            <path
              d="M20.047 153.665v-1.9h3.888v-4.093h-3.888v-1.9h10.231v1.9h-4.59v4.093h4.59v1.9zM29.898 142.236c-.331.565-.784.997-1.359 1.294s-1.222.446-1.944.446c-.721 0-1.369-.149-1.943-.446a3.316 3.316 0 0 1-1.36-1.294c-.331-.564-.497-1.232-.497-2.002s.166-1.438.497-2.002a3.316 3.316 0 0 1 1.36-1.294c.574-.297 1.223-.445 1.943-.445.723 0 1.369.148 1.944.445a3.307 3.307 0 0 1 1.359 1.294c.331.564.497 1.232.497 2.002s-.166 1.438-.497 2.002m-1.703-3.347c-.435-.33-.967-.496-1.601-.496-.633 0-1.166.166-1.601.496-.433.332-.649.78-.649 1.346 0 .564.217 1.013.649 1.345.435.331.968.497 1.601.497.634 0 1.166-.166 1.601-.497.435-.332.649-.78.649-1.345.001-.566-.214-1.014-.649-1.346M22.911 134.852v-1.813h1.186a3.335 3.335 0 0 1-.951-1.009 2.423 2.423 0 0 1-.352-1.271c0-.682.19-1.229.57-1.645.381-.413.932-.621 1.652-.621h5.262v1.812h-4.721c-.419 0-.727.096-.921.285-.195.19-.292.447-.292.769 0 .302.115.58.35.833.234.254.577.458 1.03.613.454.156.993.234 1.616.234h2.938v1.813h-7.367zM29.898 125.136a3.314 3.314 0 0 1-1.359 1.294c-.575.297-1.222.445-1.944.445-.721 0-1.369-.148-1.943-.445a3.322 3.322 0 0 1-1.36-1.294c-.331-.565-.497-1.232-.497-2.002 0-.771.166-1.438.497-2.003a3.313 3.313 0 0 1 1.36-1.293c.574-.297 1.223-.446 1.943-.446.723 0 1.369.149 1.944.446s1.028.728 1.359 1.293.497 1.232.497 2.003c.001.769-.166 1.436-.497 2.002m-1.703-3.347c-.435-.331-.967-.497-1.601-.497-.633 0-1.166.166-1.601.497-.433.331-.649.778-.649 1.345 0 .564.217 1.013.649 1.344.435.332.968.498 1.601.498.634 0 1.166-.166 1.601-.498.435-.331.649-.779.649-1.344.001-.567-.214-1.014-.649-1.345M22.911 117.75v-1.812h1.199c-.419-.265-.742-.586-.972-.966s-.345-.784-.345-1.213c0-.272.05-.569.146-.892l1.682.336a1.429 1.429 0 0 0-.205.76c0 .576.261 1.048.783 1.418.521.37 1.342.557 2.461.557h2.617v1.812h-7.366zM29.812 111.252c-.391.511-.857.851-1.403 1.016l-.776-1.446c.381-.138.68-.329.893-.577.215-.249.321-.544.321-.885a1.2 1.2 0 0 0-.168-.658c-.112-.175-.294-.263-.548-.263-.225 0-.406.105-.548.313-.142.21-.291.534-.446.973-.019.068-.058.17-.117.307-.224.565-.506 1.004-.848 1.315-.34.313-.779.467-1.314.467-.381 0-.727-.102-1.039-.306a2.185 2.185 0 0 1-.744-.84 2.554 2.554 0 0 1-.279-1.207c0-.497.105-.949.314-1.359.211-.408.506-.725.886-.949l.993 1.082c-.43.292-.644.686-.644 1.184a.84.84 0 0 0 .154.504.471.471 0 0 0 .401.212c.176 0 .338-.103.49-.307.15-.205.334-.604.547-1.199.205-.564.474-1.001.805-1.308.332-.308.756-.46 1.271-.46.721 0 1.299.229 1.732.687s.65 1.057.65 1.797c.001.759-.194 1.396-.583 1.907M35.481 17.006l-4.782 14.969h-3.266l-2.584-9.682-2.584 9.682h-3.268l-4.782-14.969h3.713l2.673 10.276 2.525-10.276h3.445l2.524 10.276 2.674-10.276zM37.978 27.163c1.426 0 2.496 1.068 2.496 2.495 0 1.425-1.07 2.495-2.496 2.495-1.425 0-2.494-1.07-2.494-2.495-.001-1.427 1.069-2.495 2.494-2.495">
            </path>
          </g>
        </svg></a></div>


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
                À l’origine, il y a la serre
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
                L’architecte de la lumière
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
              src='images/autoportrait.webp'
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
              Le père de l’impressionnisme
            </h3>
          </div>
        </SectionMuseum>

        <SectionMuseum className='md:!flex-row'>
          <div className='hidden md:flex'>
            <div className='overflow-hidden'>
              <img
                src='images/soleil-levant.webp'
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
                  Naissance de l’impressionnisme
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
              <h3 className='anim-text font-instrument text-2xl md:text-3xl uppercase'>
                L’ultime chef-d’œuvre
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
                L’illusion d’un tout sans fin
              </h2>
            </div>
            <div className='overflow-hidden'>
              <h4 className='anim-text font-nhaasgrotesk-light text-xl md:text-2xl uppercase'>
                1895-1926
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
                  REFLETS VERTS
                </h2>
              </div>
              <div className='overflow-hidden'>
                <h4 className='anim-text font-nhaasgrotesk-light text-xl md:text-2xl uppercase'>
                  1914-1926
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
                  1914-1926
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
                  1914-1926
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
          <div
            ref={pageToLobby}
            className='fixed inset-0 bg-black w-screen h-dvh z-[100] opacity-50 translate-y-full'
          ></div>
          <div className='fixed inset-0 -z-10 h-dvh w-screen flex justify-center items-center anim-blur'></div>
          <div className='h-dvh w-screen flex flex-col justify-center items-center gap-12'>
            <div className='overflow-hidden'>
              <h1 className='anim-text font-nhaasgrotesk-bold uppercase text-5xl md:text-8xl text-center'>
                Fin de la visite
              </h1>
            </div>

            <Button
              title='Refaire la visite'
              onClick={() => scrollToNextSection('#orangerie')}
              className='!border-black flex items-center gap-4 !text-black anim-button !bg-white'
            />

            <div className='overflow-hidden pb-1'>
              <div className='flex flex-row items-end justify-center gap-1 text-black/80 text-[0.8rem] anim-text'>
                <a
                  href='https://github.com/matdn'
                  target='_blank'
                  className='font-bold underline-effect underline-black'
                >
                  MATIS DENE
                </a>
                <p>&</p>
                <a
                  href='https://august1.dev/'
                  target='_blank'
                  className='font-bold underline-effect underline-black'
                >
                  AUGUSTIN BRIOLON
                </a>
              </div>
            </div>

            <div className='absolute top-3 left-3'>
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

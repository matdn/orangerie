import { ViewsManager } from 'pancake';
import React, { useEffect } from 'react';
import SectionMuseum from '../../../../components/SectionMuseum';
import { ViewId } from '../../../constants/views/ViewId';
import ReactViewBase, {
  TransitionProps,
} from '../../../core/_engine/reacts/views/bases/ReactViewBase';
import { ThreeCamerasProxy } from '../../../core/_engine/threejs/proxies/ThreeCamerasProxy';

const MuseumReactView: React.FC<TransitionProps> = (props) => {
  const longTextSectionTwo =
    'Le Musée trouve ses origines dans son rôle de protecteur, il fut ainsi construit pour protéger les orangers du palais des Tuileries durant les mois d’hiver.'.split(
      ' '
    );
  const longTextSectionThree =
    "L'esprit de la serre semble perdurer ici bas. La lumière et l'eau protègent l'arbre en son seins.".split(
      ' '
    );
  const longTextSectionFive =
    "Monet développe très tôt une fascination pour la lumière, les reflets et les variations infinies de la nature. Ce sont ces éléments qu’il cherchera à capturer dans son art, en privilégiant une peinture en plein air et des coups de pinceau vibrants. Son tableau 'Impression, soleil levant' inspirera alors le mouvement artistique de l’impressionisme".split(
      ' '
    );
  const longTextSectionSix =
    'Avec sa capacité à transformer la réalité en une vision vibrante et poétique, Claude Monet incarne non seulement l’essence de l’impressionnisme, mais aussi un lien profond entre la nature et l’art.'.split(
      ' '
    );

  const galerieSection = () => {
    ViewsManager.ShowById(ViewId.GALERY_REACT);
    ViewsManager.ShowById(ViewId.THREE_GALERY);
    ViewsManager.HideById(ViewId.MUSEUM_REACT);
    const camera = ThreeCamerasProxy.GetCamera('MUSEUM');
    camera.position.set(0, 0, -80);
    camera.lookAt(0, 0, 0);
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

  return (
    <ReactViewBase {...props} className='w-screen h-fit z-50 relative'>
      <div className='borderScreenMuseum'></div>
      <div className='w-full overflow-y-scroll'>
        <SectionMuseum>
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
          <a
            href='#construction'
            className='anim-text bg-white px-1 py-4 rounded-full'
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
          </a>
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
              {longTextSectionTwo.map((word, index) => (
                <span key={index} className='inline-block overflow-hidden'>
                  <span className='anim-long-text inline-block'>
                    {word}
                    {index !== longTextSectionTwo.length - 1 && '\u00A0'}
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
              {longTextSectionThree.map((word, index) => (
                <span key={index} className='inline-block overflow-hidden'>
                  <span className='anim-long-text inline-block'>
                    {word}
                    {index !== longTextSectionThree.length - 1 && '\u00A0'}
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
          <a
            href='#impressionniste'
            className='anim-text bg-white px-1 py-4 rounded-full'
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
          </a>
        </SectionMuseum>

        <SectionMuseum id='impressionniste'>
          <div className='overflow-hidden relative'>
            <img
              src='assets/images/autoportrait.webp'
              alt='Peinture Autoportrait'
              className='max-w-sm h-auto'
            />
            <div className='anim-img origin-top absolute w-full h-full inset-0 bg-white'></div>
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
            <div className='overflow-hidden relative'>
              <img
                src='assets/images/soleil-levant.webp'
                alt='Peinture Autoportrait'
                className='max-w-sm h-auto'
              />
              <div className='anim-img origin-top absolute w-full h-full inset-0 bg-white'></div>
            </div>
            <p className='anim-number -ml-4 mt-12 bg-black rounded-full w-5 h-5 p-4 flex items-center justify-center aspect-square font-instrument text-white text-xl'>
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
                {longTextSectionFive.map((word, index) => (
                  <span key={index} className='inline-block overflow-hidden'>
                    <span className='anim-long-text inline-block'>
                      {word}
                      {index !== longTextSectionFive.length - 1 && '\u00A0'}
                    </span>
                  </span>
                ))}
              </h3>
            </div>
          </div>
        </SectionMuseum>

        <SectionMuseum>
          <div className='glassmorphism'>
            <h3 className='font-instrument text-3xl max-w-xl text-center'>
              {longTextSectionSix.map((word, index) => (
                <span key={index} className='inline-block overflow-hidden'>
                  <span className='anim-long-text inline-block'>
                    {word}
                    {index !== longTextSectionSix.length - 1 && '\u00A0'}
                  </span>
                </span>
              ))}
            </h3>
          </div>
          <div className='flex justify-center items-center gap-4'>
            <div className='overflow-hidden relative scale-75'>
              <img
                src='assets/images/jardin.webp'
                alt='Peinture Coclicot'
                className='w-52 h-72 object-cover'
              />
              <div className='anim-img origin-top absolute w-full h-full inset-0 bg-white'></div>
            </div>
            <div className='relative'>
              <div className='overflow-hidden relative'>
                <img
                  src='assets/images/femme-ombrelle.webp'
                  alt='Peinture Coclicot'
                  className='w-52 h-72 object-cover'
                />
                <div className='anim-img origin-top absolute w-full h-full inset-0 bg-white'></div>
              </div>

              <button
                className='anim-number abs-center px-8 py-2 rounded-full bg-white'
                onClick={() => galerieSection()}
              >
                <p className='whitespace-nowrap text-center'>
                  Voir la galerie
                </p>
              </button>
            </div>
            <div className='overflow-hidden relative scale-75'>
              <img
                src='assets/images/coclicots.webp'
                alt='Peinture Coclicot'
                className='w-52  h-72 object-cover'
              />
              <div className='anim-img origin-top absolute w-full h-full inset-0 bg-white'></div>
            </div>
          </div>
        </SectionMuseum>

        <SectionMuseum>
          <div className='overflow-hidden'>
            <h4 className='anim-text font-instrument-italic text-3xl'>Chapitre 03</h4>
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
          <a href='#' className='anim-text bg-white px-1 py-4 rounded-full'>
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
          </a>
        </SectionMuseum>
      </div>
    </ReactViewBase>
  );
};

export default MuseumReactView;

import React, { useEffect } from 'react';
import ReactViewBase, { TransitionProps } from '../../../core/_engine/reacts/views/bases/ReactViewBase';

const MuseumReactView: React.FC<TransitionProps> = (props) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;

      // Normalisation du scroll entre 0 et 1
      const scrollProgress = scrollY / scrollMax;

      // Dispatch d'un événement personnalisé avec la valeur de scroll
      window.dispatchEvent(new CustomEvent('museumScroll', { detail: { progress: scrollProgress } }));
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ReactViewBase {...props} className='w-screen h-fit z-50'>
      <div className='borderScreenMuseum'></div>

      <div className='w-full overflow-y-scroll'>
        <div className='h-dvh w-screen flex flex-col justify-center items-center gap-8'>
          <h4 className='font-instrument-italic text-3xl'>Chapitre 01</h4>
          <div className='flex flex-col justify-center items-center'>
            <h2 className='font-nhaasgrotesk uppercase text-8xl'>
              L'Orangerie
            </h2>
            <h3 className='font-instrument text-3xl uppercase'>
              à l’origine il y’a la serre
            </h3>
          </div>
          <a href='#construction' className='bg-white px-1 py-4 rounded-full'>
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
        </div>

        <div
          id='construction'
          className='h-dvh w-screen flex flex-col justify-center items-center gap-8'
        >
          <div className='flex flex-col justify-center items-center gap-2'>
            <h2 className='font-nhaasgrotesk uppercase text-5xl'>1852</h2>
            <h4 className='font-instrument text-2xl uppercase'>
              (Construction)
            </h4>
          </div>

          <h3 className='font-instrument text-3xl max-w-xl text-center'>
            Le Musée trouve ses origines dans son rôle de protecteur, il fut
            ainsi construit pour protéger les orangers du palais des Tuileries
            durant les mois d’hiver.
          </h3>
        </div>

        <div
          id='dernier'
          className='h-dvh w-[50vw] flex flex-col justify-center items-start gap-8 pl-10'
        >
          <div className='w-full flex justify-between items-center'>
            <h2 className='font-instrument text-5xl'>Le dernier des Oranger</h2>
            <p className='bg-black rounded-full w-5 h-5 p-4 flex items-center justify-center aspect-square font-instrument text-white text-xl'>
              1
            </p>
          </div>

          <h3 className='font-instrument text-2xl max-w-sm w-full'>
            L'esprit de la serre semble perdurer ici bas. La lumière et l'eau
            protègent l'arbre en son seins.
          </h3>
        </div>

        <div className='h-dvh w-screen flex flex-col justify-center items-center gap-8'>
          <h4 className='font-instrument-italic text-3xl'>Chapitre 02</h4>
          <div className='flex flex-col justify-center items-center'>
            <h2 className='font-nhaasgrotesk uppercase text-8xl'>
              Claude Monet
            </h2>
            <h3 className='font-instrument text-3xl uppercase'>
              l'Architecte de la Lumière
            </h3>
          </div>
          <a
            href='#impressionniste'
            className='bg-white px-1 py-4 rounded-full'
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
        </div>

        <div
          id='impressionniste'
          className='h-dvh w-screen flex flex-col justify-center items-center gap-8'
        >
          <img
            src='assets/images/autoportrait.webp'
            alt='Peinture Autoportrait'
            className='max-w-sm h-auto'
          />
          <h4 className='font-instrument text-5xl uppercase'>Claude Monet</h4>

          <h3 className='font-nhaasgrotesk text-3xl max-w-xl text-center'>
            Le père de l'impressionniste
          </h3>
        </div>

        <div className='h-dvh w-screen flex justify-center items-center gap-8'>
          <div className='flex'>
            <img
              src='assets/images/soleil-levant.webp'
              alt='Peinture Autoportrait'
              className='max-w-sm h-auto'
            />
            <p className='bg-black rounded-full w-5 h-5 p-4 flex items-center justify-center aspect-square font-instrument text-white text-xl'>
              2
            </p>
          </div>

          <div>
            <h2 className='font-nhaasgrotesk uppercase text-5xl'>1852</h2>
            <h4 className='font-instrument text-2xl uppercase'>
              (Construction)
            </h4>
            <h3 className='ml-2 font-instrument text-3xl max-w-xl text-left'>
              Monet développe très tôt une fascination pour la lumière, les
              reflets et les variations infinies de la nature. Ce sont ces
              éléments qu’il cherchera à capturer dans son art, en privilégiant
              une peinture en plein air et des coups de pinceau vibrants. Son
              tableau "Impression, soleil levant" inspirera alors le mouvement
              artistique de l’impressionisme
            </h3>
          </div>
        </div>

        <div className='h-dvh w-screen flex flex-col justify-center items-center gap-8'>
          <h3 className='font-instrument text-3xl max-w-xl text-center'>
            Avec sa capacité à transformer la réalité en une vision vibrante et
            poétique, Claude Monet incarne non seulement l’essence de
            l’impressionnisme, mais aussi un lien profond entre la nature et
            l’art.
          </h3>
          <div className='flex justify-center items-center gap-4'>
            <img
              src='assets/images/jardin.webp'
              alt='Peinture Coclicot'
              className='scale-75 w-52 h-72 object-cover'
            />
            <div className='relative'>
              <img
                src='assets/images/femme-ombrelle.webp'
                alt='Peinture Coclicot'
                className='w-52  h-72 object-cover'
              />
              <p className='abs-center bg-white rounded-full px-4 py-2 whitespace-nowrap text-center'>
                Voir la galerie
              </p>
            </div>
            <img
              src='assets/images/coclicots.webp'
              alt='Peinture Coclicot'
              className='scale-75 w-52  h-72 object-cover'
            />
          </div>
        </div>

        <div className='h-dvh w-screen flex flex-col justify-center items-center gap-8'>
          <h4 className='font-instrument-italic text-3xl'>Chapitre 03</h4>
          <div className='flex flex-col justify-center items-center'>
            <h2 className='font-nhaasgrotesk uppercase text-8xl'>
              Les Nymphéas
            </h2>
            <h3 className='font-instrument text-3xl uppercase'>
              l’ultime chef-d'œuvre
            </h3>
          </div>
          <a href='#' className='bg-white px-1 py-4 rounded-full'>
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
        </div>
      </div>
      </ReactViewBase>
  ); 
}; 

export default MuseumReactView;

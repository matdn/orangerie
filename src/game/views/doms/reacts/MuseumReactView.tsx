import React from 'react';
import ReactViewBase, {
  TransitionProps,
} from '../../../core/_engine/reacts/views/bases/ReactViewBase';

const MuseumReactView: React.FC<TransitionProps> = (props) => {
  return (
    <ReactViewBase {...props} className='w-screen h-fit z-50'>
      <div className='borderScreenMuseum'></div>
      <div className='w-full overflow-y-scroll'>
        {/*         
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
            <h2 className='font-instrument text-5xl'>
              Le dernier des Oranger
            </h2>
            <p className='bg-black rounded-full w-5 h-5 p-4 flex items-center justify-center aspect-square font-instrument text-white text-xl'>
              1
            </p>
          </div>

          <h3 className='font-instrument text-2xl max-w-sm w-full'>
            L'esprit de la serre semble perdurer ici bas. La lumière et l'eau
            protègent l'arbre en son seins.
          </h3>
        </div> */}

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
          <img src="" alt="" />
          <h4 className='font-instrument text-2xl uppercase'>Claude Monet</h4>

          <h3 className='font-nhaasgrotesk text-3xl max-w-xl text-center'>
            Le père de l'impressionniste
          </h3>
        </div>
      </div>
    </ReactViewBase>
  );
};

export default MuseumReactView;

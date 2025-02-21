import React from 'react';
import ReactViewBase, {
  TransitionProps,
} from '../../../core/_engine/reacts/views/bases/ReactViewBase';

const MuseumReactView: React.FC<TransitionProps> = (props) => {
  return (
    <ReactViewBase {...props} className='w-screen h-fit z-50 '>
      <div className='w-full overflow-y-scroll'>

        <div className='h-dvh w-screen'>
          <h4 className='font-instrument italic text-5xl'>Chapitre 01</h4>
          <h2 className='font-nhaasgrotesk uppercase text-8xl'>L'Orangerie</h2>
          <h3 className='font-instrument text-3xl'>
            à l’origine il y’a la serre
          </h3>
        </div>

        <div className='h-dvh w-screen'>
          <h2 className='font-nhaasgrotesk uppercase text-8xl'>1852</h2>
          <h4 className='font-instrument italic text-5xl'>(Construction)</h4>
          <h3 className='font-instrument text-3xl'>
            à l’origine il y’a la serre
          </h3>
        </div>
      </div>
    </ReactViewBase>
  );
};

export default MuseumReactView;

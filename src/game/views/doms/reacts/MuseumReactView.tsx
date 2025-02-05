import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from 'react';
import ReactViewBase, {
  TransitionProps,
} from '../../../core/_engine/reacts/views/bases/ReactViewBase';

gsap.registerPlugin(ScrollTrigger);

const MuseumReactView: React.FC<TransitionProps> = (props) => {
  return (
    <ReactViewBase
      {...props}
      className='w-screen flex flex-col items-center justify-center z-50'
    >
      <h4 className='font-instrument italic text-5xl'>Chapitre 02</h4>
      <h2 className='font-nhaasgrotesk uppercase text-8xl'>L'Orangerie</h2>
      <h3 className='font-instrument text-3xl'>à l’origine il y’a la serre</h3>
    </ReactViewBase>
  );
};

export default MuseumReactView;

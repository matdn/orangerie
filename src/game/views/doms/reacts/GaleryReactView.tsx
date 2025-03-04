import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import React from 'react';
import ReactViewBase, {
  TransitionProps,
} from '../../../core/_engine/reacts/views/bases/ReactViewBase';

gsap.registerPlugin(CustomEase);

const GaleryReactView: React.FC<TransitionProps> = (props) => {
  return (
    <ReactViewBase {...props} className='z-50 w-full flex flex-col h-1200'>
      <h2 className='text-4xl text-center text-black'>Galery</h2>
    </ReactViewBase>
  );
};

export default GaleryReactView;

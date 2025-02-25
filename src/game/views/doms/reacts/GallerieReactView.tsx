import React from 'react';
import ReactViewBase, {
  TransitionProps,
} from '../../../core/_engine/reacts/views/bases/ReactViewBase';

const GallerieReactView: React.FC<TransitionProps> = (props) => {


  return (
    <ReactViewBase {...props} className='w-screen h-fit z-50 relative'>
      <p>tets</p>
    </ReactViewBase>
  );
};

export default GallerieReactView;

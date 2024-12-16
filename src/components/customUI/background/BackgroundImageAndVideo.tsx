import React, { useRef } from 'react';
import { AssetsUtils } from '../../../game/core/utils/AssetsUtils.ts';

interface Props {
  imageUrl?: string | null;
  videoUrl?: string | null;
}

export function BackgroundImageAndVideo({imageUrl = null, videoUrl = null}: Props) {
  const bgVideoRef = useRef<HTMLVideoElement>();

  const onVideoLoaded = () => {
    if (!bgVideoRef.current) {
      return;
    }

    bgVideoRef.current.classList.replace('opacity-0', 'opacity-100');
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-0 bg-cover bg-center bg-no-repeat" style={ imageUrl ? { backgroundImage: `url('${ AssetsUtils.GetAssetURL(imageUrl) }')` } : {} }>
      { videoUrl && (
        <video loop autoPlay muted playsInline onLoadedData={ onVideoLoaded }
               className="opacity-0 h-screen object-cover transition-opacity duration-1000" ref={ bgVideoRef }>
          <source src={ AssetsUtils.GetAssetURL(videoUrl) } type="video/mp4" />
        </video>
      ) }
    </div>
  )
}

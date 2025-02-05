import React, { ImgHTMLAttributes, forwardRef } from "react";
import InlineSVG from 'react-inlinesvg';
import { getAssetUrl } from '../../../helpers/common.helpers';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  type?: 'svg' | 'regular';
}


export const UtilImage = forwardRef(({ src, alt, type = 'regular', ...props }: ImageProps, ref: React.ForwardedRef<HTMLImageElement>) => {

  const url = src.includes('http') ? src : getAssetUrl(src);

  return (
    <img {...props} ref={ref} src={url} alt={alt || ''} />
  );
});

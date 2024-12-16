import React, { VideoHTMLAttributes, forwardRef } from "react";
import { AssetsUtils } from "../../../../utils/AssetsUtils";


export interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
    src?: string;
    type?: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
}


const Video = forwardRef(({ className = '', children, autoPlay = true, muted = true, loop = true, src = null, type = 'video/mp4', ...props }: VideoProps, ref: React.ForwardedRef<HTMLVideoElement>) => {
    return (
        <video {...props} autoPlay muted loop playsInline className={`video ${className}`} ref={ref}>
            {src &&
                <source src={AssetsUtils.GetAssetURL(src)} type={type} />
            }
            {children}
        </video>
    );
});

export default Video;
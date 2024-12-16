import React from "react";


interface SoundEffectOnSVGProps extends React.SVGProps<SVGSVGElement> {
    iconColor?: number
}

const SoundEffectOnSVG = ({ iconColor = 0xffffff, ...props }: SoundEffectOnSVGProps) => {
    const color = '#' + iconColor.toString(16);

    return (
        <svg {...props} viewBox="0 0 45 45" width={45} height={45}>
            <path fill={color} d="M33.7,30.8s0,0,0-.1V6.5l-2.5.6-15.7,3.8-2.5.6v21.5c-1.3-.4-2.9-.4-4.5.1-3,1.1-4.8,3.7-4.1,5.9s3.8,3.1,6.9,2.1c2.8-1,4.6-3.3,4.2-5.4h0v-17.3l15.7-4.5v14.8c-1-.2-2.1-.2-3.3.2-2.6.9-4.1,3.2-3.5,5,.7,1.9,3.3,2.7,5.8,1.8,2.6-.9,4.1-3.2,3.5-5Z" />
        </svg>
    )
};

export default SoundEffectOnSVG;
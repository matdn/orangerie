

import React from "react";


interface SoundEffectOffSVGProps extends React.SVGProps<SVGSVGElement> {
    iconColor?: number
}

const SoundEffectOffSVG = ({ iconColor = 0xffffff, ...props }: SoundEffectOffSVGProps) => {
    const color = '#' + iconColor.toString(16);

    return (
        <svg {...props} viewBox="0 0 45 45" width={45} height={45}>
            <polygon fill={color} points="31.1 14 31.1 24.5 33.6 26.3 33.6 13.3 33.6 6.5 31.1 7.1 15.3 10.9 13.3 11.4 20.7 16.9 31.1 14" />
            <path fill={color} d="M15.3,35.7v-17l-2.5-1.9v16.2c-1.3-.4-2.9-.4-4.5.1-3,1.1-4.8,3.7-4.1,5.9.8,2.2,3.8,3.1,6.9,2.1,2.8-1,4.6-3.3,4.2-5.4h0Z" />
            <path fill={color} d="M27.8,29c-2.6.9-4.1,3.2-3.5,5,.7,1.9,3.3,2.7,5.8,1.8,2-.7,3.3-2.2,3.6-3.6l-4.7-3.5c-.4,0-.8.2-1.2.3Z" />
            <rect fill={color} x="20.8" y="1.1" width="2.1" height="38.9" transform="translate(-7.6 26) rotate(-53.7)" />
        </svg>
    )
};

export default SoundEffectOffSVG;
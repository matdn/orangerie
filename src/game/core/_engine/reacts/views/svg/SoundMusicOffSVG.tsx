import React from "react";


interface SoundMusicOffSVGProps extends React.SVGProps<SVGSVGElement> {
    iconColor?: number
}

const SoundMusicOffSVG = ({ iconColor = 0xffffff, ...props }: SoundMusicOffSVGProps) => {
    const color = '#' + iconColor.toString(16);

    return (
        <svg {...props} viewBox="0 0 45 45" width={45} height={45}>
            <path fill={color} d="M22.9,7.5c-.7-.4-1.6-.4-2.2.2l-10.9,8.9H4c-1.1,0-2,.9-2,2v7.8c0,1.1.9,2,2,2h5.6l10.9,8.9c.4.4.9.5,1.3.5s.7,0,.9-.2c.7-.4,1.1-1.1,1.1-1.8l.2-26.6c0-.7-.4-1.5-1.1-1.8Z" />
            <path fill={color} d="M36.9,22.3l2.4-2.4c.7-.7.7-2,0-2.7-.7-.7-2-.7-2.7,0l-2.4,2.4-2.4-2.4c-.7-.7-2-.7-2.7,0-.7.7-.7,2,0,2.7l2.4,2.4-2.4,2.4c-.7.9-.7,2,0,2.7s2,.7,2.7,0l2.4-2.4,2.4,2.4c.7.9,2,.9,2.7,0,.7-.7.7-2,0-2.7l-2.4-2.4Z" />
        </svg>
    )
};

export default SoundMusicOffSVG;
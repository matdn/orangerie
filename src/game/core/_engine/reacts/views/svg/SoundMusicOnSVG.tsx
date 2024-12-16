import React from "react";


interface SoundMusicOnSVGProps extends React.SVGProps<SVGSVGElement> {
    iconColor?: number
}

const SoundMusicOnSVG = ({ iconColor = 0xffffff, ...props }: SoundMusicOnSVGProps) => {
    const color = '#' + iconColor.toString(16);

    return (
        <svg {...props} viewBox="0 0 45 45" width={45} height={45}>
            <path fill={color} d="M22.9,7.5c-.7-.4-1.6-.4-2.2.2l-10.9,8.9H4c-1.1,0-2,.9-2,2v7.8c0,1.1.9,2,2,2h5.6l10.9,8.9c.4.4.9.5,1.3.5s.7,0,.9-.2c.7-.4,1.1-1.1,1.1-1.8l.2-26.6c0-.7-.4-1.5-1.1-1.8Z" />
            <path fill={color} d="M29.9,13.6c-.3-.3-.8-.7-1.4-.7s-1,.2-1.4.5l-.2.2c-.7.7-.9,1.9-.2,2.6,1.5,1.9,2.4,4.3,2.4,6.8s-.7,4.6-2,6.5c-.5.7-.5,1.7.2,2.4l.2.2c.3.3.7.5,1.4.5s1-.3,1.5-.7c1.9-2.6,2.9-5.6,2.9-8.8s-1.2-6.6-3.4-9.4Z" />
            <path fill={color} d="M36.2,7.1c-.3-.5-.9-.7-1.4-.7s-1,.2-1.5.5l-.2.2c-.7.7-.7,1.9,0,2.6,3.2,3.6,4.9,8.3,4.9,13.1s-1.5,9.2-4.6,12.8c-.5.8-.5,1.9.2,2.6l.2.3c.3.3.9.5,1.4.5s1-.3,1.4-.7c3.6-4.3,5.6-9.7,5.6-15.3s-2-11.4-6-15.8Z" />
        </svg>
    )
};

export default SoundMusicOnSVG;
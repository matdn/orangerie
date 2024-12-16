import React from "react";


interface FullscreenOffSVGProps extends React.SVGProps<SVGSVGElement> {
    iconColor?: number
}

const FullscreenOffSVG = ({ iconColor = 0xffffff, ...props }: FullscreenOffSVGProps) => {
    const color = '#' + iconColor.toString(16);

    return (
        <svg {...props} viewBox="0 0 40 40" width={40} height={40}>
            <polygon fill={color} points="40.63 17.43 40.63 11.97 36.12 11.97 44.22 3.86 40.36 0 32.63 7.72 32.63 3.97 27.17 3.97 27.17 11.97 27.17 17.43 32.63 17.43 40.63 17.43" />
            <polygon fill={color} points="11.58 7.72 3.86 0 0 3.86 8.1 11.97 3.58 11.97 3.58 17.43 11.58 17.43 17.04 17.43 17.04 11.97 17.04 3.97 11.58 3.97 11.58 7.72" />
            <polygon fill={color} points="3.58 27.56 3.58 33.02 8.1 33.02 0 41.12 3.86 44.98 11.58 37.26 11.58 41.02 17.04 41.02 17.04 33.02 17.04 27.56 11.58 27.56 3.58 27.56" />
            <polygon fill={color} points="40.63 33.02 40.63 27.56 32.63 27.56 27.17 27.56 27.17 33.02 27.17 41.02 32.63 41.02 32.63 37.26 40.36 44.98 44.22 41.12 36.12 33.02 40.63 33.02" />

        </svg>
    )
};

export default FullscreenOffSVG;
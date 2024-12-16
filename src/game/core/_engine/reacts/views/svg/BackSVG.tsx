import React from "react";


interface BackSVGProps extends React.SVGProps<SVGSVGElement> {
    iconColor?: number
}

const BackSVG = ({ iconColor = 0xffffff, ...props }: BackSVGProps) => {
    const color = '#' + iconColor.toString(16);

    return (
        <svg {...props} viewBox="0 0 44.5 45.3" width={44.5} height={45.3}>
            <polygon fill={color} points="17.5 13.8 17.5 7.8 3 15.5 17.5 23.2 17.5 17.8 37.3 17.8 37.3 32.8 14.6 32.8 14.6 36.8 41.3 36.8 41.3 13.8 17.5 13.8" />
        </svg>
    )
};

export default BackSVG;
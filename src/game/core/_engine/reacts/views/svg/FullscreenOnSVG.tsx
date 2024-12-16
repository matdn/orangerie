import React from "react";


interface FullscreenOnSVGProps extends React.SVGProps<SVGSVGElement> {
    iconColor?: number
}

const FullscreenOnSVG = ({ iconColor = 0xffffff, ...props }: FullscreenOnSVGProps) => {
    const color = '#' + iconColor.toString(16);

    return (
        <svg {...props} viewBox="0 0 40 40" width={40} height={40}>
            <g>
                <polygon fill={color} points="34.44 0 26.44 0 26.44 5.46 30.96 5.46 22.86 13.56 26.72 17.43 34.44 9.7 34.44 13.46 39.9 13.46 39.9 5.46 39.9 0 34.44 0" />
                <polygon fill={color} points="13.46 5.46 13.46 0 5.46 0 0 0 0 5.46 0 13.46 5.46 13.46 5.46 9.7 13.18 17.43 17.04 13.56 8.94 5.46 13.46 5.46" />
            </g>
            <g>
                <polygon fill={color} points="5.46 39.9 13.46 39.9 13.46 34.44 8.94 34.44 17.04 26.34 13.18 22.48 5.46 30.2 5.46 26.44 0 26.44 0 34.44 0 39.9 5.46 39.9" />
                <polygon fill={color} points="26.44 34.44 26.44 39.9 34.44 39.9 39.9 39.9 39.9 34.44 39.9 26.44 34.44 26.44 34.44 30.2 26.72 22.48 22.86 26.34 30.96 34.44 26.44 34.44" />
            </g>
        </svg>
    )
};

export default FullscreenOnSVG;
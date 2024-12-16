import React, { forwardRef } from "react";
import ButtonBase, { ButtonBaseProps } from "./bases/ButtonBase";


const VerticalSwapButton = forwardRef(({ className, ...props }: ButtonBaseProps, ref: React.ForwardedRef<HTMLButtonElement>) => {

    return (
        <ButtonBase {...props} className={`button swapVertical ${className ?? ''}`} ref={ref}>
            <span className="text">
                <span className="text1">{props.children}</span>
                <span className="text2" aria-hidden="true">{props.children}</span>
            </span>
        </ButtonBase>
    )
    
});

export default VerticalSwapButton;
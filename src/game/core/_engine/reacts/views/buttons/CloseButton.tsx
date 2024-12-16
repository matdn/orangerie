import React, { forwardRef } from "react";
import ButtonBase, { ButtonBaseProps } from "./bases/ButtonBase";
import { KeyboardConstant } from "spices";


const CloseButton = forwardRef(({ className, ...props }: ButtonBaseProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    return (
        <ButtonBase {...props} keyCodes={[KeyboardConstant.Codes.Escape]} className={`button closeButton ${className ?? ''}`} ref={ref}>
            <span className="lines">
                <span className="line line1"></span>
                <span className="line line2"></span>
            </span>
        </ButtonBase>
    )
});

export default CloseButton;
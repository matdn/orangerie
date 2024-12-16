import React, { forwardRef } from "react";
import ButtonBase, { ButtonBaseProps } from "./bases/ButtonBase";


const MenuButton = forwardRef(({ className, ...props }: ButtonBaseProps, ref: React.ForwardedRef<HTMLButtonElement>) => {

    return (
        <ButtonBase {...props} className={`button menuButton ${className ?? ''}`} ref={ref}>
            <span className="lines">
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
            </span>
        </ButtonBase>
    )
});

export default MenuButton;
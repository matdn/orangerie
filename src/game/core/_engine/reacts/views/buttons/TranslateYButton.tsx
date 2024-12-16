import React, { forwardRef } from "react";
import ButtonBase, { ButtonBaseProps } from "./bases/ButtonBase";


const TranslateYButton = forwardRef(({ className, ...props }: ButtonBaseProps, ref: React.ForwardedRef<HTMLButtonElement>) => {

    return (
        <ButtonBase {...props} className={`button translateYButton ${className ?? ''}`} ref={ref} >
            <span className="content">{props.children}</span>
        </ButtonBase>
    )

});

export default TranslateYButton;
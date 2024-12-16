import React, { forwardRef } from "react";
import I18nHTMLText from "../components/texts/I18nHTMLText";
import BackSVG from "../svg/BackSVG";
import ButtonBase, { ButtonBaseProps } from "./bases/ButtonBase";



interface BackButtonProps extends ButtonBaseProps {
    textId: string;
    iconColor?: number
}

const BackButton = forwardRef(({ onClick, className = '', iconColor = 0xffffff, textId, ...props }: BackButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {


    return (
        <ButtonBase {...props} className={`button backButton ${className}`} ref={ref} onClick={onClick}>
            <BackSVG iconColor={iconColor} />
            <I18nHTMLText textId={textId} />
        </ButtonBase>
    )
});

export default BackButton;
import React, { forwardRef } from "react";
import I18nHTMLText from "../components/texts/I18nHTMLText";
import LeaveSVG from "../svg/LeaveSVG";
import ButtonBase, { ButtonBaseProps } from "./bases/ButtonBase";



interface LeaveButtonProps extends ButtonBaseProps {
    textId: string;
    iconColor?: number
}

const LeaveButton = forwardRef(({ onClick, className = '', iconColor = 0xffffff, textId, ...props }: LeaveButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {


    return (
        <ButtonBase {...props} className={`button leaveButton ${className}`} ref={ref} onClick={onClick}>
            <LeaveSVG iconColor={iconColor} />
            <I18nHTMLText textId={textId} />
        </ButtonBase>
    )
});

export default LeaveButton;
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { FullscreenManager } from "../../../../managers/FullscreenManager";
import I18nHTMLText from "../components/texts/I18nHTMLText";
import FullscreenOffSVG from "../svg/FullScreenOffSVG";
import FullscreenOnSVG from "../svg/FullscreenOnSVG";
import ButtonBase, { ButtonBaseProps } from "./bases/ButtonBase";



interface FullScreenButtonProps extends ButtonBaseProps {
    textId: string;
    iconColor?: number
}

const FullScreenButton = forwardRef(({ onClick, iconColor = 0xffffff, className = '', textId, ...props }: FullScreenButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {

    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const onChangeFullscreen = (): void => {
            setIsFullscreen(FullscreenManager.IsFullscreen());
        }
        FullscreenManager.OnChange.add(onChangeFullscreen);
        onChangeFullscreen();
        return () => {
            FullscreenManager.OnChange.remove(onChangeFullscreen);
        }
    }, []);


    const handleClickFullscreen = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if (FullscreenManager.IsFullscreen()) FullscreenManager.ExitFullscreen();
        else FullscreenManager.Fullscreen();
        onClick?.(e);
    }, []);



    return (
        <ButtonBase {...props} className={`button fullScreenButton ${className}`} ref={ref} onClick={handleClickFullscreen}>
            {!isFullscreen && <FullscreenOnSVG iconColor={iconColor} />}
            {isFullscreen && <FullscreenOffSVG iconColor={iconColor} />}
            <I18nHTMLText textId={textId} />
        </ButtonBase>
    )
});

export default FullScreenButton;
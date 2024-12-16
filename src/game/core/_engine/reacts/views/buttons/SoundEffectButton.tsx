import { AudioMixerManager } from "@cooker/common";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import I18nHTMLText from "../components/texts/I18nHTMLText";
import SoundEffectOffSVG from "../svg/SoundEffectOffSVG";
import SoundEffectOnSVG from "../svg/SoundEffectOnSVG";
import ButtonBase, { ButtonBaseProps } from "./bases/ButtonBase";



interface SoundEffectButtonProps extends ButtonBaseProps {
    textId: string;
    iconColor?: number
}

const SoundEffectButton = forwardRef(({ onClick, iconColor = 0xffffff, className = '', textId, ...props }: SoundEffectButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {

    const [isEffectOn, setIsEffectOn] = useState(true);

    useEffect(() => {
        const onMuteChange = (): void => {
            setIsEffectOn(!AudioMixerManager.GetFX().globalIsMute);
        }
        AudioMixerManager.OnMuteChange.add(onMuteChange);
        onMuteChange();
        return () => {
            AudioMixerManager.OnMuteChange.delete(onMuteChange);
        }
    }, []);


    const handleClickEffect = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        AudioMixerManager.GetFX().isMute = !AudioMixerManager.GetFX().isMute;
        onClick?.(e);
    }, []);


    return (
        <ButtonBase {...props} className={`button fullScreenButton ${className}`} ref={ref} onClick={handleClickEffect}>
            {isEffectOn && <SoundEffectOnSVG iconColor={iconColor} />}
            {!isEffectOn && <SoundEffectOffSVG iconColor={iconColor} />}
            <I18nHTMLText textId={textId} />
        </ButtonBase>
    )
});

export default SoundEffectButton;
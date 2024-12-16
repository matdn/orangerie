import { AudioMixerManager } from "@cooker/common";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import I18nHTMLText from "../components/texts/I18nHTMLText";
import SoundMusicOffSVG from "../svg/SoundMusicOffSVG";
import SoundMusicOnSVG from "../svg/SoundMusicOnSVG";
import ButtonBase, { ButtonBaseProps } from "./bases/ButtonBase";



interface SoundMusicButtonProps extends ButtonBaseProps {
    textId: string;
    iconColor?: number
}

const SoundMusicButton = forwardRef(({ onClick, iconColor = 0xffffff, className = '', textId, ...props }: SoundMusicButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {

    const [isMusicOn, setIsMusicOn] = useState(true);

    useEffect(() => {
        const onMuteChange = (): void => {
            setIsMusicOn(!AudioMixerManager.GetMusic().globalIsMute);
        }
        AudioMixerManager.OnMuteChange.add(onMuteChange);
        onMuteChange();
        return () => {
            AudioMixerManager.OnMuteChange.delete(onMuteChange);
        }
    }, []);


    const handleClickMusic = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        AudioMixerManager.GetMusic().isMute = !AudioMixerManager.GetMusic().isMute;
        onClick?.(e);
    }, []);


    return (
        <ButtonBase {...props} className={`button fullScreenButton ${className}`} ref={ref} onClick={handleClickMusic}>
            {isMusicOn && <SoundMusicOnSVG iconColor={iconColor} />}
            {!isMusicOn && <SoundMusicOffSVG iconColor={iconColor} />}
            <I18nHTMLText textId={textId} />
        </ButtonBase>
    )
});

export default SoundMusicButton;
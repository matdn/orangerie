import { CommonAssetsManager } from "@cooker/common";
import Lottie, { AnimationItem } from "lottie-web";
import React, { HTMLAttributes, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { DomEvent } from "spices";
import { AssetsUtils } from "../../../../utils/AssetsUtils";

export interface LottieAnimationProps extends HTMLAttributes<HTMLDivElement> {
    jsonId: string,
    assetsPath: string,
    autoplay?: boolean,
    loop?: boolean,
    onComplete?: () => void,
}

export interface LottieAnimationHandle {
    replay: () => void,
    play: () => void,
    pause: () => void,
    reset: () => void,
    getElement: () => HTMLDivElement,
}

const LottieAnimation = forwardRef<LottieAnimationHandle, LottieAnimationProps>(({ jsonId, assetsPath = '', autoplay = false, loop = false, onComplete, ...props }: LottieAnimationProps, ref: React.ForwardedRef<LottieAnimationHandle>) => {
    const lottieRef = useRef<HTMLSpanElement>(null);
    const animationRef = useRef<AnimationItem | null>(null);
    const lottieContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const lottieElement = lottieRef.current;
        if (!lottieElement) return;

        animationRef.current = Lottie.loadAnimation({
            container: lottieElement,
            animationData: CommonAssetsManager.GetJSON(jsonId),
            assetsPath: AssetsUtils.GetAssetURL(assetsPath),
            loop,
            autoplay,
        });

        if (onComplete) {
            animationRef.current.addEventListener(DomEvent.COMPLETE, onComplete);
        }

        return () => {
            if (onComplete) {
                animationRef.current?.removeEventListener(DomEvent.COMPLETE, onComplete);
            }
            animationRef.current?.destroy();
        };
    }, [jsonId, assetsPath, autoplay, loop, onComplete]);

    useImperativeHandle(ref, () => ({
        replay: () => {
            animationRef.current?.stop();
            animationRef.current?.play();
        },
        play: () => {
            animationRef.current?.play();
        },
        pause: () => {
            animationRef.current?.pause();
        },
        reset: () => {
            animationRef.current?.stop();
        },
        getElement: () => {
            return lottieContainerRef.current;
        },
    }), []);

    return <div {...props} ref={lottieContainerRef}>
        <span className="lottie" ref={lottieRef} />
    </div>
});

export default LottieAnimation;

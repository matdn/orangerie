import { CommonAssetsManager } from "@cooker/common";
import { memo, useEffect, useRef } from "react";
import { DomEvent } from "spices";

const SoundComponent = memo(({ soundId, sprite }: { soundId: string, sprite: string }) => {

    const positionRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const startRef = useRef<HTMLInputElement>(null);
    const endRef = useRef<HTMLInputElement>(null);

    const handleClickPlay = () => {
        const sound = CommonAssetsManager.GetSound(soundId)!;
        sound.play(sprite);
    }

    const handleClickStop = () => {
        const sound = CommonAssetsManager.GetSound(soundId)!;
        sound.stop();
    }


    const handleLoopChange = () => {
        if (!startRef.current) return;
        if (!endRef.current) return;
        const sound = CommonAssetsManager.GetSound(soundId)!;
        const tab = sound.getSprites()[sprite];
        const start = parseFloat(startRef.current.value);
        const end = parseFloat(endRef.current.value);
        tab[0] = start;
        tab[1] = end;
    }

    useEffect(() => {
        if (!startRef.current) return;
        if (!endRef.current) return;
        const sound = CommonAssetsManager.GetSound(soundId)!;
        const tab = sound.getSprites()[sprite];
        startRef.current.value = '' + tab[0];
        endRef.current.value = '' + tab[1];
    }, []);

    useEffect(() => {
        if (!timelineRef.current) return;
        let rect: DOMRect;

        const sound = CommonAssetsManager.GetSound(soundId)!;
        const tab = sound.getSprites()[sprite];

        const onMouseDown = (e: MouseEvent) => {
            if (!timelineRef.current) return;
            rect = timelineRef.current.getBoundingClientRect();
            onMouseMove(e);
            window.addEventListener(DomEvent.MOUSE_MOVE, onMouseMove);
            window.addEventListener(DomEvent.MOUSE_UP, onMouseUp);
        }

        const onMouseMove = (e: MouseEvent) => {
            let p = (e.clientX - rect.x) / rect.width;
            if (p < 0) p = 0;
            if (p > 1) p = 1;
            p *= (tab[1] - tab[0]) * 0.001;
            sound.howl.seek(p);
        }

        const onMouseUp = () => {
            window.removeEventListener(DomEvent.MOUSE_MOVE, onMouseMove);
            window.removeEventListener(DomEvent.MOUSE_UP, onMouseUp);
        }



        timelineRef.current.addEventListener(DomEvent.MOUSE_DOWN, onMouseDown);
        return () => {
            if (!timelineRef.current) return;
            timelineRef.current.removeEventListener(DomEvent.MOUSE_DOWN, onMouseDown);
        }
    }, []);



    useEffect(() => {
        let raf: number = 0;
        const sound = CommonAssetsManager.GetSound(soundId)!;
        const tab = sound.getSprites()[sprite];
        const update = () => {
            let p = (sound.howl.seek() / ((tab[1] - tab[0]) * 0.001));
            if (p < 0) p = 0;
            if (p > 1) p = 1;
            p *= 100;
            if (positionRef.current) {
                positionRef.current.style.width = `${p}%`;
            }
            raf = requestAnimationFrame(update);
        }
        update();
        return () => {
            cancelAnimationFrame(raf);
        }
    }, []);


    return (
        <div className="soundTester">
            <div className="name">
                <div>id:</div>
                <div>{soundId} - {sprite}</div>
            </div>

            <div className="timeline" ref={timelineRef}>
                <div className="position" ref={positionRef}></div>
            </div>

            <div className="loop">
                <div className="start" >
                    <span>start:</span>
                    <input type="number" ref={startRef} onChange={handleLoopChange} />
                </div>
                <div className="end" >
                    <span>end:</span>
                    <input type="number" ref={endRef} onChange={handleLoopChange} />
                </div>
            </div>
        </div>
    )
});

export default SoundComponent;



import { ButtonHTMLAttributes, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { DomEvent } from "spices";
import { KeyboardManager } from "../../../../../managers/KeyboardManager";
import { SoundsManager } from "../../../../../managers/SoundsManager";


export interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    focus?: boolean;
    keyCodes?: string[]
    soundId?: string;
}

const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(({ focus, keyCodes, type = 'button', children, soundId, ...props }: ButtonBaseProps, ref) => {

    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const onKeyUp = (e: KeyboardEvent) => {
            if (keyCodes?.includes(e.code) && buttonRef?.current) {
                buttonRef.current.click();
            }
        };

        const onClick = (e: Event) => {
            if (soundId) {
                SoundsManager.PlaySound(soundId);
            }
        }

        if (keyCodes?.length > 0) {
            KeyboardManager.OnKeyUp.add(onKeyUp);
        }

        buttonRef.current?.removeEventListener(DomEvent.CLICK, onClick);
        buttonRef.current?.addEventListener(DomEvent.CLICK, onClick);
        return () => {
            KeyboardManager.OnKeyUp.remove(onKeyUp);
            buttonRef.current?.removeEventListener(DomEvent.CLICK, onClick);
        };
    }, [keyCodes]);

    useImperativeHandle(ref, () => buttonRef.current);

    return (
        <button {...props} type={type} ref={buttonRef}>
            {children}
        </button>
    );
});

export default ButtonBase;
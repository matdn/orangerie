import { TheatersManager, TheatersProxy } from 'pancake';
import { useCallback, useEffect, useState } from 'react';
import { DomEvent, KeyboardConstant } from 'spices';
import { KeyboardManager } from '../../../managers/KeyboardManager';
import I18nHTMLText from './components/texts/I18nHTMLText.tsx';
import OpacityAnimatedReactView from './OpacityAnimatedReactView';
import VerticalSwapButton from './buttons/VerticalSwapButton';
import ButtonBase from './buttons/bases/ButtonBase';
import { TheaterTransitionCommand } from '../../../commands/TheaterTransitionCommand';

export const QuickLinksReactViewId = 'quickLinks';

export const QuickLinksReactViewOptions = {
    className: 'bottom center',
}

export const QuickLinksExcludedID = [];


export default function QuickLinksReactView() {
    const [buttons, setButtons] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleClickOpenButton = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);


    const showTheater = (theaterId: string) => {
        setIsOpen(false);
        TheaterTransitionCommand.Show(theaterId);
        // TheatersManager.ShowById(theaterId);
    };

    useEffect(() => {
        KeyboardManager.OnKeyUp.add((e) => {
            if (e.key === KeyboardConstant.Keys.Escape) {
                setIsOpen(false);
            }
        });

        const onClickWindow = (e: any) => {
            if (e.target !== document.querySelector('.openButton')) {
                setIsOpen(false);
            }
        }

        window.addEventListener(DomEvent.CLICK, onClickWindow);
        return () => {
            window.removeEventListener(DomEvent.CLICK, onClickWindow);
        }
    }, []);

    useEffect(() => {
        let buttons: any[] = [];
        for (const theaterId of TheatersProxy.TheatersMap.keys()) {
            if (!QuickLinksExcludedID.includes(theaterId)) {
                buttons.push(
                    <li key={theaterId}>
                        <VerticalSwapButton className='buttonLink' onClick={() => showTheater(theaterId)}>{theaterId}</VerticalSwapButton>
                    </li>
                );
            }
        }
        setButtons(buttons);
    }, []);

    return (
        <OpacityAnimatedReactView className={`quickLinks ${QuickLinksReactViewOptions.className}`} viewId={QuickLinksReactViewId}>
            <ButtonBase onClick={handleClickOpenButton} className={`openButton ${QuickLinksReactViewOptions.className}`}>
                <I18nHTMLText textId="LINKS" />
            </ButtonBase>

            <ul className={`links ${isOpen ? 'open' : ''}`} >
                {buttons}
            </ul>
        </OpacityAnimatedReactView >
    )
}

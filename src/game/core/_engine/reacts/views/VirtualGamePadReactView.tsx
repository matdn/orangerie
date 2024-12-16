import { ViewsProxy } from "pancake";
import { memo, useEffect, useState } from "react";
import { GamePadButtonId } from "../../../constants/GamePadButtonId";
import { VirtualGamePadConfigsManager } from "../../../managers/VirtualGamePadConfigsManager";
import { VirtualGamePadConfig } from "../../../proxies/components/VirtualGamePadConfig";
import { VirtualGamePadHTMLView } from "../../htmls/views/virtualgamepads/VirtualGamePadHTMLView";
import OpacityAnimatedReactView from "./OpacityAnimatedReactView";
import { TransitionProps } from "./bases/ReactViewBase";
import I18nHTMLText from "./components/texts/I18nHTMLText";



const VirtualGamePadReactView = memo(({ className = '', ...props }: TransitionProps) => {

    const view = ViewsProxy.GetView<VirtualGamePadHTMLView>(props.viewId);

    const [config, setConfig] = useState<VirtualGamePadConfig>(VirtualGamePadConfigsManager.CurrentConfig);

    // console.log('VirtualGamePadReactView', config);

    useEffect(() => {
        const onChangeConfig = () => {
            setConfig(VirtualGamePadConfigsManager.CurrentConfig);
        }
        VirtualGamePadConfigsManager.OnChange.add(onChangeConfig);
        onChangeConfig();
        return () => {
            VirtualGamePadConfigsManager.OnChange.remove(onChangeConfig);
        }
    }, []);

    return (
        <OpacityAnimatedReactView {...props} className={`virtualGamePadReactView ${className} ${config.virtualGamePadConfigId}`} >
            <div className={`analog analogLeft interactive ${config.hasButton(GamePadButtonId.ANALOG_LEFT) ? '' : 'hide'}`}>
                <div className="padContainer">
                    <div className="background"></div>
                    <div className="pad button"></div>
                </div>
            </div>
            <div className={`analog analogRight interactive  ${config.hasButton(GamePadButtonId.ANALOG_RIGHT) ? '' : 'hide'}`}>
                <div className="padContainer">
                    <div className="background"></div>
                    <div className="pad button"></div>
                </div>
            </div>
            <div className={`dPad ${config.hasButton(GamePadButtonId.DPAD) ? '' : 'hide'}`}>
                <div className={`button buttonUp interactive ${config.hasButton(GamePadButtonId.DPadUp) ? '' : 'hide'}`}><span></span></div>
                <div className={`button buttonDown interactive ${config.hasButton(GamePadButtonId.DPadDown) ? '' : 'hide'}`}><span></span></div>
                <div className={`button buttonLeft interactive ${config.hasButton(GamePadButtonId.DPadLeft) ? '' : 'hide'}`}><span></span></div>
                <div className={`button buttonRight interactive ${config.hasButton(GamePadButtonId.DPadRight) ? '' : 'hide'}`}><span></span></div>
            </div>
            <div className="buttons">
                <div className={`button buttonA interactive ${config.hasButton(GamePadButtonId.A) ? '' : 'hide'}`}><I18nHTMLText textId={config.getLabel(GamePadButtonId.A)} /></div>
                <div className={`button buttonB interactive ${config.hasButton(GamePadButtonId.B) ? '' : 'hide'}`}><I18nHTMLText textId={config.getLabel(GamePadButtonId.B)} /></div>
                <div className={`button buttonX interactive ${config.hasButton(GamePadButtonId.X) ? '' : 'hide'}`}><I18nHTMLText textId={config.getLabel(GamePadButtonId.X)} /></div>
                <div className={`button buttonY interactive ${config.hasButton(GamePadButtonId.Y) ? '' : 'hide'}`}><I18nHTMLText textId={config.getLabel(GamePadButtonId.Y)} /></div>
            </div>

            <div className="shoulder left">
                <div className={`button LT interactive ${config.hasButton(GamePadButtonId.LT) ? '' : 'hide'}`}><I18nHTMLText textId={config.getLabel(GamePadButtonId.LT)} /></div>
                <div className={`button LB interactive ${config.hasButton(GamePadButtonId.LB) ? '' : 'hide'}`}><I18nHTMLText textId={config.getLabel(GamePadButtonId.LB)} /></div>
            </div>
            <div className="shoulder right">
                <div className={`button RT interactive ${config.hasButton(GamePadButtonId.RT) ? '' : 'hide'}`}><I18nHTMLText textId={config.getLabel(GamePadButtonId.RT)} /></div>
                <div className={`button RB interactive ${config.hasButton(GamePadButtonId.RB) ? '' : 'hide'}`}><I18nHTMLText textId={config.getLabel(GamePadButtonId.RB)} /></div>
            </div>
        </OpacityAnimatedReactView >
    )
});
export default VirtualGamePadReactView;
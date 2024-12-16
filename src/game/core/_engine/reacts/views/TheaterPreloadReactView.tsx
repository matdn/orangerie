import { ViewsProxy } from "pancake";
import { memo, useEffect, useState } from "react";
import { TheaterPreloadReactHTMLView } from "../../htmls/views/TheaterPreloadReactHTMLView";
import OpacityAnimatedReactView from "./OpacityAnimatedReactView";
import { TransitionProps } from "./bases/ReactViewBase";


const TheaterPreloadReactView = memo(({ className = '', ...props }: TransitionProps) => {

    const [percent, setPercent] = useState<number>(0);
    useEffect(() => {
        const view = ViewsProxy.GetView<TheaterPreloadReactHTMLView>(props.viewId);
        const onChangePercent = (percent: number): void => {
            setPercent(Math.round(percent));
        }
        view.onPercentChange.add(onChangePercent);
        return () => {
            view.onPercentChange.remove(onChangePercent);
        }
    }, []);


    return (
        <OpacityAnimatedReactView {...props} className={`theaterPreloadReactView ${className}`} >
            <div className={`loadingContent ${percent == 100 ? 'loaded' : ''}`}>
                LOADING {percent}%
            </div>
        </OpacityAnimatedReactView >
    )
});

export default TheaterPreloadReactView;
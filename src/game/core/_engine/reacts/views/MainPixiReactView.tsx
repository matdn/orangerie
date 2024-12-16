import React, { useEffect } from "react";
import { MainPixi } from "../../pixis/MainPixi";
import ReactViewBase from "./bases/ReactViewBase";

export default function MainPixiReactView() {
    const refContainer = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        MainPixi.SetDomElementContainer(refContainer.current);
        MainPixi.Start();
        return () => {
            MainPixi.Stop();
        }
    }, [])


    return (
        <ReactViewBase viewId={MainPixi.VIEW_ID} className="pixi">
            <div ref={refContainer} className="pixi-container">
            </div>
        </ReactViewBase>
    )

}
import { CommonAssetsManager } from "@cooker/common";
import { ThreeAssetsManager } from "@cooker/three";
import React, { useEffect, useState } from "react";
import GameMain from "../../../../GameMain";
import LoadingCommand from "../../../../core/commands/LoadingCommand";

const PreloadReactView = () => {

    const [percent, setPercent] = useState<number>(0);
    const [loadingState, setLoadingState] = useState<string>("loading");

    useEffect(() => {
        let raf: number = 0;
        const render = () => {
            const p = LoadingCommand.GetLoadingPercentage();
            setPercent(Math.round(p));
            if (p >= 100) {
                setLoadingState("loaded");
                cancelAnimationFrame(raf);
            }
            if (!GameMain.IsInit) raf = requestAnimationFrame(render);
        }
        render();
        return () => {
            cancelAnimationFrame(raf);
        }
    }, []);

    return (
        <div className="view preloadView">
            <div className={"loadingContent " + loadingState}>
                LOADING {percent}%
            </div>
        </div>
    )
}

export default PreloadReactView;
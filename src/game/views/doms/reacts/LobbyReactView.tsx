import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { memo } from "react";
import ReactViewBase, { TransitionProps } from "../../../core/_engine/reacts/views/bases/ReactViewBase";

gsap.registerPlugin(ScrollTrigger);

const LobbyReactView = memo((props: TransitionProps) => {

    return (
        <ReactViewBase {...props} className="titlesContainer">
            <div>
                <h1>Orangerie</h1>
            </div>
        </ReactViewBase>
    );
});

export default LobbyReactView;

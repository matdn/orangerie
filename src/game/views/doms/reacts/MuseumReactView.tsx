import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import ReactViewBase, { TransitionProps } from "../../../core/_engine/reacts/views/bases/ReactViewBase";

gsap.registerPlugin(ScrollTrigger);

const MuseumReactView: React.FC<TransitionProps> = (props) => {
    const hoverRef = useRef<HTMLDivElement>(null);

    return (
        <ReactViewBase {...props} className="titlesContainer">
            <div className="titleContainer">
                <h4>Chapitre 01</h4>
                <h2 className="title">L'Orangerie</h2>
                <h3>à l’origine il y’a la serre</h3>

            </div>
            <div ref={hoverRef} className="hover-container" style={{ width: "100%", height: "400px" }}>
                {/* The hover effect will be rendered here */}
            </div>
        </ReactViewBase>
    );
};

export default MuseumReactView;

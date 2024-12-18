import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { memo, useEffect } from "react";
import ReactViewBase, { TransitionProps } from "../../../core/_engine/reacts/views/bases/ReactViewBase";
import { TheatersManager } from "pancake";
import { TheaterId } from "../../../constants/theaters/TheaterId";

gsap.registerPlugin(ScrollTrigger);

const LobbyReactView = memo((props: TransitionProps) => {

    useEffect(() => {
        gsap.to(".title", {
            scrollTrigger: {
                trigger: ".titlesContainer",
                start: "top top",
                end: "center center",
                scrub: true,
                // markers: true,
            },
            opacity: 0,
            duration: 1,
            ease: "none",
        });
        gsap.to({}, {
            scrollTrigger: {
                trigger: ".titlesContainer",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                onUpdate: (self) => {
                    const scrollProgress = self.progress;
                    window.dispatchEvent(new CustomEvent('updateCameraPosition', { detail: scrollProgress }));
                },
            },
        });
    }, []);

    return (
        <ReactViewBase {...props} className="titlesContainer">
            <div>
                <h1 className="title"><span>Musee de</span><br />l'Orangerie</h1>
            </div>
        </ReactViewBase>
    );
});

export default LobbyReactView;

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hoverEffect from "hover-effect";
import ReactViewBase, { TransitionProps } from "../../../core/_engine/reacts/views/bases/ReactViewBase";

gsap.registerPlugin(ScrollTrigger);

const LobbyReactView: React.FC<TransitionProps> = (props) => {
    const hoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize GSAP animations
        gsap.to(".title", {
            scrollTrigger: {
                trigger: ".titlesContainer",
                start: "top top",
                end: "center center",
                scrub: true,
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

        // Initialize hover-effect animation
        if (hoverRef.current) {
            new hoverEffect({
                parent: hoverRef.current,
                intensity: 0.3,
                image1: "/images/myImage1.jpg",
                image2: "/images/myImage2.jpg",
                displacementImage: "/images/myDistorsionImage.png",
            });
        }
    }, []);

    return (
        <ReactViewBase {...props} className="titlesContainer">
            <div>
                <h1 className="title"><span>Les Reveries de</span><br />l'Orangerie c'est super sympa</h1>
            </div>
            <div ref={hoverRef} className="hover-container" style={{ width: "100%", height: "400px" }}>
                {/* The hover effect will be rendered here */}
            </div>
        </ReactViewBase>
    );
};

export default LobbyReactView;

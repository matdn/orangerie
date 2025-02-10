import { useCallback } from 'react';
import ReactViewBase, { TransitionProps } from './bases/ReactViewBase';

export default function OpacityAnimatedReactView({...props}: TransitionProps) {
    const handleChange = useCallback((target: HTMLElement, value: number) => {
        // Calcul de la translation inversement proportionnelle à la valeur d'opacité
        const translateY = (1 - value) * 100; // 100px de translation quand opacity = 0
        
        // Application des styles avec transform pour de meilleures performances
        console.log('value :' + value, 'pixel :' + translateY);
        
        target.style.opacity = `${value}`;
        target.style.transform = `translateY(-${translateY}%)`;
        target.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        
        // Appliquer le changement personnalisé si fourni
        props.handleChange?.(target, value);
    }, []);

    return (
        <ReactViewBase {...props} handleChange={handleChange}>
            <div className="relative w-full h-full transition-all duration-500 ease-out will-change-transform will-change-opacity">
                {props.children}
            </div>
        </ReactViewBase>
    )
}
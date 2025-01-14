import { ShaderMaterial, IUniform } from "three";

export class BirdWingMaterial extends ShaderMaterial {
    private _uniforms: { [uniform: string]: IUniform; };

    constructor(side: number) {
        super({
            vertexShader: /* glsl */ `
                uniform float uTime; // Uniforme pour le temps
                uniform float uSide; // Uniforme pour différencier les ailes gauche/droite
                varying float vGradientFactor; // Transmettre un facteur au fragment shader

                void main() {
                    // Calculer un facteur pour le dégradé (ajuster selon votre modèle)
                    vGradientFactor = position.y - 10.0; // Utilise la hauteur des sommets

                    // Déformation des sommets
                    vec3 transformed = position;

                    // Appliquer une déformation uniquement pour les sommets éloignés de la base
                    if (vGradientFactor > 0.2) {
                        float wave = sin(uTime * 5.0 * uSide) * vGradientFactor * 0.9; // Amplitude ajustée par vGradientFactor
                        transformed.z -= wave ;
                    }

                    // Transmettre la position transformée au pipeline
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
                }
            `,
            fragmentShader: /* glsl */ `
            void main() {
                // Appliquer une couleur blanche uniforme
                gl_FragColor = vec4(.7, .7, .7, 1.); // Blanc pur
            }
            `,
            uniforms: {
                uTime: { value: 0.0 }, // Initialisation de l'uniforme de temps
                uSide: { value: side }, // 1 pour l'aile gauche, -1 pour l'aile droite
            },
        });

        this._uniforms = this.uniforms;
    }

    updateTime(delta: number): void {
        this._uniforms.uTime.value += delta * 0.001; // Met à jour le temps pour animer les ailes
    }
}

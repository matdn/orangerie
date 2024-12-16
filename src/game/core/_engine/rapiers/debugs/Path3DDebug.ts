import { BufferGeometry, Line, LineBasicMaterial, Mesh, MeshBasicMaterial, SphereGeometry, Vector3 } from "three";
import { MainThree } from "../../threejs/MainThree";

export class Path3DDebug {

    private _pathHelper: Line;
    private _startMesh: Mesh;
    private _endMesh: Mesh;

    private _debug: boolean = false;
    // private _debug: boolean = true;

    private _spheres: Array<Mesh> = new Array<Mesh>();

    constructor() {
        const pathMaterial = new LineBasicMaterial({ color: 0x00ff00, linewidth: 20 });
        this._pathHelper = new Line(new BufferGeometry(), pathMaterial);


        const startMat = new MeshBasicMaterial({ color: 0xff0000 });
        this._startMesh = new Mesh(new SphereGeometry(0.25), startMat);

        const endMat = new MeshBasicMaterial({ color: 0x00ff00 });
        this._endMesh = new Mesh(new SphereGeometry(0.25), endMat);

        if (this._debug) {
            MainThree.Scene.add(this._pathHelper);
            MainThree.Scene.add(this._startMesh);
            MainThree.Scene.add(this._endMesh);
        }
    }

    public init(): void {
        this.reset();
    }

    public reset(): void {
        for (const s of this._spheres) {
            MainThree.Scene.remove(s);
        }
    }


    public draw(path: Array<{ x: number, y: number, z: number }>): void {
        this._pathHelper.geometry.dispose();
        const path2 = new Array<Vector3>();
        for (const s of this._spheres) {
            MainThree.Scene.remove(s);
        }
        this._spheres = new Array<Mesh>();
        for (const point of path) {
            const v = new Vector3(point.x, point.y, point.z);
            const s = new Mesh(new SphereGeometry(0.1), new MeshBasicMaterial({ color: 0x0000ff }));
            s.position.copy(v);
            this._spheres.push(s);
            MainThree.Scene.add(s);
            // v.y += 0.2;
            path2.push(v);
        }
        this._pathHelper.geometry = new BufferGeometry().setFromPoints(path2);

        this._startMesh.position.copy(path2[0]);
        this._endMesh.position.copy(path2[path2.length - 1]);
    }


}
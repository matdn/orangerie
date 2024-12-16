import { BufferGeometry, Color, Float32BufferAttribute, Group, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, SphereGeometry } from "three";
import * as YUKA from "yuka";
import { MainThree } from "../../threejs/MainThree";

export class YUKADebug {

    // private _debug: boolean = true;
    private _debug: boolean = false;


    constructor() {
        // 
    }

    public addNavMesh(navMesh: YUKA.NavMesh, color: number = 0x00ff00) {
        const navMeshGroup = this._createConvexRegionHelper(navMesh, color);
        const graph = navMesh.graph;
        const graphHelper = this._createGraphHelper(graph, 0.2);

        if (this._debug) {
            MainThree.Scene.add(navMeshGroup);
            MainThree.Scene.add(graphHelper);
        }
    }

    public init(): void {

    }

    public reset(): void {
    }


    //
    //
    //

    private _createConvexRegionHelper(navMesh: YUKA.NavMesh, c: number = 0x00ff00) {

        const regions = navMesh.regions;
        const geometry = new BufferGeometry();
        const material = new MeshBasicMaterial({ wireframe: true, color: c });
        const mesh = new Mesh(geometry, material);
        const positions = [];
        const colors = [];
        const color = new Color();

        for (let region of regions) {
            color.setHex(Math.random() * 0xffffff);
            let edge = region.edge;
            const edges = [];
            do {
                edges.push(edge);
                edge = edge.next;
            } while (edge !== region.edge);
            const triangleCount = (edges.length - 2);
            for (let i = 1, l = triangleCount; i <= l; i++) {

                const v1 = edges[0].vertex;
                const v2 = edges[i + 0].vertex;
                const v3 = edges[i + 1].vertex;

                positions.push(v1.x, v1.y, v1.z);
                positions.push(v2.x, v2.y, v2.z);
                positions.push(v3.x, v3.y, v3.z);

                colors.push(color.r, color.g, color.b);
                colors.push(color.r, color.g, color.b);
                colors.push(color.r, color.g, color.b);
            }
        }

        geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

        return mesh;
    }



    private _createGraphHelper(graph: YUKA.Graph, nodeSize: number = 1, nodeColor: number = 0x4e84c4, edgeColor: number = 0xffffff) {

        const group = new Group();
        const nodeMaterial = new MeshBasicMaterial({ color: nodeColor });
        const nodeGeometry = new SphereGeometry(nodeSize, 2);
        const nodes = [];

        graph.getNodes(nodes);

        for (let node of nodes) {
            const nodeMesh = new Mesh(nodeGeometry, nodeMaterial);
            nodeMesh.position.copy(node.position);
            nodeMesh.userData.nodeIndex = node.index;
            nodeMesh.matrixAutoUpdate = false;
            nodeMesh.updateMatrix();
            group.add(nodeMesh);
        }

        const edgesGeometry = new BufferGeometry();
        const position = [];
        const edgesMaterial = new LineBasicMaterial({ color: edgeColor });
        const edges = [];

        for (let node of nodes) {
            graph.getEdgesOfNode(node.index, edges);
            for (let edge of edges) {
                const fromNode = graph.getNode(edge.from) as YUKA.NavNode;
                const toNode = graph.getNode(edge.to) as YUKA.NavNode;
                position.push(fromNode.position.x, fromNode.position.y, fromNode.position.z);
                position.push(toNode.position.x, toNode.position.y, toNode.position.z);
            }
        }

        edgesGeometry.setAttribute('position', new Float32BufferAttribute(position, 3));
        const lines = new LineSegments(edgesGeometry, edgesMaterial);
        lines.matrixAutoUpdate = false;
        group.add(lines);
        return group;
    }

}
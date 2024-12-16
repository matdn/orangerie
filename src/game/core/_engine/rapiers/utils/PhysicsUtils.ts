import { Collider, ColliderDesc, RigidBody, RigidBodyDesc } from "@dimforge/rapier3d-compat";
import * as THREE from "three";
import { Box3, BufferGeometry, Mesh, Vector3 } from "three";
import { Quaternion } from "yuka";
import { ActorBase } from "../actors/bases/ActorBase";
import { PhysicsWorld } from "../world/PhysicsWorld";

export class PhysicsUtils {

    public static CreatePhysicsFromMesh(world: PhysicsWorld, mesh: Mesh, actor: ActorBase | null = null): { bodyDesc: RigidBodyDesc, body: RigidBody, collider: Collider } | null {
        mesh.visible = false;
        const geometry = mesh.geometry.clone();
        const box = this.GetBoxFromGeometry(geometry);
        let bodyColliderDesc: ColliderDesc | null = null;
        let wpos = new Vector3(0, 0, 0);
        let quaternion = new THREE.Quaternion(0, 0, 0, 1);

        if (mesh.name.toLowerCase().includes("cylinder")) {
            geometry.computeBoundingBox();
            const box = geometry.boundingBox;
            const wscale = new Vector3();
            mesh.getWorldScale(wscale);
            const cx = (box.max.x + box.min.x) * 0.5;
            const cy = (box.max.y + box.min.y) * 0.5;
            const cz = (box.max.z + box.min.z) * 0.5;
            const w = (box.max.x - box.min.x) * 0.5 * Math.abs(wscale.x);
            const h = (box.max.y - box.min.y) * 0.5 * Math.abs(wscale.y);
            wpos = new Vector3(cx, cy, cz);
            mesh.localToWorld(wpos);

            bodyColliderDesc = ColliderDesc.cylinder(h, w);
            quaternion = mesh.quaternion;

        } else if (mesh.name.toLowerCase().includes("sphere")) {
            const wscale = new Vector3();
            mesh.geometry.computeBoundingSphere();
            const sphere = mesh.geometry.boundingSphere;
            mesh.getWorldScale(wscale);
            const cx = (sphere.center.x);
            const cy = (sphere.center.y);
            const cz = (sphere.center.z);
            const r = sphere.radius * Math.abs(wscale.x);
            wpos = new Vector3(cx, cy, cz);
            mesh.localToWorld(wpos);
            bodyColliderDesc = ColliderDesc.ball(r);
        } else if (box) {
            const wscale = new Vector3();
            mesh.getWorldScale(wscale);
            const cx = (box.max.x + box.min.x) * 0.5;
            const cy = (box.max.y + box.min.y) * 0.5;
            const cz = (box.max.z + box.min.z) * 0.5;
            const w = (box.max.x - box.min.x) * 0.5 * Math.abs(wscale.x);
            const h = (box.max.y - box.min.y) * 0.5 * Math.abs(wscale.y);
            const d = (box.max.z - box.min.z) * 0.5 * Math.abs(wscale.z);
            wpos = new Vector3(cx, cy, cz);
            mesh.localToWorld(wpos);
            bodyColliderDesc = ColliderDesc.cuboid(w, h, d);
            quaternion = mesh.quaternion;
        } else {
            mesh.updateWorldMatrix(true, true);
            geometry.applyMatrix4(mesh.matrixWorld);
            const vertices = Array.from(geometry.attributes.position.array);
            const trimeshVertices = new Float32Array(vertices.length);
            for (let i = 0; i < vertices.length; i++) trimeshVertices[i] = vertices[i];
            const faces = Array.from(geometry.index.array);
            const trimeshFaces = new Uint32Array(faces.length);
            for (let i = 0; i < faces.length; i++) trimeshFaces[i] = faces[i];
            bodyColliderDesc = ColliderDesc.trimesh(trimeshVertices, trimeshFaces);
        }

        if (bodyColliderDesc) {
            let friction = 0;
            let density = 1;
            let mass = 0;
            let restitution = 0;
            if (mesh.userData?.friction != undefined) friction = mesh.userData.friction;
            if (mesh.userData?.density != undefined) density = mesh.userData.density;
            if (mesh.userData?.mass != undefined) mass = mesh.userData.mass;
            if (mesh.userData?.restitution != undefined) restitution = mesh.userData.restitution
            bodyColliderDesc.setFriction(friction);
            bodyColliderDesc.setDensity(density);
            bodyColliderDesc.setMass(mass);
            bodyColliderDesc.setRestitution(restitution);

            const bodyDesc = RigidBodyDesc.fixed();
            const body = world.createRigidBody(bodyDesc);

            body.setTranslation(wpos, true);
            body.setRotation(new Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w), true);
            const collider = world.createCollider(bodyColliderDesc, body);
            if (actor) world.addActor(actor);
            return {
                bodyDesc: bodyDesc,
                body: body,
                collider: collider
            }
        }
        return null;
    }


    public static GetBoxFromGeometry(geometry: BufferGeometry): Box3 | null {
        if (geometry.attributes.position.count != 24) return null;
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        for (let i = 0; i < geometry.attributes.position.count; i++) {
            const x = geometry.attributes.position.getX(i);
            const y = geometry.attributes.position.getY(i);
            const z = geometry.attributes.position.getZ(i);
            if (x != box.min.x && x != box.max.x) return null;
            if (y != box.min.y && y != box.max.y) return null;
            if (z != box.min.z && z != box.max.z) return null;

        }
        return box;
    }



}
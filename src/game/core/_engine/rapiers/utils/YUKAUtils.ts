import { BufferGeometry } from "three";
import * as YUKA from "yuka";

export class YUKAUtils {

    public static CreateNavMeshFromGeometry(geom: BufferGeometry): YUKA.NavMesh {
        const polygons = YUKAUtils.ParseGeometry(geom);
        const navMesh = new YUKA.NavMesh();
        navMesh.fromPolygons(polygons);
        return navMesh;
    }

    public static ParseGeometry(data: BufferGeometry): Array<YUKA.Polygon> {

        const index = data.index;
        const position = data.attributes.position;

        const vertices = new Array<YUKA.Vector3>();
        const polygons = new Array<YUKA.Polygon>();

        for (let i = 0, l = position.count; i < l; i++) {
            const v = new YUKA.Vector3();
            v.x = position.getX(i);
            v.y = position.getY(i);
            v.z = position.getZ(i);
            vertices.push(v);
        }

        for (let i = 0, l = index.count; i < l; i += 3) {
            const a = index.getX(i);
            const b = index.getY(i);
            const c = index.getZ(i);
            const contour = [vertices[a], vertices[b], vertices[c]];
            const polygon = new YUKA.Polygon().fromContour(contour);
            polygons.push(polygon);
        }
        return polygons;
    }

}
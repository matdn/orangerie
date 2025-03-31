import { AssetId } from "./AssetId";

export enum Object3DId {
    LOBBY = AssetId.GLTF_LOBBY + 'Lobby',
    LOBBY_GLASS = AssetId.GLTF_LOBBY + 'Glass',
    LOBBY_WHITE = AssetId.GLTF_LOBBY + 'WhiteElement',
    LOBBY_PAINT = AssetId.GLTF_LOBBY + 'ReflectMaterial',
    COMMON_SKY = AssetId.GLTF_COMMON + 'Sky',
    LOBBY_MIDDLE_BLOC = AssetId.GLTF_LOBBY + 'MiddleBloc',
    LOBBY_WALL = AssetId.GLTF_LOBBY + 'Walls',
    LOBBY_FLOAR = AssetId.GLTF_LOBBY + 'Floar',

    MUSEUM = AssetId.GLTF_MUSEUM + 'Museum',
    MUSEUM_CAMERAS = AssetId.GLTF_MUSEUM + 'CameraPositions',
    MUSEUM_WALL = AssetId.GLTF_MUSEUM + 'Wall',
    MUSEUM_TOP = AssetId.GLTF_MUSEUM + 'TopLighter',
    MUSEUM_TREE = AssetId.GLTF_MUSEUM + 'tree',
    MUSEUM_GROUND = AssetId.GLTF_MUSEUM + 'Ground',
    MUSEUM_BIRD = AssetId.GLTF_MUSEUM + 'BirdEmpty',
    MUSEUM_BIRD_LEFT_WING = AssetId.GLTF_MUSEUM + 'wingLeft',
    MUSEUM_BIRD_RIGHT_WING = AssetId.GLTF_MUSEUM + 'wingRight',
    MUSEUM_ORANGES = AssetId.GLTF_MUSEUM + 'oranges',
    MUSEUM_LEFT_PAINT = AssetId.GLTF_MUSEUM + 'LeftWall',
    MUSEUM_RIGHT_PAINT = AssetId.GLTF_MUSEUM + 'RightWall',
    MUSEUM_MIDDLE_PAINT = AssetId.GLTF_MUSEUM + 'MiddlePaint',
}
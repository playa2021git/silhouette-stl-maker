import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { LIMITS, type ModelSettings } from './units';

export interface GeometryBuildResult { group: THREE.Group; geometry: THREE.BufferGeometry; }

const plateMaterial = new THREE.MeshStandardMaterial({ color: 0xf2c46d, roughness: 0.72, metalness: 0.02 });
const reliefMaterial = new THREE.MeshStandardMaterial({ color: 0x2f7dd1, roughness: 0.5, metalness: 0.03 });

const createRoundedRectangleShape = (width: number, height: number, radius: number): THREE.Shape => {
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);
  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
};

const createPlateShape = (settings: ModelSettings): THREE.Shape => {
  if (settings.plateShape === 'circle') {
    const radius = Math.min(settings.width, settings.height) / 2;
    return new THREE.Shape().absarc(0, 0, radius, 0, Math.PI * 2, false);
  }

  if (settings.plateShape === 'rounded-square') {
    const size = Math.min(settings.width, settings.height);
    return createRoundedRectangleShape(size, size, Math.max(5, size * 0.12));
  }

  return createRoundedRectangleShape(settings.width, settings.height, Math.max(5, Math.min(settings.width, settings.height) * 0.12));
};

const createExtrudedMesh = (shape: THREE.Shape, depth: number, material: THREE.Material, bevelEnabled: boolean): THREE.Mesh<THREE.ExtrudeGeometry> => {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled,
    bevelSize: LIMITS.bevel.size,
    bevelThickness: LIMITS.bevel.thickness,
    bevelSegments: 1,
    curveSegments: 18,
  });
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
};

const addTabMesh = (group: THREE.Group, settings: ModelSettings, zOffset: number, depth: number): void => {
  const tabY = settings.height / 2 + settings.tabDiameter / 2 - 2;
  const tabShape = new THREE.Shape().absarc(0, tabY, settings.tabDiameter / 2, 0, Math.PI * 2, false);
  const hole = new THREE.Path().absarc(0, tabY, settings.holeDiameter / 2, 0, Math.PI * 2, true);
  tabShape.holes.push(hole);
  const tabMesh = createExtrudedMesh(tabShape, depth, plateMaterial, false);
  tabMesh.position.z = zOffset;
  group.add(tabMesh);
};

const createSilhouetteMeshes = (svgText: string, targetWidth: number, targetHeight: number, depth: number, zOffset: number, bevelEnabled: boolean): THREE.Mesh[] => {
  const loader = new SVGLoader();
  const data = loader.parse(svgText);
  const shapes = data.paths.flatMap((path: Parameters<typeof SVGLoader.createShapes>[0]) => SVGLoader.createShapes(path));
  if (shapes.length === 0) throw new Error('SVGから形状を作れませんでした。');

  const sourceGroup = new THREE.Group();
  for (const shape of shapes) sourceGroup.add(createExtrudedMesh(shape, depth, reliefMaterial, bevelEnabled));
  const box = new THREE.Box3().setFromObject(sourceGroup);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  if (size.x <= 0 || size.y <= 0) throw new Error('SVGのサイズを計算できませんでした。');
  const scale = Math.min(targetWidth / size.x, targetHeight / size.y);

  return sourceGroup.children.map((child: THREE.Object3D) => {
    const mesh = child as THREE.Mesh<THREE.BufferGeometry>;
    const geometry = mesh.geometry.clone();
    geometry.translate(-center.x, -center.y, 0);
    geometry.scale(scale, -scale, 1);
    geometry.translate(0, 0, zOffset);
    geometry.computeVertexNormals();
    return new THREE.Mesh(geometry, reliefMaterial);
  });
};

export const createModelGroup = (svgText: string, settings: ModelSettings): GeometryBuildResult => {
  const output = new THREE.Group();
  const isRelief = settings.modelMode === 'relief';
  const silhouetteDepth = isRelief ? settings.reliefHeight : settings.depth;
  const plateDepth = isRelief ? settings.plateThickness : 0;
  const plateUsableWidth = settings.plateShape === 'rounded-rectangle' ? settings.width : Math.min(settings.width, settings.height);
  const plateUsableHeight = settings.plateShape === 'rounded-rectangle' ? settings.height : Math.min(settings.width, settings.height);
  const targetWidth = isRelief ? plateUsableWidth - settings.plateMargin * 2 : settings.width;
  const targetHeight = isRelief ? plateUsableHeight - settings.plateMargin * 2 : settings.height;

  if (isRelief) {
    output.add(createExtrudedMesh(createPlateShape(settings), settings.plateThickness, plateMaterial, settings.bevelEnabled));
  }

  for (const mesh of createSilhouetteMeshes(svgText, targetWidth, targetHeight, silhouetteDepth, plateDepth, settings.bevelEnabled)) {
    output.add(mesh);
  }

  if (settings.addTab) {
    addTabMesh(output, settings, 0, isRelief ? settings.plateThickness : settings.depth);
  }

  const merged = new THREE.BufferGeometry();
  return { group: output, geometry: merged };
};

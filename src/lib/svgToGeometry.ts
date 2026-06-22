import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { LIMITS, type ModelSettings } from './units';

export interface GeometryBuildResult { group: THREE.Group; geometry: THREE.BufferGeometry; }

const centerGeometry = (geometry: THREE.BufferGeometry): void => {
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  if (!box) return;
  const center = new THREE.Vector3();
  box.getCenter(center);
  geometry.translate(-center.x, -center.y, 0);
};

export const createModelGroup = (svgText: string, settings: ModelSettings): GeometryBuildResult => {
  const loader = new SVGLoader();
  const data = loader.parse(svgText);
  const shapes = data.paths.flatMap((path: Parameters<typeof SVGLoader.createShapes>[0]) => SVGLoader.createShapes(path));
  if (shapes.length === 0) throw new Error('SVGから形状を作れませんでした。');

  const sourceGroup = new THREE.Group();
  for (const shape of shapes) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: settings.depth,
      bevelEnabled: settings.bevelEnabled,
      bevelSize: LIMITS.bevel.size,
      bevelThickness: LIMITS.bevel.thickness,
      bevelSegments: 1,
      curveSegments: 16,
    });
    sourceGroup.add(new THREE.Mesh(geometry));
  }

  const box = new THREE.Box3().setFromObject(sourceGroup);
  const size = new THREE.Vector3();
  box.getSize(size);
  const scale = Math.min(settings.width / size.x, settings.height / size.y);

  const output = new THREE.Group();
  for (const child of sourceGroup.children) {
    const mesh = child as THREE.Mesh<THREE.BufferGeometry>;
    const cloned = mesh.geometry.clone();
    cloned.scale(scale, -scale, 1);
    centerGeometry(cloned);
    output.add(new THREE.Mesh(cloned, new THREE.MeshStandardMaterial({ color: 0x2f7dd1, roughness: 0.55 })));
  }

  if (settings.addTab) {
    const tabShape = new THREE.Shape().absarc(0, settings.height / 2 + settings.tabDiameter / 2 - 2, settings.tabDiameter / 2, 0, Math.PI * 2, false);
    const hole = new THREE.Path().absarc(0, settings.height / 2 + settings.tabDiameter / 2 - 2, settings.holeDiameter / 2, 0, Math.PI * 2, true);
    tabShape.holes.push(hole);
    const tabGeometry = new THREE.ExtrudeGeometry(tabShape, { depth: settings.depth, bevelEnabled: false, curveSegments: 24 });
    output.add(new THREE.Mesh(tabGeometry, new THREE.MeshStandardMaterial({ color: 0x2f7dd1, roughness: 0.55 })));
  }

  const merged = new THREE.BufferGeometry();
  const geometries = output.children.map((child: THREE.Object3D) => (child as THREE.Mesh<THREE.BufferGeometry>).geometry);
  const positions: number[] = [];
  const normals: number[] = [];
  for (const geometry of geometries) {
    const pos = geometry.getAttribute('position');
    const norm = geometry.getAttribute('normal');
    for (let i = 0; i < pos.count; i++) {
      positions.push(pos.getX(i), pos.getY(i), pos.getZ(i));
      normals.push(norm.getX(i), norm.getY(i), norm.getZ(i));
    }
  }
  merged.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  merged.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  return { group: output, geometry: merged };
};

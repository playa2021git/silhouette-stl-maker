import * as THREE from 'three';
import type { ModelSettings } from './units';

const plateMaterial = new THREE.MeshStandardMaterial({ color: 0xf2c46d, roughness: 0.72, metalness: 0.02 });
const petalMaterial = new THREE.MeshStandardMaterial({ color: 0xf4b63f, roughness: 0.58, metalness: 0.02 });
const centerMaterial = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.68, metalness: 0.01 });
const seedMaterial = new THREE.MeshStandardMaterial({ color: 0x5b371d, roughness: 0.72, metalness: 0.01 });

const PETAL_HEIGHT = 1.2;
const CENTER_HEIGHT = 1.6;
const SEED_DOT_HEIGHT = 0.4;
const PETAL_COUNT = 18;

const createRoundedRectPlate = (width: number, height: number, radius: number): THREE.Shape => {
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

const createCircleShape = (radius: number): THREE.Shape => new THREE.Shape().absarc(0, 0, radius, 0, Math.PI * 2, false);

const createPetalShape = (length: number, width: number): THREE.Shape => {
  const shape = new THREE.Shape();
  shape.moveTo(-width * 0.38, 2);
  shape.bezierCurveTo(-width, 7, -width * 0.9, length * 0.68, 0, length);
  shape.bezierCurveTo(width * 0.9, length * 0.68, width, 7, width * 0.38, 2);
  shape.bezierCurveTo(width * 0.2, 0, -width * 0.2, 0, -width * 0.38, 2);
  return shape;
};

const createExtrudedMesh = (shape: THREE.Shape, depth: number, material: THREE.Material): THREE.Mesh<THREE.ExtrudeGeometry> => {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSize: 0.18,
    bevelThickness: 0.18,
    bevelSegments: 1,
    curveSegments: 18,
  });
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
};

const createSeedDots = (centerRadius: number): THREE.Group => {
  const group = new THREE.Group();
  const dots = [
    [0, 0, 2.2],
    [-6, 0, 1.9], [6, 0, 1.9], [0, -6, 1.9], [0, 6, 1.9],
    [-7, -7, 1.7], [7, -7, 1.7], [-7, 7, 1.7], [7, 7, 1.7],
    [-11, 0, 1.6], [11, 0, 1.6], [0, -11, 1.6], [0, 11, 1.6],
  ] as const;

  for (const [x, y, radius] of dots) {
    if (Math.hypot(x, y) + radius > centerRadius - 1.5) continue;
    const dot = createExtrudedMesh(createCircleShape(radius), SEED_DOT_HEIGHT, seedMaterial);
    dot.position.set(x, y, 0);
    group.add(dot);
  }

  return group;
};

const addKeychainTab = (group: THREE.Group, settings: ModelSettings): void => {
  if (!settings.addTab) return;
  const tabY = settings.height / 2 + settings.tabDiameter / 2 - 2;
  const tabShape = new THREE.Shape().absarc(0, tabY, settings.tabDiameter / 2, 0, Math.PI * 2, false);
  const hole = new THREE.Path().absarc(0, tabY, settings.holeDiameter / 2, 0, Math.PI * 2, true);
  tabShape.holes.push(hole);
  group.add(createExtrudedMesh(tabShape, settings.plateThickness, plateMaterial));
};

export const createSunflowerRelief = (settings: ModelSettings): THREE.Group => {
  const group = new THREE.Group();
  const plateRadius = Math.max(5, Math.min(settings.width, settings.height) * 0.12);
  const plateMesh = createExtrudedMesh(createRoundedRectPlate(settings.width, settings.height, plateRadius), settings.plateThickness, plateMaterial);
  group.add(plateMesh);
  addKeychainTab(group, settings);

  const usableWidth = settings.width - settings.plateMargin * 2;
  const usableHeight = settings.height - settings.plateMargin * 2;
  const outerRadius = Math.max(12, Math.min(usableWidth, usableHeight) / 2);
  const petalLength = outerRadius * 0.42;
  const basePetalWidth = outerRadius * 0.16;
  const centerRadius = outerRadius * 0.38;
  const petalRootRadius = centerRadius * 0.72;

  const petalGroup = new THREE.Group();
  for (let index = 0; index < PETAL_COUNT; index += 1) {
    const angle = (Math.PI * 2 * index) / PETAL_COUNT;
    const length = petalLength * (index % 2 === 0 ? 1.08 : 0.94);
    const width = basePetalWidth * (index % 2 === 0 ? 1.0 : 0.92);
    const petal = createExtrudedMesh(createPetalShape(length, width), PETAL_HEIGHT, petalMaterial);
    petal.rotation.z = -angle;
    petal.position.set(Math.sin(angle) * petalRootRadius, Math.cos(angle) * petalRootRadius, settings.plateThickness);
    petalGroup.add(petal);
  }
  group.add(petalGroup);

  const centerMesh = createExtrudedMesh(createCircleShape(centerRadius), CENTER_HEIGHT, centerMaterial);
  centerMesh.position.z = settings.plateThickness;
  group.add(centerMesh);

  const seedDotGroup = createSeedDots(centerRadius);
  seedDotGroup.position.z = settings.plateThickness + CENTER_HEIGHT;
  group.add(seedDotGroup);

  return group;
};

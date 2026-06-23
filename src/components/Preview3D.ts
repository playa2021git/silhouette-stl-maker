import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Preview3D {
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(42, 1, 0.1, 1000);
  private readonly renderer = new THREE.WebGLRenderer({ antialias: true });
  private readonly controls: OrbitControls;
  private current?: THREE.Group;

  constructor(private readonly container: HTMLElement) {
    this.scene.background = new THREE.Color(0xf7fbff);
    this.camera.position.set(70, -95, 70);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.maxPolarAngle = Math.PI * 0.48;
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.append(this.renderer.domElement);

    const grid = new THREE.GridHelper(160, 16, 0x91a4b7, 0xd5dde6);
    grid.rotation.x = Math.PI / 2;
    this.scene.add(grid);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(180, 180), new THREE.ShadowMaterial({ opacity: 0.12 }));
    floor.receiveShadow = true;
    this.scene.add(floor);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.35);
    keyLight.position.set(45, -55, 95);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    this.scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xd8ecff, 0.55);
    fillLight.position.set(-70, 40, 65);
    this.scene.add(fillLight);
    window.addEventListener('resize', () => this.resize());
    this.resize();
    this.animate();
  }

  setModel(model?: THREE.Group): void {
    if (this.current) this.scene.remove(this.current);
    this.current = model;
    if (!model) return;
    model.traverse((object: THREE.Object3D) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    this.scene.add(model);
    const box = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    box.getCenter(center);
    model.position.sub(center);
    model.position.z -= box.min.z - center.z;
    this.controls.target.set(0, 0, 8);
    this.controls.update();
  }

  private resize(): void {
    const width = Math.max(320, this.container.clientWidth);
    const height = Math.max(300, this.container.clientHeight);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
}

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Preview3D {
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  private readonly renderer = new THREE.WebGLRenderer({ antialias: true });
  private readonly controls: OrbitControls;
  private current?: THREE.Group;

  constructor(private readonly container: HTMLElement) {
    this.scene.background = new THREE.Color(0xf7fbff);
    this.camera.position.set(0, -120, 90);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.container.append(this.renderer.domElement);
    this.scene.add(new THREE.GridHelper(160, 16, 0x91a4b7, 0xd5dde6));
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const light = new THREE.DirectionalLight(0xffffff, 1.1);
    light.position.set(40, -60, 80);
    this.scene.add(light);
    window.addEventListener('resize', () => this.resize());
    this.resize();
    this.animate();
  }

  setModel(model?: THREE.Group): void {
    if (this.current) this.scene.remove(this.current);
    this.current = model;
    if (!model) return;
    this.scene.add(model);
    const box = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    box.getCenter(center);
    model.position.sub(center);
    this.controls.target.set(0, 0, 0);
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

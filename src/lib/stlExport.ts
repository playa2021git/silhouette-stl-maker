import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';
import type { IconDefinition } from '../data/iconRegistry';
import type { ModelSettings } from './units';

export const downloadStl = (group: THREE.Group, icon: IconDefinition, settings: ModelSettings): void => {
  const exporter = new STLExporter();
  const result = exporter.parse(group, { binary: true });
  const blob = new Blob([result as ArrayBuffer], { type: 'model/stl' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `silhouette-${icon.id}-${settings.width}x${settings.height}x${settings.depth}mm.stl`;
  a.click();
  URL.revokeObjectURL(url);
};

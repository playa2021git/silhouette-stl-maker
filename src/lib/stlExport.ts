import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';
import type { IconDefinition } from '../data/iconRegistry';
import type { ModelSettings } from './units';

const createStlBlob = (result: string | DataView): Blob => {
  if (typeof result === 'string') {
    return new Blob([result], { type: 'model/stl' });
  }

  // DataViewが参照している範囲だけを新しいUint8Arrayへコピーする。
  // 共有元のArrayBuffer全体をBlob化すると、不要なバイトが混ざる可能性がある。
  const sourceBytes = new Uint8Array(result.buffer, result.byteOffset, result.byteLength);
  const bytes = new Uint8Array(result.byteLength);
  bytes.set(sourceBytes);

  return new Blob([bytes], { type: 'model/stl' });
};

export const downloadStl = (group: THREE.Group, icon: IconDefinition, settings: ModelSettings): void => {
  const exporter = new STLExporter();
  const result = exporter.parse(group, { binary: true });
  const blob = createStlBlob(result);
  const totalDepth = settings.modelMode === 'relief' ? settings.plateThickness + settings.reliefHeight : settings.depth;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `silhouette-${icon.id}-${settings.width}x${settings.height}x${totalDepth}mm.stl`;
  a.click();
  URL.revokeObjectURL(url);
};

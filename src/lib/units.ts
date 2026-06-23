export type ModelMode = 'relief' | 'silhouette';
export type PlateShape = 'rounded-rectangle' | 'circle' | 'rounded-square';

export const LIMITS = {
  width: { min: 20, max: 120, default: 60 },
  height: { min: 20, max: 120, default: 45 },
  depth: { min: 1.2, max: 10, default: 3 },
  plateThickness: { min: 1.2, max: 6, default: 2.4 },
  reliefHeight: { min: 0.6, max: 5, default: 1.6 },
  plateMargin: { min: 3, max: 18, default: 6 },
  holeDiameter: { min: 3, max: 8, default: 4 },
  tabDiameter: { min: 10, max: 24, default: 12 },
  bevel: { size: 0.3, thickness: 0.3 },
} as const;

export interface ModelSettings {
  width: number;
  height: number;
  depth: number;
  modelMode: ModelMode;
  plateShape: PlateShape;
  plateThickness: number;
  reliefHeight: number;
  plateMargin: number;
  addTab: boolean;
  holeDiameter: number;
  tabDiameter: number;
  bevelEnabled: boolean;
}

export const defaultSettings: ModelSettings = {
  width: LIMITS.width.default,
  height: LIMITS.height.default,
  depth: LIMITS.depth.default,
  modelMode: 'relief',
  plateShape: 'rounded-rectangle',
  plateThickness: LIMITS.plateThickness.default,
  reliefHeight: LIMITS.reliefHeight.default,
  plateMargin: LIMITS.plateMargin.default,
  addTab: false,
  holeDiameter: LIMITS.holeDiameter.default,
  tabDiameter: LIMITS.tabDiameter.default,
  bevelEnabled: false,
};

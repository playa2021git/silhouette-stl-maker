export const LIMITS = {
  width: { min: 20, max: 120, default: 50 },
  height: { min: 20, max: 120, default: 50 },
  depth: { min: 1.2, max: 10, default: 3 },
  holeDiameter: { min: 3, max: 8, default: 4 },
  tabDiameter: { min: 10, max: 24, default: 12 },
  bevel: { size: 0.35, thickness: 0.35 },
} as const;

export interface ModelSettings {
  width: number;
  height: number;
  depth: number;
  addTab: boolean;
  holeDiameter: number;
  tabDiameter: number;
  bevelEnabled: boolean;
}

export const defaultSettings: ModelSettings = {
  width: LIMITS.width.default,
  height: LIMITS.height.default,
  depth: LIMITS.depth.default,
  addTab: false,
  holeDiameter: LIMITS.holeDiameter.default,
  tabDiameter: LIMITS.tabDiameter.default,
  bevelEnabled: false,
};

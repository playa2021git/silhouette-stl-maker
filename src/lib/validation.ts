import type { IconDefinition } from '../data/iconRegistry';
import { LIMITS, type ModelSettings } from './units';

export interface ValidationResult { errors: string[]; warnings: string[]; }
const inRange = (n: number, min: number, max: number) => Number.isFinite(n) && n >= min && n <= max;

export const validateSettings = (settings: ModelSettings, icon?: IconDefinition): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!icon) errors.push('対応している形を選んでからSTLを出力してください。');
  if (!inRange(settings.width, LIMITS.width.min, LIMITS.width.max)) errors.push('全体の幅は20〜120mmにしてください。');
  if (!inRange(settings.height, LIMITS.height.min, LIMITS.height.max)) errors.push('全体の高さは20〜120mmにしてください。');
  if (!inRange(settings.depth, LIMITS.depth.min, LIMITS.depth.max)) errors.push('プレートなし時の厚みは1.2〜10mmにしてください。');
  if (!inRange(settings.plateThickness, LIMITS.plateThickness.min, LIMITS.plateThickness.max)) errors.push('プレート厚みは1.2〜6mmにしてください。');
  if (!inRange(settings.reliefHeight, LIMITS.reliefHeight.min, LIMITS.reliefHeight.max)) errors.push('シルエット高さは0.6〜5mmにしてください。');
  if (!inRange(settings.plateMargin, LIMITS.plateMargin.min, LIMITS.plateMargin.max)) errors.push('プレート余白は3〜18mmにしてください。');
  if (settings.modelMode === 'relief' && settings.plateMargin * 2 >= Math.min(settings.width, settings.height) - 8) errors.push('プレート余白が大きすぎます。シルエットを置く場所がなくなります。');
  if (!inRange(settings.holeDiameter, LIMITS.holeDiameter.min, LIMITS.holeDiameter.max)) errors.push('穴の直径は3〜8mmにしてください。');
  if (settings.addTab && settings.tabDiameter < settings.holeDiameter + 4) errors.push('タブ直径は穴直径より4mm以上大きくしてください。');
  if (settings.addTab && (settings.tabDiameter - settings.holeDiameter) / 2 < 2) warnings.push('キーホルダー穴の周りが薄く、割れやすい可能性があります。');
  if (settings.modelMode === 'silhouette' && settings.depth < 1.5) warnings.push('プレートなしで厚みが薄いと、印刷後に折れやすくなります。');
  if (settings.reliefHeight < 1) warnings.push('シルエット高さが低いため、段差が見えにくい可能性があります。');
  if (settings.width < 35 || settings.height < 35) warnings.push('サイズが小さいため、細かい部分がつぶれる可能性があります。');
  if (icon?.printability === 'caution') warnings.push('この形は細い部分があるため、印刷後に折れやすい可能性があります。');
  if (settings.bevelEnabled && icon?.printability === 'caution') warnings.push('細かい形でベベルを使うと形が少し崩れることがあります。');
  return { errors, warnings };
};

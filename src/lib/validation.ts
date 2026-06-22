import type { IconDefinition } from '../data/iconRegistry';
import { LIMITS, type ModelSettings } from './units';

export interface ValidationResult { errors: string[]; warnings: string[]; }
const inRange = (n: number, min: number, max: number) => Number.isFinite(n) && n >= min && n <= max;

export const validateSettings = (settings: ModelSettings, icon?: IconDefinition): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!icon) errors.push('対応している形を選んでからSTLを出力してください。');
  if (!inRange(settings.width, LIMITS.width.min, LIMITS.width.max)) errors.push('幅は20〜120mmにしてください。');
  if (!inRange(settings.height, LIMITS.height.min, LIMITS.height.max)) errors.push('高さは20〜120mmにしてください。');
  if (!inRange(settings.depth, LIMITS.depth.min, LIMITS.depth.max)) errors.push('厚みは1.2〜10mmにしてください。');
  if (!inRange(settings.holeDiameter, LIMITS.holeDiameter.min, LIMITS.holeDiameter.max)) errors.push('穴の直径は3〜8mmにしてください。');
  if (settings.addTab && settings.tabDiameter < settings.holeDiameter + 4) errors.push('タブ直径は穴直径より4mm以上大きくしてください。');
  if (settings.addTab && (settings.tabDiameter - settings.holeDiameter) / 2 < 2) warnings.push('キーホルダー穴の周りが薄く、割れやすい可能性があります。');
  if (settings.depth < 1.5) warnings.push('厚みが薄いため、印刷後に折れやすい可能性があります。');
  if (settings.width < 30 || settings.height < 30) warnings.push('サイズが小さいため、細かい部分がつぶれる可能性があります。');
  if (icon?.printability === 'caution') warnings.push('この形は細い部分があるため、印刷後に折れやすい可能性があります。');
  if (settings.bevelEnabled && icon?.printability === 'caution') warnings.push('細かい形でベベルを使うと形が少し崩れることがあります。');
  return { errors, warnings };
};

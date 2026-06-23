import { LIMITS, type ModelSettings } from '../lib/units';

export const readSettings = (root: ParentNode): ModelSettings => ({
  width: Number((root.querySelector<HTMLInputElement>('#width')!).value),
  height: Number((root.querySelector<HTMLInputElement>('#height')!).value),
  depth: Number((root.querySelector<HTMLInputElement>('#depth')!).value),
  addTab: root.querySelector<HTMLInputElement>('#addTab')!.checked,
  holeDiameter: Number((root.querySelector<HTMLInputElement>('#holeDiameter')!).value),
  tabDiameter: Number((root.querySelector<HTMLInputElement>('#tabDiameter')!).value),
  bevelEnabled: root.querySelector<HTMLInputElement>('#bevel')!.checked,
});

export const settingsMarkup = (): string => `
  <label>幅（mm）<input id="width" type="number" min="${LIMITS.width.min}" max="${LIMITS.width.max}" value="${LIMITS.width.default}"></label>
  <label>高さ（mm）<input id="height" type="number" min="${LIMITS.height.min}" max="${LIMITS.height.max}" value="${LIMITS.height.default}"></label>
  <label>厚み（mm）<input id="depth" type="number" min="${LIMITS.depth.min}" max="${LIMITS.depth.max}" step="0.1" value="${LIMITS.depth.default}"></label>
  <label class="check"><input id="addTab" type="checkbox"> キーホルダー用タブを付ける</label>
  <label>タブ直径（mm）<input id="tabDiameter" type="number" min="${LIMITS.tabDiameter.min}" max="${LIMITS.tabDiameter.max}" value="${LIMITS.tabDiameter.default}"></label>
  <label>穴直径（mm）<input id="holeDiameter" type="number" min="${LIMITS.holeDiameter.min}" max="${LIMITS.holeDiameter.max}" value="${LIMITS.holeDiameter.default}"></label>
  <label class="check"><input id="bevel" type="checkbox"> 角を少し丸める（ベベル）</label>`;

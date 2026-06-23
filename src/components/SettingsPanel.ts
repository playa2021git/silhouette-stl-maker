import { LIMITS, type ModelSettings, type ModelMode, type PlateShape } from '../lib/units';

export const readSettings = (root: ParentNode): ModelSettings => ({
  width: Number((root.querySelector<HTMLInputElement>('#width')!).value),
  height: Number((root.querySelector<HTMLInputElement>('#height')!).value),
  depth: Number((root.querySelector<HTMLInputElement>('#depth')!).value),
  modelMode: root.querySelector<HTMLSelectElement>('#modelMode')!.value as ModelMode,
  plateShape: root.querySelector<HTMLSelectElement>('#plateShape')!.value as PlateShape,
  plateThickness: Number((root.querySelector<HTMLInputElement>('#plateThickness')!).value),
  reliefHeight: Number((root.querySelector<HTMLInputElement>('#reliefHeight')!).value),
  plateMargin: Number((root.querySelector<HTMLInputElement>('#plateMargin')!).value),
  addTab: root.querySelector<HTMLInputElement>('#addTab')!.checked,
  holeDiameter: Number((root.querySelector<HTMLInputElement>('#holeDiameter')!).value),
  tabDiameter: Number((root.querySelector<HTMLInputElement>('#tabDiameter')!).value),
  bevelEnabled: root.querySelector<HTMLInputElement>('#bevel')!.checked,
});

export const settingsMarkup = (): string => `
  <label>形状モード<select id="modelMode"><option value="relief" selected>プレートあり（レリーフ）</option><option value="silhouette">プレートなし（上級者向け）</option></select></label>
  <label>プレート形状<select id="plateShape"><option value="rounded-rectangle" selected>丸角長方形</option><option value="circle">円形プレート</option><option value="rounded-square">角丸四角プレート</option></select></label>
  <label>全体の幅（mm）<input id="width" type="number" min="${LIMITS.width.min}" max="${LIMITS.width.max}" value="${LIMITS.width.default}"></label>
  <label>全体の高さ（mm）<input id="height" type="number" min="${LIMITS.height.min}" max="${LIMITS.height.max}" value="${LIMITS.height.default}"></label>
  <label>プレート厚み（mm）<input id="plateThickness" type="number" min="${LIMITS.plateThickness.min}" max="${LIMITS.plateThickness.max}" step="0.1" value="${LIMITS.plateThickness.default}"></label>
  <label>シルエット高さ（mm）<input id="reliefHeight" type="number" min="${LIMITS.reliefHeight.min}" max="${LIMITS.reliefHeight.max}" step="0.1" value="${LIMITS.reliefHeight.default}"></label>
  <label>プレート余白（mm）<input id="plateMargin" type="number" min="${LIMITS.plateMargin.min}" max="${LIMITS.plateMargin.max}" step="0.5" value="${LIMITS.plateMargin.default}"></label>
  <label class="legacy-depth">プレートなし時の厚み（mm）<input id="depth" type="number" min="${LIMITS.depth.min}" max="${LIMITS.depth.max}" step="0.1" value="${LIMITS.depth.default}"></label>
  <label class="check"><input id="addTab" type="checkbox"> キーホルダー用タブを付ける</label>
  <label>タブ直径（mm）<input id="tabDiameter" type="number" min="${LIMITS.tabDiameter.min}" max="${LIMITS.tabDiameter.max}" value="${LIMITS.tabDiameter.default}"></label>
  <label>穴直径（mm）<input id="holeDiameter" type="number" min="${LIMITS.holeDiameter.min}" max="${LIMITS.holeDiameter.max}" value="${LIMITS.holeDiameter.default}"></label>
  <label class="check"><input id="bevel" type="checkbox"> 角を少し丸める（ベベル）</label>`;

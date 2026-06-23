import './styles/global.css';
import type * as THREE from 'three';
import { renderIconButtons } from './components/IconSearch';
import { Preview3D } from './components/Preview3D';
import { update2DPreview } from './components/Preview2D';
import { readSettings, settingsMarkup } from './components/SettingsPanel';
import { updateWarnings } from './components/WarningPanel';
import type { IconDefinition } from './data/iconRegistry';
import { findIconByKeyword } from './lib/normalizeKeyword';
import { createModelGroup } from './lib/svgToGeometry';
import { downloadStl } from './lib/stlExport';
import { defaultSettings } from './lib/units';
import { validateSettings } from './lib/validation';

export const startApp = (root: HTMLElement): void => {
  delete root.dataset.loading;
  root.innerHTML = `
<header><h1>シルエットSTLメーカー</h1><p>登録済みの安全なシンプルSVGを、ブラウザ内だけで3Dプリント用STLに変換します。</p></header>
<main class="layout"><section class="panel"><h2>作る形を選ぶ</h2><label>キーワード<input id="keyword" placeholder="例：ハート、星、本、ひまわり"></label><p id="searchMessage" class="message"></p><div id="iconList" class="icon-list"></div><h2>サイズ設定</h2>${settingsMarkup()}<div class="actions"><button id="download" type="button">STLをダウンロード</button><button id="reset" type="button">リセット</button></div></section><section class="panel preview-panel"><h2>プレビュー</h2><div class="preview-grid"><div><h3>2Dシルエット</h3><div id="preview2d" class="preview2d"></div></div><div><h3>3Dプレビュー</h3><div id="preview3d" class="preview3d"></div></div></div><p id="sizeInfo" class="size-info"></p><ul id="warnings" class="warnings"></ul></section></main>
<footer><section><h2>使い方</h2><ol><li>キーワードを入力するか一覧から形を選びます。</li><li>全体サイズ、プレート厚み、シルエット高さをmm単位で設定します。</li><li>必要ならキーホルダー用タブを付けます。</li><li>3Dプレビューを確認してSTLを保存します。</li></ol></section><section><h2>注意事項</h2><p>AI画像生成、外部画像検索、任意画像アップロードは行いません。対応するのは登録済みのオリジナルシルエットだけです。</p></section><section><h2>ライセンス</h2><p>初期SVGはこのプロジェクト用に作成した単純なオリジナル形状です。第三者アイコン素材は含みません。</p></section></footer>`;

  let selectedIcon: IconDefinition | undefined = findIconByKeyword('heart');
  let currentGroup: THREE.Group | undefined;
  const preview3d = new Preview3D(root.querySelector('#preview3d')!);
  const message = root.querySelector<HTMLElement>('#searchMessage')!;

  const update = (): void => {
    const settings = readSettings(root);
    const validation = validateSettings(settings, selectedIcon);
    update2DPreview(root.querySelector('#preview2d')!, selectedIcon);
    updateWarnings(root.querySelector('#warnings')!, validation);
    root.querySelector('#sizeInfo')!.textContent = settings.modelMode === 'relief' ? `現在の設定：全体 ${settings.width}mm × ${settings.height}mm / プレート厚み ${settings.plateThickness}mm / シルエット高さ ${settings.reliefHeight}mm` : `現在の設定：プレートなし ${settings.width}mm × ${settings.height}mm × 厚み ${settings.depth}mm`;
    currentGroup = undefined;
    preview3d.setModel(undefined);
    if (!selectedIcon || validation.errors.length > 0) return;
    try {
      const built = createModelGroup(selectedIcon, settings);
      currentGroup = built.group;
      preview3d.setModel(currentGroup);
    } catch (error) {
      const li = document.createElement('li');
      li.className = 'error';
      li.textContent = error instanceof Error ? error.message : 'SVG変換に失敗しました。';
      root.querySelector('#warnings')!.append(li);
    }
  };

  renderIconButtons(root.querySelector('#iconList')!, (icon) => { selectedIcon = icon; message.textContent = ''; update(); });
  root.querySelector('#keyword')!.addEventListener('input', (event) => {
    const input = event.target as HTMLInputElement;
    const found = findIconByKeyword(input.value);
    if (found) { selectedIcon = found; message.textContent = `${found.label}を選択しました。`; }
    else if (input.value.trim()) message.textContent = '候補が見つかりません。下の一覧から形を選んでください。';
    else message.textContent = '';
    update();
  });
  root.querySelectorAll('input, select').forEach((control) => { control.addEventListener('input', update); control.addEventListener('change', update); });
  root.querySelector('#reset')!.addEventListener('click', () => { selectedIcon = findIconByKeyword('heart'); root.querySelectorAll<HTMLInputElement>('input[type="number"]').forEach((input) => { input.value = String(defaultSettings[input.id as keyof typeof defaultSettings] ?? input.value); }); root.querySelector<HTMLSelectElement>('#modelMode')!.value = defaultSettings.modelMode; root.querySelector<HTMLSelectElement>('#plateShape')!.value = defaultSettings.plateShape; root.querySelector<HTMLInputElement>('#addTab')!.checked = false; root.querySelector<HTMLInputElement>('#bevel')!.checked = false; update(); });
  root.querySelector('#download')!.addEventListener('click', () => { const settings = readSettings(root); const result = validateSettings(settings, selectedIcon); if (!selectedIcon || !currentGroup || result.errors.length) { update(); return; } downloadStl(currentGroup, selectedIcon, settings); });
  update();
};

import type { IconDefinition } from '../data/iconRegistry';

export const update2DPreview = (container: HTMLElement, icon?: IconDefinition): void => {
  container.replaceChildren();
  if (!icon) {
    container.textContent = '一覧から形を選ぶか、キーワードを入力してください。';
    return;
  }
  const wrapper = document.createElement('div');
  wrapper.className = 'svg-preview';
  wrapper.innerHTML = icon.svg;
  container.append(wrapper);
};

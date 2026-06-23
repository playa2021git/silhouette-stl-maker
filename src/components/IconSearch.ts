import { iconRegistry, type IconDefinition } from '../data/iconRegistry';

export const renderIconButtons = (container: HTMLElement, onSelect: (icon: IconDefinition) => void): void => {
  container.replaceChildren();
  for (const icon of iconRegistry) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'icon-button';
    button.textContent = icon.label;
    button.setAttribute('aria-label', `${icon.label}を選ぶ`);
    button.addEventListener('click', () => onSelect(icon));
    container.append(button);
  }
};

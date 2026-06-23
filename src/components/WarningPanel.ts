import type { ValidationResult } from '../lib/validation';

export const updateWarnings = (container: HTMLElement, result: ValidationResult): void => {
  container.replaceChildren();
  for (const message of [...result.errors, ...result.warnings]) {
    const item = document.createElement('li');
    item.className = result.errors.includes(message) ? 'error' : 'warning';
    item.textContent = message;
    container.append(item);
  }
};

import { iconRegistry, type IconDefinition } from '../data/iconRegistry';

const normalizeText = (value: string): string => value.trim().toLowerCase().replace(/[\s_-]+/g, '');

const aliasMap = new Map<string, IconDefinition>();
for (const icon of iconRegistry) {
  aliasMap.set(normalizeText(icon.id), icon);
  for (const alias of icon.aliases) aliasMap.set(normalizeText(alias), icon);
}

export const findIconByKeyword = (keyword: string): IconDefinition | undefined => aliasMap.get(normalizeText(keyword));

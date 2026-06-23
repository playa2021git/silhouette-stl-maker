export type Printability = 'good' | 'caution';

export interface IconDefinition {
  id: string;
  label: string;
  aliases: string[];
  svg: string;
  license: 'Original';
  source: 'Created for this project';
  modified: false;
  printability: Printability;
}

const meta = { license: 'Original', source: 'Created for this project', modified: false } as const;
const svg = (body: string) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="${body}" fill="currentColor"/></svg>`;

export const iconRegistry: IconDefinition[] = [
  { id: 'heart', label: 'ハート', aliases: ['ハート','はーと','heart','♡','❤'], svg: svg('M50 86 C22 62 10 48 10 30 C10 17 20 10 32 10 C41 10 47 15 50 22 C53 15 59 10 68 10 C80 10 90 17 90 30 C90 48 78 62 50 86 Z'), printability: 'good', ...meta },
  { id: 'star', label: '星', aliases: ['星','ほし','star','☆','★'], svg: svg('M50 8 L61 36 L91 36 L67 54 L76 84 L50 66 L24 84 L33 54 L9 36 L39 36 Z'), printability: 'caution', ...meta },
  { id: 'circle', label: '丸', aliases: ['丸','まる','円','circle'], svg: svg('M50 8 A42 42 0 1 1 49.9 8 Z'), printability: 'good', ...meta },
  { id: 'square', label: '四角', aliases: ['四角','しかく','square','box'], svg: svg('M15 15 H85 V85 H15 Z'), printability: 'good', ...meta },
  { id: 'triangle', label: '三角', aliases: ['三角','さんかく','triangle'], svg: svg('M50 12 L90 84 H10 Z'), printability: 'good', ...meta },
  { id: 'book', label: '本', aliases: ['本','ほん','book'], svg: svg('M14 18 C26 14 38 15 48 22 V82 C38 76 26 74 14 78 Z M52 22 C62 15 74 14 86 18 V78 C74 74 62 76 52 82 Z'), printability: 'good', ...meta },
  { id: 'music-note', label: '音符', aliases: ['音符','おんぷ','note','music','music-note'], svg: svg('M58 12 H76 V62 C76 73 67 82 55 82 C44 82 36 75 36 66 C36 56 45 49 56 49 C59 49 61 49 64 50 V28 H58 Z M28 24 H46 V70 C46 80 37 88 26 88 C15 88 8 81 8 72 C8 62 17 55 28 55 C30 55 32 55 34 56 V24 Z'), printability: 'caution', ...meta },
  { id: 'house', label: '家', aliases: ['家','いえ','house','home'], svg: svg('M10 48 L50 14 L90 48 L80 48 V86 H58 V62 H42 V86 H20 V48 Z'), printability: 'good', ...meta },
  { id: 'car', label: '車', aliases: ['車','くるま','car'], svg: svg('M18 48 L28 28 H72 L82 48 H88 V72 H78 A10 10 0 1 1 58 72 H42 A10 10 0 1 1 22 72 H12 V48 Z M33 36 L28 48 H72 L67 36 Z'), printability: 'good', ...meta },
  { id: 'cat', label: 'ねこ', aliases: ['ねこ','猫','cat'], svg: svg('M22 28 L36 38 C44 34 56 34 64 38 L78 28 V54 C78 74 66 88 50 88 C34 88 22 74 22 54 Z M37 58 A5 5 0 1 0 36.9 58 M63 58 A5 5 0 1 0 62.9 58'), printability: 'good', ...meta },
  { id: 'dog', label: 'いぬ', aliases: ['いぬ','犬','dog'], svg: svg('M20 34 C28 18 72 18 80 34 L92 24 V54 C92 70 80 86 50 86 C20 86 8 70 8 54 V24 Z M36 56 A5 5 0 1 0 35.9 56 M64 56 A5 5 0 1 0 63.9 56'), printability: 'good', ...meta },
  { id: 'flower', label: '花', aliases: ['花','はな','flower'], svg: svg('M50 38 C56 20 76 22 73 40 C91 37 95 57 78 62 C88 77 72 91 59 78 C50 94 31 88 39 70 C21 74 13 55 30 49 C19 35 35 20 50 38 Z'), printability: 'caution', ...meta },
  { id: 'sunflower', label: 'ひまわり', aliases: ['ひまわり','向日葵','sunflower'], svg: svg('M50 8 L58 28 L78 18 L72 40 L94 44 L74 56 L88 74 L64 70 L60 92 L48 72 L30 86 L36 64 L12 60 L34 48 L18 30 L42 34 Z'), printability: 'caution', ...meta },
  { id: 'fish', label: '魚', aliases: ['魚','さかな','fish'], svg: svg('M8 50 L28 30 C50 18 76 28 86 50 C76 72 50 82 28 70 Z M78 50 L96 32 V68 Z M33 48 A5 5 0 1 0 32.9 48'), printability: 'good', ...meta },
  { id: 'bird', label: '鳥', aliases: ['鳥','とり','bird'], svg: svg('M12 56 C28 28 52 24 70 40 L88 36 L76 52 C78 70 62 84 40 82 C24 80 14 70 12 56 Z M52 40 C44 48 38 56 30 58 C42 62 54 58 62 48 Z'), printability: 'good', ...meta },
  { id: 'tree', label: '木', aliases: ['木','き','tree'], svg: svg('M44 62 C28 66 14 58 16 44 C4 40 10 20 26 22 C32 8 52 8 58 22 C76 18 90 34 78 50 C86 64 66 72 56 62 V88 H44 Z'), printability: 'good', ...meta },
  { id: 'leaf', label: '葉っぱ', aliases: ['葉っぱ','葉','はっぱ','leaf'], svg: svg('M12 82 C18 34 52 10 88 12 C88 50 64 84 18 88 C34 68 52 52 76 28 C48 44 28 60 12 82 Z'), printability: 'good', ...meta },
  { id: 'crown', label: '王冠', aliases: ['王冠','おうかん','crown'], svg: svg('M14 78 H86 V38 L66 56 L50 20 L34 56 L14 38 Z M18 82 H82 V90 H18 Z'), printability: 'good', ...meta },
  { id: 'trophy', label: 'トロフィー', aliases: ['トロフィー','優勝','trophy'], svg: svg('M30 14 H70 V42 C70 58 62 68 54 70 V80 H70 V90 H30 V80 H46 V70 C38 68 30 58 30 42 Z M14 22 H30 V34 C24 34 20 38 20 46 C20 52 24 56 30 56 V64 C18 62 10 54 10 44 V22 Z M70 22 H86 V44 C86 54 78 62 70 64 V56 C76 56 80 52 80 46 C80 38 76 34 70 34 Z'), printability: 'good', ...meta },
  { id: 'medal', label: 'メダル', aliases: ['メダル','medal'], svg: svg('M28 10 H44 L50 30 L56 10 H72 L62 38 C74 44 82 56 82 70 A32 32 0 1 1 18 70 C18 56 26 44 38 38 Z M50 48 A22 22 0 1 0 50.1 48 Z'), printability: 'good', ...meta },
];

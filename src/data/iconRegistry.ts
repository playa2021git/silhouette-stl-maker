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

// ひまわりは教材作品で見栄えが出やすいように、太めの放射花びらと大きめの種穴で構成したオリジナル図案。
// 細い線を避け、レリーフ化したときに中心模様がプレート色で抜けて見えるよう fill-rule を使う。
const sunflowerSvg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 5 C57 15 57 25 50 33 C43 25 43 15 50 5 Z M67 10 C70 22 66 30 56 35 C55 24 59 16 67 10 Z M83 22 C81 34 74 41 62 42 C66 31 73 25 83 22 Z M94 42 C87 52 78 55 66 51 C74 43 83 40 94 42 Z M91 63 C80 69 71 67 64 58 C76 57 84 58 91 63 Z M78 82 C66 83 59 77 56 65 C66 70 73 75 78 82 Z M50 95 C43 85 43 75 50 67 C57 75 57 85 50 95 Z M22 82 C27 75 34 70 44 65 C41 77 34 83 22 82 Z M9 63 C16 58 24 57 36 58 C29 67 20 69 9 63 Z M6 42 C17 40 26 43 34 51 C22 55 13 52 6 42 Z M17 22 C27 25 34 31 38 42 C26 41 19 34 17 22 Z M33 10 C41 16 45 24 44 35 C34 30 30 22 33 10 Z" fill="currentColor"/><path fill-rule="evenodd" d="M50 29 A21 21 0 1 1 49.9 29 Z M50 39 A4 4 0 1 0 50.1 39 Z M39 45 A3.5 3.5 0 1 0 39.1 45 Z M61 45 A3.5 3.5 0 1 0 61.1 45 Z M43 58 A3.5 3.5 0 1 0 43.1 58 Z M57 58 A3.5 3.5 0 1 0 57.1 58 Z M50 51 A3.2 3.2 0 1 0 50.1 51 Z" fill="currentColor"/></svg>`;


export const iconRegistry: IconDefinition[] = [
  { id: 'heart', label: 'ハート', aliases: ['ハート','はーと','heart','♡','❤'], svg: svg('M50 86 C34 72 18 59 14 41 C11 26 20 14 34 14 C42 14 48 19 50 27 C52 19 58 14 66 14 C80 14 89 26 86 41 C82 59 66 72 50 86 Z'), printability: 'good', ...meta },
  { id: 'star', label: '星', aliases: ['星','ほし','star','☆','★'], svg: svg('M50 12 L61 36 L87 38 L67 55 L73 82 L50 68 L27 82 L33 55 L13 38 L39 36 Z'), printability: 'caution', ...meta },
  { id: 'circle', label: '丸', aliases: ['丸','まる','円','circle'], svg: svg('M50 10 A40 40 0 1 1 49.9 10 Z'), printability: 'good', ...meta },
  { id: 'square', label: '四角', aliases: ['四角','しかく','square','box'], svg: svg('M18 18 H82 Q88 18 88 24 V76 Q88 82 82 82 H18 Q12 82 12 76 V24 Q12 18 18 18 Z'), printability: 'good', ...meta },
  { id: 'triangle', label: '三角', aliases: ['三角','さんかく','triangle'], svg: svg('M50 13 L88 82 Q90 86 84 86 H16 Q10 86 12 82 Z'), printability: 'good', ...meta },
  { id: 'book', label: '本', aliases: ['本','ほん','book'], svg: svg('M15 20 C27 15 39 16 48 24 V84 C39 77 27 75 15 80 Z M52 24 C61 16 73 15 85 20 V80 C73 75 61 77 52 84 Z M48 24 H52 V84 H48 Z M21 29 C30 26 38 27 44 31 V39 C36 35 29 34 21 37 Z M56 31 C62 27 70 26 79 29 V37 C71 34 64 35 56 39 Z'), printability: 'good', ...meta },
  { id: 'music-note', label: '音符', aliases: ['音符','おんぷ','note','music','music-note'], svg: svg('M58 14 H77 V57 C77 70 67 80 54 80 C43 80 34 73 34 64 C34 54 44 47 56 48 C59 48 62 49 65 50 V30 H58 Z M24 24 H43 V68 C43 80 34 88 22 88 C12 88 5 81 5 72 C5 62 15 55 26 56 C28 56 30 57 32 58 V24 Z M43 24 H58 V34 H43 Z'), printability: 'caution', ...meta },
  { id: 'house', label: '家', aliases: ['家','いえ','house','home'], svg: svg('M10 49 L50 14 L90 49 Q93 52 89 56 H82 V84 Q82 88 78 88 H59 V64 H41 V88 H22 Q18 88 18 84 V56 H11 Q7 52 10 49 Z M32 50 H68 L50 34 Z'), printability: 'good', ...meta },
  { id: 'car', label: '車', aliases: ['車','くるま','car'], svg: svg('M16 48 L27 28 Q29 24 34 24 H66 Q71 24 73 28 L84 48 H88 Q92 48 92 52 V70 Q92 74 88 74 H80 A11 11 0 1 1 58 74 H42 A11 11 0 1 1 20 74 H12 Q8 74 8 70 V53 Q8 48 13 48 Z M33 34 L27 48 H73 L67 34 Z M31 70 A6 6 0 1 0 30.9 70 M69 70 A6 6 0 1 0 68.9 70'), printability: 'good', ...meta },
  { id: 'cat', label: 'ねこ', aliases: ['ねこ','猫','cat'], svg: svg('M20 30 L36 39 C45 35 55 35 64 39 L80 30 V55 C80 74 67 88 50 88 C33 88 20 74 20 55 Z M37 58 A5 5 0 1 0 36.9 58 M63 58 A5 5 0 1 0 62.9 58 M42 72 Q50 77 58 72 Q52 84 42 72 Z'), printability: 'good', ...meta },
  { id: 'dog', label: 'いぬ', aliases: ['いぬ','犬','dog'], svg: svg('M18 36 C25 19 75 19 82 36 L94 27 V54 C94 72 80 88 50 88 C20 88 6 72 6 54 V27 Z M36 57 A5 5 0 1 0 35.9 57 M64 57 A5 5 0 1 0 63.9 57 M42 73 H58 Q50 82 42 73 Z'), printability: 'good', ...meta },
  { id: 'flower', label: '花', aliases: ['花','はな','flower'], svg: svg('M50 34 C56 16 77 18 76 37 C94 35 98 56 81 63 C91 80 73 94 59 80 C50 98 30 90 38 72 C19 76 10 55 28 48 C17 32 35 17 50 34 Z M50 45 A13 13 0 1 0 50.1 45 Z'), printability: 'caution', ...meta },
  { id: 'sunflower', label: 'ひまわり', aliases: ['ひまわり','向日葵','sunflower'], svg: sunflowerSvg, printability: 'good', ...meta },
  { id: 'fish', label: '魚', aliases: ['魚','さかな','fish'], svg: svg('M8 50 L27 31 C50 18 77 28 88 50 C77 72 50 82 27 69 Z M78 50 L96 32 V68 Z M34 46 A5 5 0 1 0 33.9 46 M50 32 C61 36 69 42 75 50 C68 47 58 44 46 44 Z'), printability: 'good', ...meta },
  { id: 'bird', label: '鳥', aliases: ['鳥','とり','bird'], svg: svg('M11 57 C27 28 52 23 71 40 L90 36 L77 53 C78 70 62 84 40 82 C24 80 14 70 11 57 Z M51 39 C44 48 37 56 29 59 C42 64 55 59 64 48 Z M67 43 A4 4 0 1 0 66.9 43'), printability: 'good', ...meta },
  { id: 'tree', label: '木', aliases: ['木','き','tree'], svg: svg('M43 62 C28 67 14 58 16 45 C4 40 10 20 27 22 C33 8 52 8 59 22 C77 18 91 34 79 51 C87 66 66 73 56 62 V88 H43 Z M35 46 C43 48 53 48 65 43 C59 54 48 59 35 56 Z'), printability: 'good', ...meta },
  { id: 'leaf', label: '葉っぱ', aliases: ['葉っぱ','葉','はっぱ','leaf'], svg: svg('M12 82 C18 34 52 10 88 12 C88 50 64 84 18 88 C34 68 52 52 76 28 C48 44 28 60 12 82 Z M28 76 C41 70 57 58 72 39 C58 63 44 76 28 76 Z'), printability: 'good', ...meta },
  { id: 'crown', label: '王冠', aliases: ['王冠','おうかん','crown'], svg: svg('M13 76 H87 V38 L67 55 L50 18 L33 55 L13 38 Z M19 81 H81 Q85 81 85 85 V88 H15 V85 Q15 81 19 81 Z M28 66 H72 V72 H28 Z'), printability: 'good', ...meta },
  { id: 'trophy', label: 'トロフィー', aliases: ['トロフィー','優勝','trophy'], svg: svg('M29 14 H71 V41 C71 57 62 68 54 71 V79 H71 Q75 79 75 83 V88 H25 V83 Q25 79 29 79 H46 V71 C38 68 29 57 29 41 Z M13 22 H29 V34 C23 34 20 38 20 46 C20 53 24 57 31 58 V67 C18 64 10 55 10 44 V26 Q10 22 13 22 Z M71 22 H87 Q90 22 90 26 V44 C90 55 82 64 69 67 V58 C76 57 80 53 80 46 C80 38 77 34 71 34 Z M39 24 H61 V34 H39 Z'), printability: 'good', ...meta },
  { id: 'medal', label: 'メダル', aliases: ['メダル','medal'], svg: svg('M27 10 H43 L50 30 L57 10 H73 L63 39 C75 45 82 57 82 70 A32 32 0 1 1 18 70 C18 57 25 45 37 39 Z M50 48 A22 22 0 1 0 50.1 48 Z M50 56 L55 66 L66 67 L58 75 L60 86 L50 80 L40 86 L42 75 L34 67 L45 66 Z'), printability: 'good', ...meta },
];

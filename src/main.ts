import { startApp } from './app';

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('アプリの起動先が見つかりません。');
startApp(root);

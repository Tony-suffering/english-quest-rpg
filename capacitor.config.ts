import type { CapacitorConfig } from '@capacitor/cli';

// Android アプリは、ネイティブの殻が本番サイト(toniolab.com)を表示する方式。
// 内容更新は Web デプロイで即反映（アプリ再ビルド不要）。データは既存の D1/localStorage を利用。
const config: CapacitorConfig = {
  appId: 'com.toniolab.english',
  appName: '英語魂',
  webDir: 'public', // server.url 使用時のフォールバック。実体はリモートを表示。
  server: {
    url: 'https://www.toniolab.com/english/home',
    cleartext: false,
  },
  android: {
    backgroundColor: '#FAFAF9',
  },
};

export default config;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Capacitor用に静的エクスポート（オプション: Web版とモバイル版で分ける場合は環境変数で制御）
  // output: 'export',
  // images: { unoptimized: true }, // 静的エクスポート時は必要

  eslint: {
    // より迅速にビルドするため、ESLint エラーでビルドを失敗させない
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 型エラーで本番ビルドを止めない（実行時に問題ない範囲で）
    ignoreBuildErrors: true,
  },
  turbopack: {
    // ワークスペースルートの誤検出を防ぐ
    root: process.cwd(),
  },
  images: {
    // 外部画像ドメインの許可設定
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'iwasaki-naisou.com',
        pathname: '/**',
      },
      // Supabase画像ストレージ（環境変数から取得）
      ...(process.env.NEXT_PUBLIC_SUPABASE_URL
        ? [{
            protocol: 'https' as const,
            hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
            pathname: '/**',
          }]
        : []),
    ],
  },
};

export default nextConfig;

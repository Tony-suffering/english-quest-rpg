# ブランチワークフロー

このワークフローは、コードの変更を安全にブランチで管理する方法を説明します。

## 新機能・変更作業の開始

```bash
# 1. 最新のmainブランチに移動
git checkout main
git pull origin main

# 2. 作業用ブランチを作成
git checkout -b feature/[機能名]
# 例: git checkout -b feature/hero-section-update
```

## 作業中のコミット

```bash
# 変更をステージング
git add .

# コミット（日本語でもOK）
git commit -m "feat: [変更内容の説明]"
```

## 作業完了後のマージ

```bash
# 1. mainブランチの最新を取得
git checkout main
git pull origin main

# 2. ブランチをマージ
git merge feature/[機能名]

# 3. リモートにプッシュ
git push origin main

# 4. 作業ブランチを削除（任意）
git branch -d feature/[機能名]
```

## 問題が発生した場合の復元

```bash
# 特定のファイルを以前の状態に戻す
git checkout [コミットハッシュ] -- [ファイルパス]

# 例: 直前のコミットに戻す
git checkout HEAD~1 -- src/app/page.tsx
```

## ブランチ命名規則

- `feature/` - 新機能追加
- `fix/` - バグ修正
- `refactor/` - リファクタリング
- `docs/` - ドキュメント更新

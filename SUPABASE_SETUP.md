# Supabase Storage Setup Guide for n8n

このガイドは、n8nを使って自動生成した画像をSupabase Storageに保存し、ブログに表示するための設定手順です。

## 1. Supabaseでバケットを作成する

1. Supabaseのダッシュボードにログインします。
2. 左メニューの **Storage** をクリックします。
3. **New Bucket** ボタンをクリックします。
4. 以下の設定で作成します：
   - **Name**: `public-images` (※任意の名前でOKですが、統一するためこれを推奨)
   - **Public bucket**: **ON** (重要：これをONにしないとブログから見れません)
   - **Save** をクリック。

## 2. n8nの設定（Supabaseノード）

n8nで画像をアップロードする際のノード設定です。

### 全体設定
- **Authentication**: `Supabase API` (Project URLとKeyを設定)

### ノードのパラメータ
- **Resource**: `Storage`
- **Operation**: `Upload`
- **Bucket ID**: `public-images`
- **File Name**: `{{ $now.format('yyyy-MM-dd-HH-mm-ss') }}.png` (例：日付などでユニークにする)
- **Binary Data Property**: 画像データが入っているプロパティ名 (例: `data`)

## 3. GitHubノードへの渡し方

Supabaseノードが成功すると、ファイルのパスなどの情報が返ってきますが、**公開URLは自分で組み立てる必要があります**。

### 公開URLのフォーマット
```
https://[YOUR_PROJECT_ID].supabase.co/storage/v1/object/public/public-images/[FILE_NAME]
```

n8nのGitHubノードでMarkdownを作る際は、以下のように記述してください：

```markdown
---
title: ...
image: https://[PROJECT_ID].supabase.co/storage/v1/object/public/public-images/{{ $json.fileName }}
...
---
```

## 注意点
- Project IDは `src/lib/supabase.ts` や `.env` ファイルにある `supabaseUrl` の `https://` と `.supabase.co` の間の文字列です。

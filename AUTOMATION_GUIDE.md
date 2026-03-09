# n8n + Opal 自動投稿システム構築ガイド

「Opal（AI）」で記事と画像を生成し、「Supabase」に画像を保存し、「GitHub」に記事を投稿して、「Webサイト」に反映させる。
この一連の流れを完全自動化する手順書です。

## 全体像（フロー）

1. **Trigger**: スケジュール実行（例：毎日朝9時）
2. **Opal**: 記事本文と画像プロンプトを作成
3. **Image Gen**: 画像生成（DALL-E 3 等）
4. **Supabase**: 画像をアップロード & 公開URL取得
5. **GitHub**: Markdownファイルを作成してコミット
6. **Web**: 自動ビルド＆公開

---

## ステップ 1: 準備（APIキーなど）

### 1. GitHubアクセストークン
n8nがあなたの代わりにファイルを保存するために必要です。
1. GitHubの [Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens) にアクセス。
2. **Generate new token (classic)** を選択。
3. **Repo**（リポジトリ操作全般）にチェックを入れて生成。
4. トークンをコピーしておく（`ghp_...`）。

### 2. Supabase情報
画像保存用です。
1. ダッシュボード > Project Settings > API
2. **Project URL** と **service_role key**（またはanon key）をコピー。

---

## ステップ 2: n8nワークフローの作成

n8nのキャンバスで以下のノードをつなぎます。

### 1. Schedule Trigger
- **設定**: 毎日/毎週など、好きな頻度を設定。
- テスト時は「Manually」トリガーでOK。

### 2. HTTP Request (Opal / AI Text)
Opal（またはChatGPT API）に記事を書かせます。
- **Method**: POST
- **URL**: `https://api.openai.com/v1/chat/completions` (例)
- **Body**:
  ```json
  {
    "model": "gpt-4",
    "messages": [
      {
        "role": "system",
        "content": "あなたはプロの内装職人です。ブログ記事をJSON形式で書いてください。必要なキー: title, content, description, image_prompt"
      },
      {
        "role": "user",
        "content": "最新の内装トレンドについて記事を書いて"
      }
    ]
  }
  ```

### 3. HTTP Request (Image Generation)
記事のアイキャッチ画像を作ります。
- **URL**: `https://api.openai.com/v1/images/generations`
- **Body**: Promptに前のノードの `image_prompt` を使う。

### 4. Supabase (Image Upload)
生成された画像を保存します。
- **Resource**: Storage
- **Operation**: Upload
- **Bucket**: `public-images` (作成済みのバケット名)
- **File Name**: `blog-{{ $now.format('yyyyMMdd-HHmmss') }}.png`
- **Binary Data**: 前のノードから画像データを受け取る。

**重要**: アップロード後、ファイルの公開URLを組み立てます。
URL例: `https://[YOUR_ID].supabase.co/storage/v1/object/public/public-images/[FILE_NAME]`

### 5. GitHub (Create File)
最後に記事ファイル（Markdown）を作って保存します。
- **Authentication**: GitHub OAuth2 または Access Token
- **Resource**: File
- **Operation**: Create
- **Repository**: `iwasaki-naisou-website` (あなたのリポジトリ名)
- **File Path**: `src/posts/{{ $now.format('yyyy-MM-dd') }}-new-post.md`
  - ※ファイル名はユニークにするため日付などを入れる
- **Binary Data**: OFF
- **File Content (Text)**:
  ```markdown
  ---
  title: {{ $json.title }}
  date: {{ $now.format('yyyy-MM-dd') }}
  image: {{ $json.supabase_image_url }}
  description: {{ $json.description }}
  businessTags: ["自動投稿", "AI"]
  techTags: ["n8n", "Opal"]
  featured: false
  ---
  
  {{ $json.content }}
  ```
- **Commit Message**: `Automated post: {{ $json.title }}`

---

## 完了

これで設定は終わりです。
n8nの「Execute」ボタンを押して成功すれば：

1. `src/posts/` に`.md`ファイルが作られる。
2. GitHubがそれを検知する。
3. Vercelが自動的にビルドを開始する。
4. 数分後、HPの `/blog` ページに新着記事が表示される！

という「全自動ブログ運用」が完成します。

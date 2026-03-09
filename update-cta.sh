#!/bin/bash
# CTAをAIタクミメインに変更（電話番号削除、フォームはサブに）

FILES=(
  "src/app/page.tsx"
  "src/app/services/barrier-free/page.tsx"
  "src/app/technology/ai/page.tsx"
  "src/app/not-found.tsx"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Updating $file..."

    # 電話番号リンクを削除（複数行パターン対応）
    sed -i '/href="tel:0356387402"/,/^[[:space:]]*<\/a>/d' "$file"
    sed -i '/03-5638-7402/d' "$file"

    # お問い合わせフォームをタクミに変更
    sed -i 's|お問い合わせフォーム|AIタクミに相談する（無料）|g' "$file"
    sed -i 's|href="/contact"|href="/chat"|g' "$file"

    # タイトル変更
    sed -i 's|お見積もり・<br />ご相談は無料|まずはAI職人「タクミ」に<br />相談してみませんか？|g' "$file"
    sed -i 's|お見積もり・ご相談は無料|まずはAI職人「タクミ」に<br />相談してみませんか？|g' "$file"

    # 説明文変更
    sed -i 's|経験豊富なスタッフが丁寧にサポートいたします。<br />|見積もり相談、施工の疑問、工事の流れなど、<br />|g' "$file"
    sed -i 's|まずはお気軽にご相談ください。|AIが即座にお答えします。24時間365日対応・無料です。|g' "$file"

  fi
done

echo "CTA update completed!"

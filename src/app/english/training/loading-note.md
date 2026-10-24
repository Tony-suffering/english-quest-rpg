# loading.tsx をここに置かない

`src/app/english/training/loading.tsx` があると、このルートは
**URL直打ちとリロードで永久に LOADING のまま**になる。
サイドバーからの遷移だけは動くので、普段使っている本人は気づきにくい。

## 実測 (2026-08-22, Next 15.5.12)

    loading.tsx あり:  返る HTML にページ本体が1行も入らない。
                       RSC の遅延参照だけ残り、本体の行が最後まで来ない。
                       curl で 200 が返り、サーバのログにもエラーは出ない。
                       本番(Vercel)でも同じ。90秒待っても描画されない。

    loading.tsx なし:  同じページがそのまま描画される。
                       ハードロードで CARD 1/605 まで出る。

疑って外したが違ったもの:
  ペイロードの大きさ (5.85MB -> 132KB にしても直らない)
  Promise.race の消し忘れタイマー
  .next のキャッシュ (全消ししても再現)
  export const dynamic = 'force-dynamic'
  middleware のパスワードゲート (200 で返っていて redirect していない)

読み込み中の表示が要るなら、ルートの loading.tsx ではなく
TrainingClient の中の状態として出すこと。

-- engineworks.iwasaki@gmail.com のユーザーIDを確認

-- auth.users テーブルから確認
SELECT id, email, created_at
FROM auth.users
WHERE email = 'engineworks.iwasaki@gmail.com';

-- または、すべてのユーザーを表示
SELECT id, email, created_at
FROM auth.users
ORDER BY created_at DESC;

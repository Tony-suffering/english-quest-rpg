-- 14件の工事記録を追加

-- 1. ジャイアント国立店内装工事 (2024.07.30)
INSERT INTO work_records (user_id, site_name, work_date, location_name, latitude, longitude)
VALUES ('fa08c261-d909-47c1-880a-17d91629fb54', 'ジャイアント国立店内装工事 店内クロス、ダイノック貼り', '2024-07-30', '東京都国立市中1-18-41', 35.6842, 139.4417);

-- 2. 酒々井プレミアムアウトレット (2024.05.30)
INSERT INTO work_records (user_id, site_name, work_date, location_name, latitude, longitude)
VALUES ('fa08c261-d909-47c1-880a-17d91629fb54', '酒々井プレミアムアウトレット クロス、床貼工事', '2024-05-30', '千葉県酒々井町飯積2-4-1', 35.7458, 140.2697);

-- 3. 船橋サウスビル8階 (2024.05.17)
INSERT INTO work_records (user_id, site_name, work_date, location_name, latitude, longitude)
VALUES ('fa08c261-d909-47c1-880a-17d91629fb54', '船橋サウスビル8階 ブラインド、モノコム25.10台納入', '2024-05-17', '千葉県船橋市本町2-10', 35.7053, 139.9842);

-- 4. ゼブラ本社 (2024.04.27)
INSERT INTO work_records (user_id, site_name, work_date, location_name, latitude, longitude)
VALUES ('fa08c261-d909-47c1-880a-17d91629fb54', 'ゼブラ本社 8階タイルカーペット貼替', '2024-04-27', '東京都新宿区東五軒町2-9', 35.6938, 139.7267);

-- 5. 秋葉原ワシントンホテル14階 (2024.05.01)
INSERT INTO work_records (user_id, site_name, work_date, location_name, latitude, longitude)
VALUES ('fa08c261-d909-47c1-880a-17d91629fb54', '秋葉原ワシントンホテル14階 オーナー室 FAB-ACE貼替工事', '2024-05-01', '東京都千代田区神田佐久間町1-8-3', 35.6986, 139.7738);

-- 6. サンセットタワー1303号室 (2024.04.26)
INSERT INTO work_records (user_id, site_name, work_date, location_name, latitude, longitude)
VALUES ('fa08c261-d909-47c1-880a-17d91629fb54', 'サンセットタワー1303号室 クロス貼替工事 アーキッツ 藤田', '2024-04-26', '東京都江東区大島1-2-2', 35.6956, 139.8206);

-- 7. KAMAYAビル (2024.04.10)
INSERT INTO work_records (user_id, site_name, work_date, location_name, latitude, longitude)
VALUES ('fa08c261-d909-47c1-880a-17d91629fb54', 'KAMAYAビル 4階クロス、タイルカーペット貼替', '2024-04-10', '東京都台東区浅草橋5-3-6', 35.6975, 139.7875);

-- 8. 常盤ビル8階 (2024.03.21)
INSERT INTO work_records (user_id, site_name, work_date, location_name, latitude, longitude)
VALUES ('fa08c261-d909-47c1-880a-17d91629fb54', '常盤ビル8階 クロス、床貼替工事', '2024-03-21', '東京都中央区日本橋本石町3-2-7', 35.6889, 139.7742);

-- 9. ひまわり人形町ビル (2024.03.15)
INSERT INTO work_records (user_id, site_name, work_date, location_name, latitude, longitude)
VALUES ('fa08c261-d909-47c1-880a-17d91629fb54', 'ひまわり人形町ビル 5階クロス、床貼替工事', '2024-03-15', '東京都中央区日本橋人形町2-29-9', 35.6858, 139.7819);

-- 10. いろり庵きらく人形町 (2024.02.29)
INSERT INTO work_records (user_id, site_name, work_date, location_name, latitude, longitude)
VALUES ('fa08c261-d909-47c1-880a-17d91629fb54', 'いろり庵きらく人形町 路面店 床クロス貼', '2024-02-29', '東京都中央区日本橋人形町2-6-7', 35.6856, 139.7819);

-- 11. 都築電機小山ビル (2024.02.10)
INSERT INTO work_records (user_id, site_name, work_date, location_name, latitude, longitude)
VALUES ('fa08c261-d909-47c1-880a-17d91629fb54', '都築電機小山ビル クロス、床、ダイノック貼替工事', '2024-02-10', '東京都品川区小山台1-20-20', 35.6111, 139.7094);

-- 12. 厚木ロジスティクスセンター (2024.01.19)
INSERT INTO work_records (user_id, site_name, work_date, location_name, latitude, longitude)
VALUES ('fa08c261-d909-47c1-880a-17d91629fb54', '厚木ロジスティクスセンター クロス、床貼替工事', '2024-01-19', '神奈川県厚木市下川入127-1', 35.4344, 139.3486);

-- 13. 四街道市大日（正確な座標に修正）
UPDATE work_records
SET latitude = 35.6428, longitude = 140.1817, updated_at = NOW()
WHERE site_name LIKE '%みらいえ四街道%';

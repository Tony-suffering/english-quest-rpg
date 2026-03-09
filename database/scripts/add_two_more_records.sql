-- 2件の工事記録を追加

-- 1. JELビル ブラインド納入 (2025.08.20)
-- 「シルキーブラインド」は会社名・製品名のため、住所が不明
-- 仮に東京都心の座標を設定（実際の住所が分かれば更新）
INSERT INTO work_records (user_id, site_name, work_date, location_name, latitude, longitude)
VALUES ('fa08c261-d909-47c1-880a-17d91629fb54', 'JELビル ブラインド納入 シルキーブラインド26台納入', '2025-08-20', 'シルキーブラインド', 35.6895, 139.6917);

-- 2. 新宿三葉共用部改修工事 (2025.06.04)
INSERT INTO work_records (user_id, site_name, work_date, location_name, latitude, longitude)
VALUES ('fa08c261-d909-47c1-880a-17d91629fb54', '新宿三葉共用部改修工事 床、ノンスリップ金物、DI-NOK貼替', '2025-06-04', '東京都新宿区西新宿1-5-11', 35.6918, 139.6989);

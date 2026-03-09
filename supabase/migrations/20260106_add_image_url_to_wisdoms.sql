-- Add image_url and content_en columns to wisdoms table for daily zen art
ALTER TABLE wisdoms ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE wisdoms ADD COLUMN IF NOT EXISTS content_en text;

-- Allow service role to insert with new columns
-- (existing RLS policies should cover this)

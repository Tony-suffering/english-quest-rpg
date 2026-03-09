-- Create wisdoms table
create table if not exists wisdoms (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  source text default 'Unknown',
  date date unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table wisdoms enable row level security;

-- Create policy to allow everyone to read wisdoms
create policy "Allow public read access"
  on wisdoms
  for select
  to public
  using (true);

-- Create policy to allow authenticated users (service role) to insert/update
create policy "Allow authenticated insert"
  on wisdoms
  for insert
  to authenticated
  with check (true);

create policy "Allow authenticated update"
  on wisdoms
  for update
  to authenticated
  using (true);

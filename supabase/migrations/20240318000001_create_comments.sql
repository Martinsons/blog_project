-- Create a table for comments
create table if not exists comments (
    id bigint primary key generated always as identity,
    post_id bigint references posts(id) on delete cascade,
    author_name text not null,
    content text not null,
    created_at timestamptz default now() not null
);

-- Enable RLS
alter table comments enable row level security;

-- Create policies
create policy "Comments are viewable by everyone"
    on comments for select
    using (true);

create policy "Anyone can create comments"
    on comments for insert
    with check (true);

-- Create an index for faster lookups by post_id
create index if not exists comments_post_id_idx on comments(post_id);

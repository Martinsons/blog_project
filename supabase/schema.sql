-- Enable the pgvector extension to work with embeddings
create extension if not exists "vector";

-- Create a table for storing blog posts
create table if not exists posts (
    id bigint primary key generated always as identity,
    title text not null,
    content text not null,
    slug text not null unique,
    image_url text,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null,
    author_id text,
    published boolean default false not null,
    tags text[],
    search_vector tsvector generated always as (
        to_tsvector('simple', title) || 
        to_tsvector('simple', content)
    ) stored
);

-- Create an index for full text search
create index if not exists posts_search_idx on posts using gin(search_vector);

-- Create an index for slug lookups
create index if not exists posts_slug_idx on posts(slug);

-- Function to automatically update the updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Trigger to call the update function before update
create or replace trigger update_posts_updated_at
    before update on posts
    for each row
    execute function update_updated_at_column();

-- Enable Row Level Security (RLS)
alter table posts enable row level security;

-- Create policies for Row Level Security
-- Allow anyone to read published posts
create policy "Anyone can read published posts"
    on posts for select
    using (published = true);

-- Allow authenticated users to create posts
create policy "Authenticated users can create posts"
    on posts for insert
    to authenticated
    with check (true);

-- Allow users to update their own posts
create policy "Users can update their own posts"
    on posts for update
    to authenticated
    using (auth.uid() = author_id)
    with check (auth.uid() = author_id);

-- Allow users to delete their own posts
create policy "Users can delete their own posts"
    on posts for delete
    to authenticated
    using (auth.uid() = author_id);

-- Create a table for storing comments
references posts(id) on delete cascade,
    author_name text not null,
    content text not null,
    created_at timestamptz default now() not null
);

-- Create an index for post_id lookups
create indcreate table if not exists comments (
    id bigint primary key generated always as identity,
    post_id bigint ex if not exists comments_post_id_idx on comments(post_id);

-- Enable Row Level Security (RLS)
alter table comments enable row level security;

-- Create policies for Row Level Security
-- Allow anyone to read comments
create policy "Anyone can read comments"
    on comments for select
    using (true);

-- Allow anyone to create comments
create policy "Anyone can create comments"
    on comments for insert
    with check (true);

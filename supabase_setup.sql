-- Supabase Database Setup for Govind Web Studio Contact Form
-- Copy and paste this into your Supabase SQL Editor to set up the required table and policies.

-- 1. Create the contact_submissions table
CREATE TABLE public.contact_submissions (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    email text not null,
    phone text not null,
    business text,
    budget text,
    service text,
    message text not null
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- 3. Create an RLS policy that allows anyone (anon) to insert data
-- This is strictly for INSERTs so users cannot READ others' submissions.
CREATE POLICY "Allow public form submissions"
ON public.contact_submissions
FOR INSERT
TO anon
WITH CHECK (true);

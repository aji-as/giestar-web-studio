"use client";

import { useState, useEffect, useCallback } from "react";
import { createBrowserClient, type BlogRow } from "@/lib/supabase";

export function useBlogs() {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createBrowserClient();

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setBlogs(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetch(); }, [fetch]);

  const addBlog = async (input: Omit<BlogRow, "id" | "created_at">) => {
    const { data, error } = await supabase
      .from("blogs")
      .insert(input)
      .select()
      .single();
    if (error) throw error;
    setBlogs((b) => [data, ...b]);
    return data;
  };

  const updateBlog = async (id: string, input: Partial<Omit<BlogRow, "id" | "created_at">>) => {
    const { data, error } = await supabase
      .from("blogs")
      .update(input)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    setBlogs((b) => b.map((x) => (x.id === id ? data : x)));
    return data;
  };

  const deleteBlog = async (id: string) => {
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) throw error;
    setBlogs((b) => b.filter((x) => x.id !== id));
  };

  return { blogs, loading, error, refetch: fetch, addBlog, updateBlog, deleteBlog };
}

export function usePublicBlogs() {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserClient();

  useEffect(() => {
    supabase
      .from("blogs")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setBlogs(data ?? []);
        setLoading(false);
      });
  }, [supabase]);

  return { blogs, loading };
}

export function useBlogBySlug(slug: string) {
  const [blog, setBlog] = useState<BlogRow | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserClient();

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single()
      .then(({ data }) => {
        setBlog(data);
        setLoading(false);
      });
  }, [slug, supabase]);

  return { blog, loading };
}

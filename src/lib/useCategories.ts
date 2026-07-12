import { useState, useEffect, useCallback } from "react";
import { createBrowserClient, type CategoryRow } from "@/lib/supabase";

export function useCategories() {
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createBrowserClient();

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });
      
    if (error) setError(error.message);
    else setCategories(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const addCategory = async (name: string) => {
    const { data, error } = await supabase
      .from("categories")
      .insert({ name })
      .select()
      .single();
    if (error) throw error;
    setCategories((prev) => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
    return data;
  };

  const updateCategory = async (id: string, name: string) => {
    const { data, error } = await supabase
      .from("categories")
      .update({ name })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    setCategories((prev) => prev.map((x) => (x.id === id ? data : x)).sort((a, b) => a.name.localeCompare(b.name)));
    return data;
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw error;
    setCategories((prev) => prev.filter((x) => x.id !== id));
  };

  return { categories, loading, error, refetch: fetch, addCategory, updateCategory, deleteCategory };
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { createBrowserClient, type ProductRow } from "@/lib/supabase";

export function useProducts() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createBrowserClient();

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setProducts(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetch(); }, [fetch]);

  const addProduct = async (input: Omit<ProductRow, "id" | "created_at">) => {
    const { data, error } = await supabase
      .from("products")
      .insert(input)
      .select()
      .single();
    if (error) throw error;
    setProducts((p) => [data, ...p]);
    return data;
  };

  const updateProduct = async (id: string, input: Partial<Omit<ProductRow, "id" | "created_at">>) => {
    const { data, error } = await supabase
      .from("products")
      .update(input)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    setProducts((p) => p.map((x) => (x.id === id ? data : x)));
    return data;
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
    setProducts((p) => p.filter((x) => x.id !== id));
  };

  return { products, loading, error, refetch: fetch, addProduct, updateProduct, deleteProduct };
}

export function usePublicProducts() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserClient();

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setProducts(data ?? []);
        setLoading(false);
      });
  }, [supabase]);

  return { products, loading };
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserClient();

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => {
        setProducts(data ?? []);
        setLoading(false);
      });
  }, [supabase]);

  return { products, loading };
}

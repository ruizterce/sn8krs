"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types/product";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const initialLoad = useRef(false);
  const isFetching = useRef(false);

  const productsContainerRef = useRef<HTMLDivElement | null>(null);

  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore || isFetching.current) return;

    isFetching.current = true; // Lock the function
    setLoading(true);
    console.log("Fetching more products...");
    try {
      const { items, lastEvaluatedKey: newLastEvaluatedKey } =
        await fetchProducts(20, lastEvaluatedKey as string);
      setProducts((prevProducts) => [...prevProducts, ...items]);
      setLastEvaluatedKey(newLastEvaluatedKey);
      setHasMore(newLastEvaluatedKey !== null); // Stop fetching if no more items
    } catch (error) {
      console.error("Failed to load more products", error);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [loading, hasMore, lastEvaluatedKey]);

  useEffect(() => {
    if (!initialLoad.current) {
      loadMoreProducts();
      initialLoad.current = true;
    }
    return () => {
      setProducts([]);
      setLastEvaluatedKey(null);
      setHasMore(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Infinite scroll handler with throttling
  useEffect(() => {
    const handleScroll = () => {
      if (productsContainerRef.current) {
        const container = productsContainerRef.current;
        const isNearBottom =
          container.scrollHeight - container.scrollTop <=
          container.clientHeight + 100;

        // Trigger load more if we're near the bottom
        if (isNearBottom && hasMore) {
          loadMoreProducts();
        }
      }
    };

    const container = productsContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasMore, loadMoreProducts]);

  return (
    <div className="pt-4 pr-2 pb-6">
      <h1 className="fixed left-1 text-3xl font-futuraBold [writing-mode:sideways-lr]">
        Products
      </h1>
      <div
        ref={productsContainerRef}
        className="flex px-5 flex-wrap gap-6 items-center justify-center overflow-y-auto max-h-[80vh]" // Added scrollable styles
      >
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      {loading && <p className="text-center">Loading more products...</p>}
    </div>
  );
}

"use client";

import React, { useState, useEffect, useCallback, useRef, use } from "react";
import ProductCard from "@/components/ProductCard";
import { fetchProductsByCategory } from "@/lib/api";
import { Product } from "@/types/product";
import { PageProps } from "../../../../.next/types/app/page";
import { CATEGORY_BRANDS } from "@/data";
import { useRouter, useSearchParams } from "next/navigation";

export default function Category({ params }: PageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [brands, setBrands] = useState<string[]>([]);
  const initialLoad = useRef(false);
  const isFetching = useRef(false);
  const router = useRouter();
  const { category } = use(
    params as unknown as Promise<{ category: string; id: string }>
  );
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const productsContainerRef = useRef<HTMLDivElement | null>(null);

  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore || isFetching.current) return;

    isFetching.current = true; // Lock the function
    setLoading(true);
    console.log("Fetching more products...");
    try {
      const encodedBrand = searchParams.get("brand");
      const brand = encodedBrand ? decodeURIComponent(encodedBrand) : null;
      console.log("component lastEvaluatedKey");
      console.log(lastEvaluatedKey);
      const { items, lastEvaluatedKey: newLastEvaluatedKey } =
        await fetchProductsByCategory(
          category,
          brand,
          20,
          lastEvaluatedKey as string
        );
      if (items) {
        setProducts((prevProducts) => [...prevProducts, ...items]);
      }
      console.log("received lastEvaluatedKey");
      console.log(newLastEvaluatedKey);
      setLastEvaluatedKey(newLastEvaluatedKey);
      setHasMore(newLastEvaluatedKey !== null); // Stop fetching if no more items
    } catch (error) {
      console.error("Failed to load more products", error);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [loading, hasMore, searchParams, category, lastEvaluatedKey]);

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
  }, [queryString]);

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

  // Load brand list for current category
  useEffect(() => {
    let brandList: React.SetStateAction<string[]> = [];
    CATEGORY_BRANDS.forEach((item) => {
      if (item.category === category) {
        brandList = item.brands;
        return;
      }
    });
    setBrands(brandList);
  }, [category]);

  // Reset brand
  const handleResetBrand = (brand: string) => {
    initialLoad.current = false;
    setHasMore(true);
    setLastEvaluatedKey(null);
    router.push(`${category}?brand=${encodeURIComponent(brand)}`);
  };

  return (
    <div className="relative h-full pr-2 flex flex-col items-center">
      <h1 className="fixed left-1 py-4 text-3xl font-futuraBold [writing-mode:sideways-lr]">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>

      <div className="fixed z-10 mt-4 px-4 py-1 bg-background max-w-[75vw] h-fit max-h-[20vh] flex flex-wrap gap-2 items-center justify-center ring-2 ring-primary">
        {brands.map((brand) => (
          <span
            key={brand}
            onClick={() => {
              handleResetBrand(brand);
            }}
            className={`cursor-pointer font-futuraBoldOblique texl-lg md:text-xl hover:drop-shadow-md-h hover:-translate-y-[5px] hover:-translate-x-[5px] transition-all duration-200 ${
              searchParams.get("brand") === brand
                ? "drop-shadow-xs-h line-through"
                : ""
            }`}
          >
            {brand}
          </span>
        ))}
      </div>

      <div
        ref={productsContainerRef}
        className="z-2 flex min-h-full py-4 pt-24 px-8 flex-wrap gap-6 items-center justify-center overflow-y-auto max-h-[80vh]"
      >
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="flex justify-center items-center min-h-full">
            <p className="text-xl font-semibold text-gray-700">Loading...</p>
          </div>
        )}
      </div>
      <p
        className={`fixed right-2 md:right-6 bottom-20 font-futuraBoldOblique text-xl [writing-mode:sideways-rl] origin-bottom-left transition-all duration-300 ease-in-out ${
          loading ? "opacity-1" : "opacity-0"
        }`}
      >
        Loading more products...
      </p>
    </div>
  );
}

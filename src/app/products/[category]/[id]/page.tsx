"use client";
import { useEffect, useState, use } from "react";
import { fetchProductById } from "@/lib/api";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import { Product } from "@/types/product";

export default function ProductPage({ params }: never) {
  const { category, id } = use(
    params as unknown as Promise<{ category: string; id: string }>
  );

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await fetchProductById(category, id);
        setProduct(fetchedProduct);
        console.log(category);
        console.log(id);
        console.log(fetchedProduct);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load the product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [category, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-700">Product not found</p>
      </div>
    );
  }

  return (
    <div className="sm:pt-6 px-2 pb-6 overflow-auto h-full">
      <h1 className="sm:fixed text-3xl font-futuraExtraBoldOblique sm:[writing-mode:sideways-lr]">
        {product.brand}
      </h1>
      <div className="grid place-items-center xl:grid-cols-[1fr_1fr] gap-8 max-w-[1600px] mx-auto">
        <div className="sm:ml-8 max-w-3xl bg-background">
          <Image
            src={product.image}
            alt={product.title}
            width={725}
            height={517}
            className="object-cover border mb-6 mx-auto p-4 shadow-lg-h"
            priority={false}
          />
        </div>
        <div className="h-full flex sm:ml-7 p-2 xl:pt-0 xl:pb-0 flex-col justify-between max-w-[725px] text-justify">
          <div>
            <h1 className="text-4xl font-futuraExtraBold mb-2 text-foreground drop-shadow-sm-h">
              {product.title}
            </h1>
            <p className="text-xl font-futuraBold text-gray-800">
              {product.color}
            </p>
            <p className="text-sm text-gray-500">SKU: {product.sku}</p>
            <p className="my-3 text-2xl font-extrabold text-primary">
              ${Number(product.avg_price).toFixed(2)}
            </p>
            <AddToCartButton product={product} />
          </div>
          <div className="my-3">
            <p className="text-gray-700 leading-relaxed">
              {product.description
                .split("<br>")
                .filter(
                  (line) => !line.includes("<a") && !line.includes("StockX")
                )
                .map((line, index, arr) => (
                  <span key={index}>
                    {line}
                    {index < arr.length - 1 && <br />}
                  </span>
                ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

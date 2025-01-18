"use client";

import ProductCard from "@/components/ProductCard";

export default function Products() {
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">Products</h1>

      <ProductCard
        id="idString"
        name="nameString"
        price={50}
        image="/imgUrl"
        onAddToCart={() => {}}
      />

      <ProductCard
        id="idString2"
        name="nameString2"
        price={100}
        image="/imgUrl2"
        onAddToCart={() => {}}
      />
    </main>
  );
}

"use client";
import { Product } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [rotation, setRotation] = useState(0);
  const router = useRouter();

  const getRandomRotation = () => {
    return Math.floor(Math.random() * 5) - 2;
  };
  return (
    <div
      onClick={() => {
        router.push(`/products/${product.category}/${product.id}`);
      }}
      onMouseEnter={() => setRotation(getRandomRotation())}
      onMouseLeave={() => setRotation(0)}
      className={`border p-4 w-[300px] h-[350px] grid grid-cols-1 grid-rows-[8fr_2.3fr_1fr] shadow-md-h cursor-pointer hover:ring-4 hover:ring-primary hover:shadow-lg-h hover:-translate-x-[8px] hover:-translate-y-[8px] transition-all duration-150`}
      style={{
        transform: `rotate(${rotation}deg)`,
        outline: "1px solid transparent",
        WebkitBackfaceVisibility: "hidden",
        willChange: "transform",
      }}
    >
      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={190}
        className="object-cover rounded-md mb-4 mx-auto max-h-[190px]"
        priority={false}
      />
      <h2 className="text-lg font-bold self-start line-clamp-2 overflow-hidden text-ellipsis">
        {product.title}
      </h2>
      <div className="flex w-full justify-between items-center self-end gap-2">
        <p className="text-primary font-bold">
          ${product.avg_price.toFixed(2)}
        </p>
        <p className="text-sm line-clamp-1 overflow-hidden text-ellipsis">
          {product.color}
        </p>
      </div>
    </div>
  );
}

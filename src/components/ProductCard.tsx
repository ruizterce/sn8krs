"use client";

import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  onAddToCart: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="border rounded-lg shadow-md p-4">
      <Image
        src={image}
        alt={name}
        width={300}
        height={300}
        className="w-full h-auto object-cover rounded-md mb-4"
        priority={false}
      />
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-primary mt-2">${price.toFixed(2)}</p>
      <button
        onClick={() => onAddToCart(id)}
        className="bg-primary text-white py-2 px-4 mt-4 rounded-md w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}

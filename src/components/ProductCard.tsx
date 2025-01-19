"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/products/${id}`);
      }}
      className="border shadow-md p-4 w-[300px] h-[350px] grid grid-cols-1 grid-rows-[4fr_2fr_1fr]"
    >
      <Image
        src={image}
        alt={name}
        width={300}
        height={300}
        className="object-cover rounded-md mb-4 mx-auto"
        priority={false}
      />
      <h2 className="text-lg font-bold self-start line-clamp-2 overflow-hidden text-ellipsis">
        {name}
      </h2>
      <p className="text-primary mt-2 self-end">${price.toFixed(2)}</p>
    </div>
  );
}
